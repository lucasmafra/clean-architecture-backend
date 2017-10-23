import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { graphql} from 'graphql'
import { schemaFactory } from 'graphql-decorator'
import { MyTopShopSchema } from './graphql'
import { parseRequest } from './my-top-shop-request'
import { buildResponse } from './my-top-shop-response'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const request = parseRequest(event)
        const result = await graphql(schemaFactory(MyTopShopSchema), request.body.query, null, null, request.body.variables)
        if (!result.errors) {
            callback(undefined, buildResponse(200, result.data))
        } else {
            callback(undefined, buildResponse(500, undefined, result.errors))
        }
    } catch (err) {
        callback(undefined, buildResponse(500, undefined, err.message))
    }
}
