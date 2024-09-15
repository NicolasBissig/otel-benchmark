import http from 'k6/http';
import {check} from 'k6';

// Duration in seconds
const WARMUP_DURATION = 30;
const MAIN_DURATION = 6 * 60; // first minute throwaway
// Time between scenarios in seconds
const BUFFER_DURATION = 0;

function toDurationString(seconds) {
    return `${seconds}s`;
}

function mainScenario(index) {
    return {
        executor: 'constant-arrival-rate',
        rate: 1000,
        timeUnit: '1s',
        duration: toDurationString(MAIN_DURATION),
        startTime: toDurationString(WARMUP_DURATION + ((index + 1) * BUFFER_DURATION) + (index * MAIN_DURATION)),
        preAllocatedVUs: 20,
        maxVUs: 1000,
    };
}

// constant requests per second test
export const options = {
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<0.01',
            abortOnFail: true,
        }],
    },
    scenarios: {
        warmup: { // Warm up the application
            executor: 'ramping-arrival-rate',
            timeUnit: '1s',
            preAllocatedVUs: 1,
            maxVUs: 1000,
            stages: [
                { duration: toDurationString(WARMUP_DURATION), target: mainScenario(0).rate },
            ]
        },
        main_1: mainScenario(0),
        //main_2: mainScenario(1),
        //main_3: mainScenario(2),
    },
}

export function setup() {
    const PRODUCT_URL = __ENV.PRODUCT_SERVICE || 'http://localhost:8080';
    const SESSION_URL = __ENV.SESSION_SERVICE || 'http://localhost:8081';

    const sessionResponse = http.post(SESSION_URL + `/sessions/users/1`);
    if (sessionResponse.status !== 200 && sessionResponse.status !== 409) {
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