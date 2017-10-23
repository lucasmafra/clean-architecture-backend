import { IUseCaseFactory } from 'core'
import * as CustomerUseCases from 'core/use-cases/customer'
import { CognitoAuthorizer } from 'data'
import * as Database from 'data/database'
import { Inject } from 'di-typescript'

@Inject
export class CustomerGetCategories implements IUseCaseFactory<CustomerUseCases.CustomerGetCategories> {
    constructor(
        public authorizerService: CognitoAuthorizer,
        public categoryRepository: Database.DynamoCategory,
    ) {}
    public build() { return new CustomerUseCases.CustomerGetCategories(this.authorizerService, this.categoryRepository) }
}
