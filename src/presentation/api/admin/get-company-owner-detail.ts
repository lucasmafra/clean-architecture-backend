import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { Injector } from 'di-typescript'
import { AdminGetCompanyOwnerDetail } from 'presentation/use-case-factories'
import { buildResponse } from '../my-top-shop-response'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        if (!event.pathParameters || !event.pathParameters.id) {
            throw new Error('Missing parameter id')
        }
        const id = event.pathParameters.id
        const useCase = new Injector().get(AdminGetCompanyOwnerDetail).build()
        const result = await useCase.execute({id})
        callback(undefined, buildResponse(200, result))
    } catch (err) {
        callback(undefined, buildResponse(500, undefined, err.message))
    }
}
