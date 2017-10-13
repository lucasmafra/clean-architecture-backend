import { APIGatewayEvent, Callback, Context  } from 'aws-lambda'
import { AdminGetCompaniesUseCase } from 'core'
import { Inject, Injector } from 'di-typescript'
import { DynamoCompanyRepository } from 'repository'
import { CognitoAuthorizerService } from 'services'
import { responseBuilder } from './response-builder'

@Inject
class UseCaseDependencies {
    constructor(
        public companyRepository: DynamoCompanyRepository ,
        public authorizerService: CognitoAuthorizerService,
    ) {}
}

export async function endpoint(event: APIGatewayEvent, context: Context, callback: Callback) {
    const useCaseDependencies = new Injector().get(UseCaseDependencies)
    const getCompaniesUseCase = new AdminGetCompaniesUseCase(useCaseDependencies)
    const result = await getCompaniesUseCase.execute()
    callback(undefined, responseBuilder(200, result))
}
