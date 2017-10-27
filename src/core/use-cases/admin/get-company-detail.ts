import { ICompanyDataSource } from 'core'
import { AuthorizerDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyDetail extends BaseAdminUseCase<IAdminGetCompanyDetailInput, IAdminGetCompanyDetailOutput> {

  constructor(
    protected authorizerDataSource: AuthorizerDataSource,
    protected companyDataSource: ICompanyDataSource,
  ) {
    super(authorizerDataSource)
  }

  public async buildUseCase(input: IAdminGetCompanyDetailInput): Promise<IAdminGetCompanyDetailOutput> {
    const company = await this.companyDataSource.getCompanyById(input.id)
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
