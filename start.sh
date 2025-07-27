#!/bin/bash

echo "Building docker container"
docker-compose down -v
docker-compose up --build