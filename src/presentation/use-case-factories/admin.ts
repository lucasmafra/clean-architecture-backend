import { IUseCaseFactory } from 'core'
import * as AdminUseCases from 'core/use-cases/admin'
import { CognitoAuthorizer } from 'data'
import * as Database from 'data/database'
import { Inject } from 'di-typescript'

@Inject
export class AdminGetCompanies implements IUseCaseFactory<AdminUseCases.AdminGetCompanies> {
    constructor(
        protected authorizerService: CognitoAuthorizer,
        protected companyRepository: Database.DynamoCompany,
    ) {}
    public build() { return new AdminUseCases.AdminGetCompanies(this.authorizerService, this.companyRepository) }
}

@Inject
export class AdminGetCompanyOwnerDetail implements IUseCaseFactory<AdminUseCases.AdminGetCompanyOwnerDetail> {
    constructor(
        protected authorizerService: CognitoAuthorizer,
        protected companyOwnerRepository: Database.DynamoCompanyOwner,
    ) {}
    public build() { return new AdminUseCases.AdminGetCompanyOwnerDetail(this.authorizerService, this.companyOwnerRepository) }
}

@Inject
export class AdminGetCompanyOwners implements IUseCaseFactory<AdminUseCases.AdminGetCompanyOwners> {
    constructor(
        protected authorizerService: CognitoAuthorizer,
        protected companyOwnerRepository: Database.DynamoCompanyOwner,
    ) {}
    public build() { return new AdminUseCases.AdminGetCompanyOwners(this.authorizerService, this.companyOwnerRepository) }
}

@Inject
export class AdminCreateCategory implements IUseCaseFactory<AdminUseCases.AdminCreateCategory> {
    constructor(
        protected authorizerService: CognitoAuthorizer,
        protected categoryRepository: Database.DynamoCategory,
    ) {}
    public build() { return new AdminUseCases.AdminCreateCategory(this.authorizerService, this.categoryRepository) }
}
