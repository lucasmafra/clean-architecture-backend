import { IUseCaseFactory } from 'core'
import * as AdminUseCases from 'core/use-cases/admin'
import { CognitoAuthorizer } from 'data'
import * as DynamoDataSource from 'data/database'
import { Inject } from 'di-typescript'

@Inject
export class AdminGetCompaniesUseCaseFactory implements IUseCaseFactory<AdminUseCases.AdminGetCompaniesUseCase> {
    constructor(
        public companyRepository: DynamoDataSource.DynamoCompany,
        public authorizerService: CognitoAuthorizer,
    ) {}
    public build() { return new AdminUseCases.AdminGetCompaniesUseCase(this) }
}

@Inject
export class AdminGetCompanyOwnerUseCase implements IUseCaseFactory<AdminUseCases.AdminGetCompanyOwnerUseCase> {
    constructor(
        public companyOwnerRepository: DynamoDataSource.DynamoCompanyOwner,
        public authorizerService: CognitoAuthorizer,
    ) {}
    public build() { return new AdminUseCases.AdminGetCompanyOwnerUseCase(this) }
}
