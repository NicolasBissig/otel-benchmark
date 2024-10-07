# Results

## Java & Java

### Instrumented Java & Java

http://188.245.177.12:3000/d/stats/benchmark-statistics?orgId=1&from=1728302852054&to=1728302942022&var-ds=PDF61E9E97939C7ED&var-db=default&var-cores=8

| Service         | CPU   | Memory  |
|-----------------|-------|---------|
| Product Service | 6.27% | 610 MiB |
| Session Service | 3.64% | 371 MiB |

89999 Requests observed

| Category        | Request Duration |
|-----------------|------------------|
| Mean            | 902.93 µs        |
| 50th percentile | 848.99 µs        |
| 90th percentile | 1.01 ms          |
| 95th percentile | 1.11 ms          |
| 99th percentile | 2.29 ms          |
| Max             | 13.38 ms         |

### Baseline Java & Java

http://188.245.177.12:3000/d/stats/benchmark-statistics?orgId=1&from=1728302414000&to=1728302504000&var-ds=PDF61E9E97939C7ED&var-db=default&var-cores=8

| Service         | CPU    | Memory  |
|-----------------|--------|---------|
| Product Service | 4.83%  | 492 MiB |
| Session Service | 3.03%	 | 258 MiB |

90000 Requests observed

| Category        | Request Duration |
|-----------------|------------------|
| Mean            | 796.92 µs        |
| 50th percentile | 766.94 µs        |
| 90th percentile | 915.47 µs        |
| 95th percentile | 970.11 µs        |
| 99th percentile | 1.29 ms          |
| Max             | 10.04 ms         |

### Comparison

| Service | CPU Baseline | CPU Instrumented | Increase | Memory Baseline | Memory Instrumented | Increase | Increase Absolute | 
|---------|--------------|------------------|----------|-----------------|---------------------|----------|-------------------|
| Product | 4.83%        | 6.27%            | +29.8%   | 492 MiB         | 610 MiB             | +24.0%   | +118 MiB          |
| Session | 3.03%        | 3.64%            | +20.1%   | 258 MiB         | 371 MiB             | +43.8%   | +113 MiB          |

| Category        | Baseline  | Instrumented | Increase |
|-----------------|-----------|--------------|----------|
| Mean            | 796.92 µs | 902.93 µs    | +13.3%   |
| 50th percentile | 766.94 µs | 848.99 µs    | +10.7%   |
| 90th percentile | 915.47 µs | 1.01 ms      | +10.5%   |
| 95th percentile | 970.11 µs | 1.11 ms      | +14.4%   |
| 99th percentile | 1.29 ms   | 2.29 ms      | +77.5%   |
| Max             | 10.04 ms  | 13.38 ms     | +33.3%   |

## Java & TypeScript

### Instrumented Java & TypeScript

http://188.245.177.12:3000/d/stats/benchmark-statistics?orgId=1&from=1728291124000&to=1728291224000&var-ds=PDF61E9E97939C7ED&var-db=default&var-cores=8

| Service         | CPU   | Memory  |
|-----------------|-------|---------|
| Product Service | 6.54% | 536 MiB |
| Session Service | 8.56% | 204 MiB |

99.989 Requests observed

| Category        | Request Duration |
|-----------------|------------------|
| Mean            | 1.92 ms          |
| 50th percentile | 1.22 ms          |
| 90th percentile | 4.35 ms          |
| 95th percentile | 5.99 ms          |
| 99th percentile | 8.95 ms          |
| Max             | 30.18 ms         |

### Baseline Java & TypeScript

http://188.245.177.12:3000/d/stats/benchmark-statistics?orgId=1&from=1728302607062&to=1728302697197&var-ds=PDF61E9E97939C7ED&var-db=default&var-cores=8

| Service         | CPU   | Memory   |
|-----------------|-------|----------|
| Product Service | 4.87% | 351 MiB  |
| Session Service | 3.93% | 97.0 MiB |

90000 Requests observed

| Category        | Request Duration |
|-----------------|------------------|
| Mean            | 919.69 µs        |
| 50th percentile | 876.75 µs        |
| 90th percentile | 1.06 ms          |
| 95th percentile | 1.17 ms          |
| 99th percentile | 1.94 ms          |
| Max             | 9.64 ms          |

### Comparison

| Service | CPU Baseline | CPU Instrumented | Increase | Memory Baseline | Memory Instrumented | Increase | Increase Absolute |
|---------|--------------|------------------|----------|-----------------|---------------------|----------|-------------------|
| Product | 4.87%        | 6.54%            | +34.3%   | 351 MiB         | 536 MiB             | +52.7%   | +185 MiB          |
| Session | 3.93%        | 8.56%            | +117.8%  | 97.0 MiB        | 204 MiB             | +110.3%  | +107 MiB          |

| Category        | Baseline  | Instrumented | Increase |
|-----------------|-----------|--------------|----------|
| Mean            | 919.69 µs | 1.92 ms      | +108.1%  |
| 50th percentile | 876.75 µs | 1.22 ms      | +39.0%   |
| 90th percentile | 1.06 ms   | 4.35 ms      | +310.4%  |
| 95th percentile | 1.17 ms   | 5.99 ms      | +411.1%  |
| 99th percentile | 1.94 ms   | 8.95 ms      | +361.3%  |
| Max             | 9.64 ms   | 30.18 ms     | +213.3%  |


## Comparison between both

### Baselines

| Category | Java & Java | Java & TypeScript | Increase |
|----------|-------------|-------------------|----------|
| Mean     | 796.92 µs   | 919.69 µs         | +15.4%   |
| 50th     | 766.94 µs   | 876.75 µs         | +14.3%   |
| 90th     | 915.47 µs   | 1.06 ms           | +15.5%   |
| 95th     | 970.11 µs   | 1.17 ms           | +20.3%   |
| 99th     | 1.29 ms     | 1.94 ms           | +50.4%   |
| Max      | 10.04 ms    | 9.64 ms           | -4.0%    |

### Instrumented

| Category | Java & Java | Java & TypeScript | Increase |
|----------|-------------|-------------------|----------|
| Mean     | 902.93 µs   | 1.92 ms           | +112.0%  |
| 50th     | 848.99 µs   | 1.22 ms           | +43.9%   |
| 90th     | 1.01 ms     | 4.35 ms           | +331.7%  |
| 95th     | 1.11 ms     | 5.99 ms           | +439.6%  |
| 99th     | 2.29 ms     | 8.95 ms           | +290.8%  |
| Max      | 13.38 ms    | 30.18 ms          | +125.3%  |

