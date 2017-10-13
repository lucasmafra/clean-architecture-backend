import { AuthorizerServiceGateway, CompanyOwnerRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyOwnerUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput> {
    const companyOwner = await this.dependencies.companyOwnerRepository.getCompanyOwnerById(input.id)
    if (!companyOwner) {
      throw new Error('Company Owner not found')
    }
    return companyOwner
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  companyOwnerRepository: CompanyOwnerRepositoryGateway.ICompanyOwnerRepository,
}

interface IUseCaseInput {
  id: string
}

interface IUseCaseOutput {
  id: string
  name: string
  cpf: string
  email: string
}
