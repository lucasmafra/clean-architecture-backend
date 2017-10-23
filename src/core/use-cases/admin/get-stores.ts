import { IStoreRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetStores extends BaseAdminUseCase<null, IAdminGetStoresOutput[]> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected storeRepository: IStoreRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(): Promise<IAdminGetStoresOutput[]> {
    return this.storeRepository.getAllStores()
  }
}

interface IAdminGetStoresOutput {
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
