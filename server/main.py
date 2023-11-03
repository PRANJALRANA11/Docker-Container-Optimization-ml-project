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

    

# @app.get("/containers")
# async def list_containers():
#     client = docker.DockerClient(base_url='tcp://localhost:2375')
#     containers = client.containers.list(all=True)
#     images = client.images.list(all=True)
#     return [{ "arrtributes": c.attrs  } for c in containers]


@app.get("/containers/{id}")
async def list_containers(id : str):
    client = docker.DockerClient(base_url='tcp://localhost:2375')
    try:
        id_container = client.containers.get(container_id=id)
        image_id = id_container.attrs['Config']['Image']
        image = client.images.get(image_id)
        command=["wsl", "dive", "--json", "file.json"]
        command.insert(2, image_id)
        process= subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        process.wait()
        filehandler=open("file.json","r")
        readFile = filehandler.read()  
        filehandler=open("file.json","w")
        filehandler.truncate(0)
        return json.loads(readFile)
    except docker.errors.NotFound:
        return {"message": "Container not found"}
    
    # extraction of docker file
   
    # history_json = json.dumps(image.history())

    
    # print(process.stdout)
    
    # return history_json

    #! Cleaninig is not been completed 

    # model(history_json)

@app.post("/create_container")
async def create_container():
    return [{"message": "Container will be re-create after the model is created"}]

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

#! will be removed just for the learning purpose


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