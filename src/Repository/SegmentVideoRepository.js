const PROCESS_INTERVAL = "/api/process-interval"
const PROCESS_RANGE = "/api/process-range"
const PROCESS_SEGMENTS = "/api/process-segments"
const COMBINE_VIDEO = "/api/combine-video"

const REQUEST_HEADERS = {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
}


class SegmentVideoRepository {
    constructor() {
        this.endPointUrl = process.env.REACT_APP_API_URL;
    }

    async processInterval(data) {
        const response = await fetch(
            this.endPointUrl + PROCESS_INTERVAL, {
                body: JSON.stringify(data),
                ...REQUEST_HEADERS
            }
        )
        return response.json()
    }

    async processRange(data) {
        const response = await fetch(
            this.endPointUrl + PROCESS_RANGE, {
                body: JSON.stringify(data),
                ...REQUEST_HEADERS
            }
        )
        return response.json()
    }

    async processSegments(data) {
        const response = await fetch(
            this.endPointUrl + PROCESS_SEGMENTS, {
                body: JSON.stringify(data),
                ...REQUEST_HEADERS
            }
        )
        return response.json()
    }

    async combineVideo(data) {
        const response = await fetch(
            this.endPointUrl + COMBINE_VIDEO, {
                body: JSON.stringify(data),
                ...REQUEST_HEADERS
            }
        )
        return response.json()
    }
}

export default SegmentVideoRepository;
