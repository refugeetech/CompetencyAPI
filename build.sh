#!/bin/sh

# make sure you do docker login first...

docker build -t competency-api .
docker tag -f competency-api iteamoperations/competency-api
docker push iteamoperations/competency-api
