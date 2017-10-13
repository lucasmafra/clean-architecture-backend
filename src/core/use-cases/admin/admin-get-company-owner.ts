import { AuthorizerServiceGateway, CompanyOwnerRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyOwnerUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
    protected input: IUseCaseInput,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput> {
    const companyOwner = await this.dependencies.companyOwnerRepository.getCompanyOwnerById(this.input.id)
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
