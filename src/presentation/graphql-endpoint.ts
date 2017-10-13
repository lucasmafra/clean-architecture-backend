import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { graphql} from 'graphql'
import { MyTopShopSchema } from './graphql'
import { MyTopShopRequest } from './my-top-shop-request'
import { responseBuilder } from './response-builder'

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    try {
        const body = JSON.parse(event.body as string)
        const request = new MyTopShopRequest(body.query, body.variables, event.headers['Identity-Provider'] || event.headers['identity-provider'] , event.headers.Token || event.headers.token)
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
