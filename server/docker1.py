# Goal from python i will going to use the dockerFile to create a new image

import docker

# client = docker.DockerClient(base_url='tcp://localhost:2375')
client = docker.from_env()

image = client.images.pull('dslim/docker-slim')
my_image = client.images.get('369861432f3cddfa753a0564812db16e3fbd14dc260a891ecdd36fee0e80cb42')
existing_image_name = 'my-python-app'
existing_image_tag = 'latest'
optimized_image_name = existing_image_name + '_slim'

command = f'docker-slim build {existing_image_name}:{existing_image_tag}'

container = client.containers.run('dslim/docker-slim', command)
print(container.logs())

optimized_image = client.images.get(optimized_image_name)
