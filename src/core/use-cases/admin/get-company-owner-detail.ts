import { ICompanyOwnerRepository } from 'core/repositories'
import { AuthorizerService} from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyOwnerDetail extends BaseAdminUseCase<IAdminGetCompanyOwnerDetailInput, IAdminGetCompanyOwnerDetailOutput> {

    constructor(
        protected authorizerService: AuthorizerService,
        protected companyOwnerRepository: ICompanyOwnerRepository,
    ) {
        super(authorizerService)
    }

    public async buildUseCase(input: IAdminGetCompanyOwnerDetailInput): Promise<IAdminGetCompanyOwnerDetailOutput> {
        const companyOwner = await this.companyOwnerRepository.getCompanyOwnerById(input.id)
        if (!companyOwner) {
            throw new Error('Company Owner not found')
        }
        return companyOwner
    }
}

export interface IAdminGetCompanyOwnerDetailInput {
    id: string
}

export interface IAdminGetCompanyOwnerDetailOutput {
    id: string
    name: string
    cpf: string
    email: string
}
