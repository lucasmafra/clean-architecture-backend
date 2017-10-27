import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { Injector } from 'di-typescript'
import { AdminGetCompanies } from 'presentation/use-case-factories'
import { buildResponseError, buildResponseSuccess, ResponseCode } from '../response'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const useCase = new Injector().get(AdminGetCompanies).build()
        const result = await useCase.execute(null)
        callback(undefined, buildResponseSuccess(ResponseCode.Success, result))
    } catch (err) {
        callback(undefined, buildResponseError(err))
    }
}
