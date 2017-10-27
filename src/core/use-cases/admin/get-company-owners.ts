import { ICompanyOwnerDataSource } from 'core'
import { AuthorizerDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyOwners extends BaseAdminUseCase<null, IAdminGetCompanyOwnersOutput[]> {

    constructor(
        protected authorizerDataAuthorizerDataSource: AuthorizerDataSource,
        protected companyOwnerDataSource: ICompanyOwnerDataSource,
    ) {
        super(authorizerDataAuthorizerDataSource)
    }

    public async buildUseCase(): Promise<IAdminGetCompanyOwnersOutput[]> {
        return this.companyOwnerDataSource.getAllCompanyOwners()
    }
}

export interface IAdminGetCompanyOwnersOutput {
  id: string
  name: string
  cpf: string
  email: string
}
