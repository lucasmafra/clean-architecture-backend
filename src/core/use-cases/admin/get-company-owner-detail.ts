import { ICompanyOwnerDataSource } from 'core'
import { AuthorizerDataSource} from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyOwnerDetail extends BaseAdminUseCase<IAdminGetCompanyOwnerDetailInput, IAdminGetCompanyOwnerDetailOutput> {

    constructor(
        protected authorizerDataSource: AuthorizerDataSource,
        protected companyOwnerDataSource: ICompanyOwnerDataSource,
    ) {
        super(authorizerDataSource)
    }

    public async buildUseCase(input: IAdminGetCompanyOwnerDetailInput): Promise<IAdminGetCompanyOwnerDetailOutput> {
        const companyOwner = await this.companyOwnerDataSource.getCompanyOwnerById(input.id)
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
