import { ICompanyRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyDetail extends BaseAdminUseCase<IAdminGetCompanyDetailInput, IAdminGetCompanyDetailOutput> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected companyRepository: ICompanyRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(input: IAdminGetCompanyDetailInput): Promise<IAdminGetCompanyDetailOutput> {
    const company = await this.companyRepository.getCompanyById(input.id)
    if (!company) {
      throw new Error('No company found')
    }
    return company
  }
}

export interface IAdminGetCompanyDetailInput {
  id: string
}

export interface IAdminGetCompanyDetailOutput {
  id: string
  tradeName: string
  companyName: string
  cnpj: string
  phone: string
  zipCode: string
  address: string
  addressNumber: string
  addressComplement: string
  city: string
  state: string
  logoPhoto?: string
  coverPhoto?: string
}
