import { AuthorizerDataSource, ICompanyDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetPendingCompanies extends BaseAdminUseCase<null, IAdminGetPendingCompaniesOutput[]> {

  constructor(
    protected authorizerService: AuthorizerDataSource,
    protected companyDataSource: ICompanyDataSource,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(): Promise<IAdminGetPendingCompaniesOutput[]> {
    return this.companyDataSource.getAllPendingCompanies()
  }
}

interface IAdminGetPendingCompaniesOutput {
  id: string
  companyOwnerName: string
  companyOwnerCpf: string
  companyOwnerEmail: string
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
  adminApproved: boolean
}
