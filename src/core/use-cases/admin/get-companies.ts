import { AuthorizerServiceGateway, CompanyRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompaniesUseCase extends BaseAdminUseCase<IUseCaseDependencies, null, IUseCaseOutput[]> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput[]> {
    return this.dependencies.companyRepository.getAllCompanies()
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  companyRepository: CompanyRepositoryGateway.ICompanyRepository,
}

interface IUseCaseOutput {
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
