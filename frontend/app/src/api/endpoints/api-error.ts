export class ApiError extends Error {
    constructor(
        public readonly url: string,
        public readonly init: unknown,
        message?: string,
        // options?: ErrorOptions
    ) {
        super(message ?? "General API error", );
    }
}

export class UnexpectedResponseError extends ApiError {
    constructor(
        public readonly url: string,
        public readonly init: unknown,
        public readonly expectedCodec: unknown,
        public readonly garbage: unknown,
        // options?: ErrorOptions
    ) {
        console.warn(
            "Unexpected response came from API",
            { expectedCodec, garbage, url, init,  }
        );
        super(url, init, "Unexpected response came from API", );
    }
}

export class AuthError extends Error {
    constructor(
        public readonly url: string,
        public readonly init: unknown,
        public readonly type?: "full_reauth_required",
        // options?: ErrorOptions
    ) {
        super("Authentication error", );
    }
}

export class HttpError extends ApiError {
    constructor(
        public readonly url: string,
        public readonly init: unknown,
        public readonly statusCode: number,
        message?: string,
        // options?: ErrorOptions
    ) {
        super(url, init, message ?? `API HTTP request failed with code ${statusCode}`);
    }
}

export class BackendError extends HttpError {
    constructor(
        public readonly url: string,
        public readonly init: unknown,
        public readonly statusCode: number,
        public readonly cause: string,
        // options?: ErrorOptions
    ) {
        super(url, init, statusCode, `Backend API reported an error. ${cause}`, );
    }
}
