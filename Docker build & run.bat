@echo off
docker build -t nitflex-react --target prod .
docker run -P --name nitflex-reactts nitflex-react