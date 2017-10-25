import { APIGatewayEvent  } from 'aws-lambda'
import { validate, ValidationError } from 'class-validator'

export interface IMyTopShopRequestHeaders {
    identityProvider: string
    token: string
}

export interface IMyTopShopRequestBody {
    [key: string]: any
}

export class MyTopShopRequest {
    public body: IMyTopShopRequestBody
    public headers: IMyTopShopRequestHeaders
    constructor(data: JSON, identityProvider: string, token: string) {
        this.body = data
        this.headers = {
            identityProvider,
            token,
        }
    }
    public validateBody(inputModel: any): Promise<ValidationError[] | undefined> {
        for (const key in inputModel) {
            inputModel[key] = this.body[key]
        }
        return validate(inputModel)
    }
}

export function parseRequest(event: APIGatewayEvent): MyTopShopRequest {
    const body = JSON.parse(event.body as string)
    return new MyTopShopRequest(
        body,
        event.headers['Identity-Provider'] || event.headers['identity-provider'] ,
        event.headers.Token || event.headers.token,
    )
}

export function Serializable(): any {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        target[propertyKey] = undefined
    }
}
