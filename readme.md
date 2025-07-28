#### step 1: run in terminal:

chmod +x start.sh

#### step 2: run in terminal:

./start.sh

#### step 3: optional to turn it off:
docker-compose down

or:

docker ps
docker stop container_id

### Technical notes:

Frontend React app runs on: http://localhost:3000
Backend Node Express API runs at: http://localhost:5031

Backend get endpoints to open directly for testing:
    http://localhost:5031/planets
    http://localhost:5031/people
    http://localhost:5031/starships



