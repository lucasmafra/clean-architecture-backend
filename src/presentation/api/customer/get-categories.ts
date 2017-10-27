import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { Injector } from 'di-typescript'
import { buildResponseError, buildResponseSuccess, ResponseCode } from 'presentation/api/response'
import { CustomerGetCategories } from 'presentation/use-case-factories'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const useCase = new Injector().get(CustomerGetCategories).build()
        const result = await useCase.execute(null)
        callback(undefined, buildResponseSuccess(ResponseCode.Success, result))
    } catch (err) {
        callback(undefined, buildResponseError(err))
    }
}
