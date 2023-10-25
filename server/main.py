from fastapi import FastAPI
import docker
import json

app = FastAPI()

@app.get("/")
async def list_containers():
    client = docker.DockerClient(base_url='tcp://localhost:2375')
    containers = client.images.list()
    print(containers)
    # images = client.images.list()
    return [{ "attrs": c.attrs} for c in containers]
    
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

    return  history_json
    



    # return [{ "image_attrs": image.attrs} ]





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

@app.post("/")
async def create_container():
    client = docker.from_env()
    containers = client.containers.list()
    print(containers)    
    return [{"Id": c.id, "Name": c.name} for c in containers]
    # return {"message": "Container created"}



