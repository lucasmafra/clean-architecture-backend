import { AuthorizerServiceGateway, CompanyOwnerRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetCompanyOwnersUseCase extends BaseAdminUseCase<IUseCaseDependencies, undefined, IUseCaseOutput[]> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput[]> {
    return this.dependencies.companyOwnerRepository.getAllCompanyOwners()
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  companyOwnerRepository: CompanyOwnerRepositoryGateway.ICompanyOwnerRepository,
}

interface IUseCaseOutput {
  id: string
  name: string
  cpf: string
  email: string
}
