#!/usr/bin/env bash

function cleanup() {
    docker compose -f compose.services.yaml stop redis postgres product-service
    docker compose -f compose.services.yaml -f compose.session.java.yaml stop session-service
    docker compose -f compose.services.yaml -f compose.session.ts.yaml stop session-service
    docker compose -f compose.services.yaml down -v redis postgres
    sleep 5
}

function startPeers() {
    docker compose -f compose.observability.yaml up -d
    docker compose -f compose.observability.yaml -f compose.services.yaml up -d redis postgres
    echo "Waiting for Redis and Postgres to start..."
    sleep 5
}

# Pull and build
docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.load.yaml -f compose.session.java.yaml pull
docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.load.yaml -f compose.session.java.yaml build

docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.load.yaml -f compose.session.ts.yaml pull
docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.load.yaml -f compose.session.ts.yaml build

# Start peer services
startPeers

# Phase 1: Java & Java
docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.session.java.yaml up -d product-service session-service --build
echo "Waiting for Java services to start..."
sleep 5

docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.load.yaml up -d k6 autoinstrumenter
echo "Waiting for Java & Java load test to finish..."
docker wait k6
sleep 10

cleanup

# Phase 2: Java & TypeScript
startPeers

docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.session.ts.yaml up -d product-service session-service --build
echo "Waiting for Java and TypeScript services to start..."
sleep 5

docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.load.yaml up -d k6 autoinstrumenter
echo "Waiting for Java & TypeScript load test to finish..."
docker wait k6
sleep 10

cleanup