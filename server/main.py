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
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

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

@app.get("/model")
async def model(dockerFile : str):
    return {"model": "Currently working on it", "dockerFile": dockerFile}


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


        





    






# class InputData(BaseModel):
#     feature1: float
#     feature2: float
#     feature3: float

#? Success
# @app.post("/machinelearning")
# async def machine_learning(data: InputData):
#     input_data = linear_regression.np.array([[data.feature1, data.feature2, data.feature3]])

#     prediction = linear_regression.model.predict(input_data)
#     result = prediction[0]

#     return {"prediction": result}



# @app.get("/images/{name}")
# async def image_to_dockerFile(name: str):
#     client = docker.DockerClient(base_url='tcp://localhost:2375')


#     image_name = image_name.replace("%3A", ":")
#     # try:

#     image = client.images.get(name)
#     # except docker.errors.NotFound:
#     #     images = client.images.list()
#     #     return [ image.attrs for image in images]
#     return [{ "attributes": image.attrs} ]