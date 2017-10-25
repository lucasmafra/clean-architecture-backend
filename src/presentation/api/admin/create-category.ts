import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { IsString, Length } from 'class-validator'
import { IAdminCreateCategoryInput } from 'core'
import { Injector } from 'di-typescript'
import { AdminCreateCategory } from 'presentation/use-case-factories'
import { parseRequest, Serializable } from '../my-top-shop-request'
import { buildResponse } from '../my-top-shop-response'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const request = parseRequest(event)
        const input = new Input()
        const validationErrors = await request.validateBody(input)
        if (validationErrors) {
            // TODO handle errors
        }
        const useCase = new Injector().get(AdminCreateCategory).build()
        const result = await useCase.execute(input)
        callback(undefined, buildResponse(200, result))
    } catch (err) {
        callback(undefined, buildResponse(500, undefined, err.message))
    }
}

class Input implements IAdminCreateCategoryInput {

        @Serializable() @IsString() @Length(10, 20)
        public name: string

        @Serializable() @IsString() @Length(10, 20)
        public image: string

}
