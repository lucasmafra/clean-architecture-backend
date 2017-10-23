import { ICompanyOwnerRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyOwners extends BaseAdminUseCase<null, IAdminGetCompanyOwnersOutput[]> {

    constructor(
        protected authorizerService: AuthorizerService,
        protected companyOwnerRepository: ICompanyOwnerRepository,
    ) {
        super(authorizerService)
    }

    public async buildUseCase(): Promise<IAdminGetCompanyOwnersOutput[]> {
        return this.companyOwnerRepository.getAllCompanyOwners()
    }
}

export interface IAdminGetCompanyOwnersOutput {
  id: string
  name: string
  cpf: string
  email: string
}
