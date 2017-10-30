import { IUseCaseFactory } from 'core'
import * as AdminUseCases from 'core/use-cases/admin'
import { CognitoAuthorizer } from 'data'
import * as Database from 'data/database'
import { Inject } from 'di-typescript'

@Inject
export class AdminCreateCategory implements IUseCaseFactory<AdminUseCases.AdminCreateCategory> {
    constructor(
        protected authorizerService: CognitoAuthorizer,
        protected categoryDataSource: Database.CategoryDatabase,
    ) {}
    public build() { return new AdminUseCases.AdminCreateCategory(this.authorizerService, this.categoryDataSource) }
}
