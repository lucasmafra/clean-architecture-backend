import { AuthorizerServiceGateway, StoreRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetStoreUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
    protected input: IUseCaseInput,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput> {
    const store = await this.dependencies.storeRepository.getStoreById(this.input.id)
    if (!store) {
      throw new Error('No Store found')
    }
    return store
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  storeRepository: StoreRepositoryGateway.IStoreRepository,
}

interface IUseCaseInput {
  id: string
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
