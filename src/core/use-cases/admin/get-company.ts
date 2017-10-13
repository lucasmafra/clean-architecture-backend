import { AuthorizerServiceGateway, CompanyRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput> {
    const company = await this.dependencies.companyRepository.getCompanyById(input.id)
    if (!company) {
      throw new Error('No company found')
    }
    return company
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  companyRepository: CompanyRepositoryGateway.ICompanyRepository,
}

interface IUseCaseInput {
  id: string
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
