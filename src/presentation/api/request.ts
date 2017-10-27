import { APIGatewayEvent  } from 'aws-lambda'
import { validate } from 'class-validator'

export interface IRequestHeaders {
    identityProvider: string
    token: string
}

export interface IRequestBody {
    [key: string]: any
}

export class Request {
    public body: IRequestBody
    public headers: IRequestHeaders
    constructor(data: JSON, identityProvider: string, token: string) {
        this.body = data
        this.headers = {
            identityProvider,
            token,
        }
    }
    public async validateBody(inputModel: any): Promise<Array<{[type: string]: string}>> {
        for (const key in inputModel) {
            inputModel[key] = this.body[key]
        }
        const validationErrors = await validate(inputModel)
        return validationErrors.map( (validationError) => validationError.constraints)
    }
}

export function parseRequest(event: APIGatewayEvent): Request {
    const body = JSON.parse(event.body as string)
    return new Request(
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
