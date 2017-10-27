export class MyTopShopError extends Error {
    public type: ErrorType
    public data?: object
    constructor(type: ErrorType, data?: {[key: string]: any}, message?: string) {
        super(message)
        this.type = type
        this.data = data
    }
}

export enum ErrorType {
    Unauthorized,
    ValidationError,
    GenericError,
}
