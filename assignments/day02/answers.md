# Docker Exercise

TODO: What was this assignment about
Today we installed Docker and learned how to create a system of containers that can interact with each other. We learned how to post a Docker image to the Docker hub and build it using Docker compose.

## What is Docker?

TODO: short description
Docker is essentially a virtual machine that can use the running system's kernel instead of intitalizing its own. This allows us to package a program's dependencies and settings together so it can be deployed to any Linux machine easily and painlessly, independent of the running system's settings.

## What is the difference between:

* Virtual Machine
* Docker Container
* Docker Image
TODO: short comparison
A virtual machine fully runs an instance of an operating system while a Docker container uses the running systsem's kernel as a base while utilizing its own pre-installed dependencies and settings. A Docker container is essentially an instance of the original Docker image, which prescribes and installs the dependencies and settings of all derived Docker containers.

## Web API?

TODO: short description
A Web API is an interface allowing a client to interact with the server. This is essentially an abstraction allowing developers to interact with the server as if it was local.

## Postgres?

TODO: short description
Postgres is a free and open source relational database management system. Builds on SQL.

## package.json file dependencies field:

TODO: short description
The dependencies field defines the versions that shoud be installed of our dependecies. In this case we install postgres 7.12.1 and express.js 4.17.1

## npm express package:

TODO: short description
The express package is a Node.js web application framework that allows our database.js and app.js to communicate with each other

## npm pg package:

TODO: short description
The npm pg package is an API that facilitates communication between our javascript modules and our postgres server.

## What is Docker-compose:

TODO: short description
The Docker-compose tool uses a configuration file to pull and merge different Docker images to create a multi-container Docker application.

## Results

TODO: What was accomplished in this exercise
We created an application that uses Docker to combine a 2 Javascript packages and a virtual Postgres server to create a simple app that has 2 functions:
1: Send in single-word data
2: Read the last 10 inputs and output them alpabetically.
We did this mostly to learn how docker containers and images work, how to upload them to the cloud and combine pre-existing containers to create applications.
