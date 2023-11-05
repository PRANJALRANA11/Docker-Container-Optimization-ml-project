from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import docker
import subprocess
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import asyncio

#? After the model i will creates pydantic model
# from pydantic import BaseModel

app = FastAPI()


#? CORS
# "http://localhost:3000",
origins = [
    "http://localhost:3001",
]
    # "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# send directly docker file to AI model
@app.get("/")
async def root():
    return {"message": "Docker Container ID work"}



@app.get("/inspect_image/{id}")
async def list_containers(id : str):
    client = docker.DockerClient(base_url='tcp://localhost:2375')
    try:
        id_container = client.containers.get(container_id=id)
        image_id = id_container.attrs['Config']['Image']
        image = client.images.get(image_id)
        command=["wsl", "dive", "--json", "file.json"]
        command.insert(2,image_id)
        process= subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        process.wait()
        filehandler=open("file.json","r")
        readFile = filehandler.read()  
        filehandler=open("file.json","w")
        filehandler.truncate(0)
        return json.loads(readFile)
    except docker.errors.NotFound:
        return {"message": "Container not found"}
    
   

@app.get("/optimize_image/{container_id}")
async def create_container(container_id : str):
    try:
        client = docker.DockerClient(base_url='tcp://localhost:2375')
        id_container = client.containers.get(container_id=container_id)
        image_id = id_container.attrs['Config']['Image']
        image = client.images.get(image_id)
        result = image.tags[0].split(':')[0]
        process=subprocess.run(["powershell",f"docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock dslim/slim build --http-probe {result}"], shell=True, stdout=subprocess.PIPE)
        print(process.stdout)
        print(result + '.slim')
        command=["wsl", "dive", "--json", "file.json"]
        command.insert(2,result + '.slim')


        process= subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        filehandler=open("file.json","r")
        readFile = filehandler.read()  
        filehandler=open("file.json","w")
        filehandler.truncate(0)
        return json.loads(readFile)
    except docker.errors.NotFound:

        return {"message": "Error"}


@app.websocket("/stats")
async def status(websocket: WebSocket):
    await websocket.accept()
    client = docker.DockerClient(base_url='tcp://localhost:2375')
    try:
        while True:
            containers = client.containers.list()
            stats_data = []

            for container in containers:
                stats = container.stats(stream=False)
                stats_data.append({"container_id": container.id, "stats": stats})
            await websocket.send_json(stats_data)
            await asyncio.sleep(2)  
    except WebSocketDisconnect as e:
        print(f"Client disconnected: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

@app.get("/slim/{id}")
async def slim(id: str):
    client = docker.DockerClient(base_url='tcp://localhost:2375')

    image = client.images.get(id)

    command = f"docker-slim build {image.tags[0]}"
    container = client.containers.run("dslim/slim", command=command, volumes={'/var/run/docker.sock': {'bind': '/var/run/docker.sock', 'mode': 'rw'}}, detach=True,)
    try:
        slim_image_id = image.tags[0].replace(":",".slim:")
        slim_image = client.images.get(slim_image_id)
    except docker.errors.ImageNotFound:
            print("Image not found")
    else:
        return {"message": "Failed to create slimmed image."}

        #! Will going to call a new end-point ok
    return {"message": f"Slimmed image created with id: {slim_image.id}"}