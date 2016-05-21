mkdir -p app/results/errors
docker-compose run web node index.js
./save-report.sh
