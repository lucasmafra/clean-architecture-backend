import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { AdminCreateCategoryInput, ErrorType, MyTopShopError } from 'core'
import { Injector } from 'di-typescript'
import { AdminCreateCategory } from 'presentation/use-case-factories'
import { parseRequest } from '../request'
import { buildResponseError, buildResponseSuccess, ResponseCode } from '../response'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const request = parseRequest(event)
        const input = new AdminCreateCategoryInput()
        const validationErrors = await request.validateBody(input)
        if (validationErrors.length) {
            throw new MyTopShopError(ErrorType.ValidationError, validationErrors)
        }
        const useCase = new Injector().get(AdminCreateCategory).build()
        const result = await useCase.execute(input)
        callback(undefined, buildResponseSuccess(ResponseCode.Success, result))
    } catch (err) {
        callback(undefined, buildResponseError(err))
    }
}
