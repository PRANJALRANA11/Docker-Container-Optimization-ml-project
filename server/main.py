from fastapi import FastAPI
import docker
import json

#? After the model i will creates pydantic model
# from pydantic import BaseModel

app = FastAPI()


# send directly docker file to AI model

@app.get("/model")
async def model(dockerFile : str):
    return {"model": "Currently working on it", "dockerFile": dockerFile}

    
@app.get("/containers")
async def list_containers():
    client = docker.DockerClient(base_url='tcp://localhost:2375')
    containers = client.containers.list(all=True)
    # print(containers)
    # images = client.images.list()
    return [{ "arrtributes": c.attrs  } for c in containers]

@app.get("/containers/{id}")
async def list_containers(id : str):
    client = docker.DockerClient(base_url='tcp://localhost:2375')
    try:

        id_container = client.containers.get(container_id=id)
    except docker.errors.NotFound:
        return {"message": "Container not found"}
    
    # extraction of docker file
    image_id = id_container.attrs['Config']['Image']

    image = client.images.get(image_id)


    history_json = json.dumps(image.history())

    #! Cleaninig is not been completed 

    model(history_json)

@app.post("/create_container")
async def create_container():
    return [{"message": "Container will be re-create after the model is created"}]






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