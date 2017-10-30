import { ApplicationError, ApplicationErrorType } from 'core'

export class Response {
      public statusCode: ResponseCode
      public headers: IResponseHeaders
      public body: IResponseBody
      public isBase64Encoded?: boolean
      constructor(statusCode: ResponseCode, data?: { [key: string]: any }, errors?: object, isBase64Encoded?: boolean) {
          this.statusCode = statusCode
          this.body = { data, errors }
          this.isBase64Encoded = isBase64Encoded || false
      }
}

export interface IResponseBody {
    data?: { [key: string]: any }
    errors?: object
}

export interface IResponseHeaders {
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
}

export function buildResponseSuccess(
    statusCode: ResponseCode,
    data?: { [key: string]: any },
    isBase64Encoded?: boolean,
): Response {
    const response = new Response(statusCode, data, undefined, isBase64Encoded)
    return JSON.parse(JSON.stringify(response))
}

export function buildResponseError(
    error: ApplicationError,
): Response {
    let statusCode: number
    switch (error.type) {
        case ApplicationErrorType.Unauthorized:
            statusCode = ResponseCode.Unauthorized
            error.data = { message: 'Unauthorized'}
            break
        case ApplicationErrorType.ValidationError:
            statusCode = ResponseCode.InvalidRequest
            break
        default:
            statusCode = ResponseCode.InternalServerError
            error.data = { message: 'Internal server error'}
            break
    }
    const response = new Response(statusCode, undefined, error.data)
    return JSON.parse(JSON.stringify(response))
}

export enum ResponseCode {
    Success = 200,
    InvalidRequest = 400,
    Unauthorized = 401,
    InternalServerError = 500,
    NotImplemented = 501,
}
