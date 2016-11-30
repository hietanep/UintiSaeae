Docker:
=============================================================

docker build . --tag uintisaeae-backend
docker run -d --name back -p 3000:3000 uintisaeae-backend


docker build . --tag uintisaeae-frontend
docker run -d --name front -p 80:8000 uintisaeae-frontend