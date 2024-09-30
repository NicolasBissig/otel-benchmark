import http from 'k6/http';
import {check} from 'k6';

// Duration in seconds
const WARMUP_DURATION = 30;
const TEST_DURATION = 2 * 60;

const TARGET_RPS = 1000;

function toDurationString(seconds) {
    return `${seconds}s`;
}

// constant requests per second test
export const options = {
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<0.01',
            abortOnFail: true,
        }],
        http_req_duration: [{
            threshold: 'p(50)<200', /// 50% of requests must complete below 200ms
            abortOnFail: true,
        }],
    },
    scenarios: {
        main: {
            executor: 'ramping-arrival-rate',
            timeUnit: '1s',
            preAllocatedVUs: 1,
            maxVUs: 1000,
            stages: [
                {duration: toDurationString(WARMUP_DURATION), target: TARGET_RPS},
                {duration: toDurationString(TEST_DURATION), target: TARGET_RPS},
            ]
        },
    },
}

export function setup() {
    const PRODUCT_URL = __ENV.PRODUCT_SERVICE || 'http://localhost:8080';
    const SESSION_URL = __ENV.SESSION_SERVICE || 'http://localhost:8081';

    const sessionResponse = http.post(SESSION_URL + `/sessions/users/1`);
    if (!(sessionResponse.status === 201 || sessionResponse.status === 200) && sessionResponse.status !== 409) {
        throw new Error('Failed to create session');
    }

    const productResponse = http.put(PRODUCT_URL + `/products/1`, JSON.stringify({
        "name": "Product 1",
        "priceCents": 100
    }), {
        headers: {
            'Content-Type': 'application/json',
            'X-Session-Token': 1,
        },
    });
    if (productResponse.status !== 200) {
        throw new Error('Failed to create product');
    }
}

export default function () {
    const BASE_URL = __ENV.PRODUCT_SERVICE || 'http://localhost:8080';

    let res = http.get(BASE_URL + '/products/1', {
        headers: {
            'X-Session-Token': 1,
        },
    });
    check(res, {
        'status is 200': (r) => r.status === 200,
        'product id is 1': (r) => {
            const product = JSON.parse(r.body);
            return product.id === 1;
        },
    });
}

// export function handleSummary(data) {
//     return {
//         '/home/k6/reports/summary.json': JSON.stringify(data), //the default data object
//     };
// }