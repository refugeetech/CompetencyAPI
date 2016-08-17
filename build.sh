#!/bin/sh

# make sure you do docker login first...

docker build -t competency-api .
docker tag -f competency-api iteamoperations/competency-api:develop
docker push iteamoperations/competency-api
