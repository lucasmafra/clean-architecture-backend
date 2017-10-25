import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { Injector } from 'di-typescript'
import { AdminGetCompanies } from 'presentation/use-case-factories'
import { buildResponse } from '../my-top-shop-response'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const useCase = new Injector().get(AdminGetCompanies).build()
        const result = await useCase.execute(null)
        callback(undefined, buildResponse(200, result))
    } catch (err) {
        callback(undefined, buildResponse(500, undefined, err.message))
    }
}
