import { AuthorizerServiceGateway, PendingCompanyRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetPendingCompaniesUseCase extends BaseAdminUseCase<IUseCaseDependencies, undefined, IUseCaseOutput[]> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput[]> {
    return this.dependencies.pendingCompanyRepository.getAllPendingCompanies()
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  pendingCompanyRepository: PendingCompanyRepositoryGateway.IPendingCompanyRepository,
}

interface IUseCaseOutput {
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
