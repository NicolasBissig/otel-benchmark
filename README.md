# otel-shopping-cart-benchmark

- Grafana: http://localhost:3000
![](doc/architecture.drawio.svg)

## Steps

Setup observability stack, also used for container monitoring:

```bash
docker compose -f compose.observability.yaml up -d
```

Setup the applications:

```bash
docker compose -f compose.observability.yaml -f compose.services.yaml up -d --build
```

Run the benchmark:

```bash
docker compose -f compose.observability.yaml -f compose.services.yaml -f compose.load.yaml up -d
```

## Restart / Change settings

Edit the `compose.services.yaml` file and (un)comment the `JAVA_TOOL_OPTIONS` for *ALL* services.

Restart the services:

```bash
docker compose -f compose.services.yaml stop redis postgres product-service session-service
docker compose -f compose.services.yaml down -v redis postgres
```