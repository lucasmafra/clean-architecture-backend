export class MyTopShopRequest {
    public body: IMyTopShopBody
    public headers: IMyTopShopHeaders
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

export interface IMyTopShopHeaders {
    identityProvider: string
    token: string
}

export interface IMyTopShopBody {
    query: string
    variables: { [key: string]: any }
}
