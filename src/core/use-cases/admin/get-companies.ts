import { ICompanyDataSource} from 'core'
import { AuthorizerDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanies extends BaseAdminUseCase<null, IAdminGetCompaniesOutput[]> {

  constructor(
    protected authorizerDataSAuthorizerDataSource: AuthorizerDataSource,
    protected companyDataSource: ICompanyDataSource,
  ) {
    super(authorizerDataSAuthorizerDataSource)
  }

  public async buildUseCase(): Promise<IAdminGetCompaniesOutput[]> {
    return this.companyDataSource.getAllCompanies()
  }
}

interface IAdminGetCompaniesOutput {
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
