import { ICompanyRepository} from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanies extends BaseAdminUseCase<null, IAdminGetCompaniesOutput[]> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected companyRepository: ICompanyRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(): Promise<IAdminGetCompaniesOutput[]> {
    return this.companyRepository.getAllCompanies()
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
