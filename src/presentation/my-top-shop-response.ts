export interface IMyTopShopResponseHeaders {
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
}

export interface IMyTopShopResponseBody {
    data?: { [key: string]: any }
    errors?: Error[]
}

export class MyTopShopResponse {
      public statusCode: number
      public body: IMyTopShopResponseBody
      public isBase64Encoded?: boolean
      public headers: IMyTopShopResponseHeaders
      constructor(statusCode: number, data?: { [key: string]: any }, errors?: Error[], isBase64Encoded?: boolean) {
          this.statusCode = statusCode
          this.body = { data, errors }
          this.isBase64Encoded = isBase64Encoded || false
      }
}

export function responseBuilder(statusCode: number, data?: { [key: string]: any }, errors?: Error[], isBase64Encoded?: boolean): JSON {
    const response = new MyTopShopResponse(statusCode, data, errors, isBase64Encoded)
    return JSON.parse(JSON.stringify(response))
}
