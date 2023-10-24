from fastapi import FastAPI
import docker

app = FastAPI()

client = docker.from_env()
@app.get("/")
async def list_containers():
    # containers = client.containers.list()
    images = client.images.list()
    return [{"Id": c.id, "Name": c.name} for c in images]

@app.post("/")
async def create_container():
    client = docker.from_env()
    containers = client.containers.list()
    print(containers)    
    return [{"Id": c.id, "Name": c.name} for c in containers]
    # return {"message": "Container created"}



