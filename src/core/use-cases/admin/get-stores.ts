import { AuthorizerServiceGateway, StoreRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetStoresUseCase extends BaseAdminUseCase<IUseCaseDependencies, null, IUseCaseOutput[]> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput[]> {
    return this.dependencies.storeRepository.getAllStores()
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  storeRepository: StoreRepositoryGateway.IStoreRepository,
}

interface IUseCaseOutput {
  id: string
  name: string
  cnpj: string
  phone: string
  zipCode: string
  address: string
  addressNumber: string
  addressComplement: string
  locationDetail: string
  city: string
  state: string
  site: string
  description: string
  totalSales: number
  totalCampaigns: number
  totalFollowers: number
  logoPhoto?: string
}
