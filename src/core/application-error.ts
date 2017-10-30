export class ApplicationError extends Error {
    public type: ApplicationErrorType
    public data?: object
    constructor(type: ApplicationErrorType, data?: {[key: string]: any}, message?: string) {
        super(message)
        this.type = type
        this.data = data
    }
}

export enum ApplicationErrorType {
    Unauthorized,
    ValidationError,
    GenericError,
}
