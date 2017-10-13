import { APIGatewayEvent  } from 'aws-lambda'

export interface IMyTopShopRequestHeaders {
    identityProvider: string
    token: string
}

export interface IMyTopShopRequestBody {
    query: string
    variables: { [key: string]: any }
}

export class MyTopShopRequest {
    public body: IMyTopShopRequestBody
    public headers: IMyTopShopRequestHeaders
    constructor(query: string, variables: { [key: string]: any }, identityProvider: string, token: string) {
        this.body = {
            query,
            variables,
        }
        this.headers = {
            identityProvider,
            token,
        }
    }
}

export function requestParser(event: APIGatewayEvent) {
    const body = JSON.parse(event.body as string)
    return new MyTopShopRequest(
        body.query,
        body.variables,
        event.headers['Identity-Provider'] || event.headers['identity-provider'] ,
        event.headers.Token || event.headers.token,
    )
}
