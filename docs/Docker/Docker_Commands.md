# Docker Commands

## Basics

**Displays the version of Docker installed on your system.**

```bash
docker --v or docker --version
```

**Shows detailed information about Docker's configuration and system status.**

```bash
docker info
```

**Downloads a Docker image from a registry (like Docker Hub).**

```bash
docker pull <image_name>
```

**Lists all the Docker images available locally on your system.**

```bash
docker images or docker image ls
```

**Shows all running Docker containers.**

```bash
docker ps or docker container ls
```

**Shows all Docker containers, including stopped ones.**

```bash
docker ps -a or docker container ls -a
```

**Runs a new container from the specified Docker image with optional configurations.**

```bash
docker run <options> <image_name>
```

## Container Lifecycle Commands

**Starts a stopped Docker container.**

```bash
docker start <container_name/id>
```

**Stops a running Docker container.**

```bash
docker stop <container_name/id>
```

**Kills a running Docker container immediately.**

```bash
docker kill <container_name/id>
```

**Restarts a running or stopped Docker container.**

```bash
docker restart <container_name/id>
```

**Removes a stopped Docker container from the system.**

```bash
docker rm <container_name/id>
```

## Images commands

**Builds a Docker image from a Dockerfile located at the specified path.**

```bash
docker build -t <image-name> <path_to_dockerfile>
```

**or**

```bash
docker build -t <image-name> .
```

**Removes a Docker image from the local system.**

```bash
docker rmi <image_name>
```

**Removes unused Docker images to free up space.**

```bash
docker image prune
```

## Docker Compose

**Starts up the services defined in the `docker-compose.yml` file.**

```bash
docker-compose up
```

**OR use this for all without "-"**

```bash
docker compose up
```

**Stops and removes all the containers, networks, and volumes defined in the `docker-compose.yml` file.**

```bash
docker-compose down
```

**Lists the status of the containers defined in the `docker-compose.yml` file.**

```bash
docker-compose ps
```

**Shows the logs of a specific service in the Docker Compose setup.**

```bash
docker-compose logs <service_name>
```

**Executes a command inside a running service container in the Docker Compose setup.**

```bash
docker-compose exec <service_name> <command>
```

## Docker Volumes

**Creates a Docker volume with the specified name.**

```bash
docker volume create <volume_name>
```

**Mounts a Docker volume to a container at the specified path.**

```bash
docker run -v <volume_name>:<container_path>
```

**Lists all the Docker volumes available on your system.**

```bash
docker volume ls
```

**Removes a Docker volume from the system.**

```bash
docker volume rm <volume_name>
```

## Docker Registry and Hub

**Logs in to a Docker registry (e.g., Docker Hub) with your credentials.**

```bash
docker login
```

**Pushes a Docker image to a registry (e.g., Docker Hub).**

```bash
docker push <image_name>
```

**Pulls a Docker image from a registry (e.g., Docker Hub).**

```bash
docker pull <image_name>
```

---

## Docker Networking Commands

**Creates a new Docker network with the specified name.**

```bash
docker network create <network_name>
```

**Lists all Docker networks on your system.**

```bash
docker network ls
```

**Connects a container to a specified Docker network.**

```bash
docker network connect <network_name> <container_name/id>
```

**Disconnects a container from a specified Docker network.**

```bash
docker network disconnect <network_name> <container_name/id>
```

## Logs and Debugging

**Shows the logs of a running or stopped container.**

```bash
docker logs <container_name/id>
```

**Executes an interactive shell (`/bin/bash`) inside a running container.**

```bash
docker exec -it <container_name/id> /bin/bash
```

**Displays real-time statistics (CPU, memory, etc.) of a running container.**

```bash
docker stats <container_name/id>
```

---

### Cleanup Commands

**Removes unused containers, networks, images, and build cache.**

```bash
docker system prune
```

**Removes all stopped containers from the system.**

```bash
docker container prune
```

**Removes unused Docker images to free up space.**

```bash
docker image prune
```

**Removes unused Docker volumes to free up space.**

```bash
docker volume prune
```
