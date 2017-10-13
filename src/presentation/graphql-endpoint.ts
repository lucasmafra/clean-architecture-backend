import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { graphql} from 'graphql'
import { MyTopShopSchema } from './graphql'
import { requestParser } from './my-top-shop-request'
import { responseBuilder } from './my-top-shop-response'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const request = requestParser(event)
        const result = await graphql(MyTopShopSchema, request.body.query, null, null, request.body.variables)
        if (result.errors) {
            callback(undefined, responseBuilder(500, result))
        } else {
            callback(undefined, responseBuilder(200, result))
        }
    } catch (err) {
        callback(undefined, responseBuilder(500, err.message))
    }
}
