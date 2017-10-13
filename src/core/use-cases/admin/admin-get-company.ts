import { AuthorizerServiceGateway, CompanyRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
    protected input: IUseCaseInput,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput> {
    const company = await this.dependencies.companyRepository.getCompanyById(this.input.id)
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
