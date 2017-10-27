import { AuthorizerDataSource, IStoreDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetStoreDetail extends BaseAdminUseCase<IAdminGetStoreDetail, IAdminGetStoreDetailOutput> {

  constructor(
    protected authorizerDataSource: AuthorizerDataSource,
    protected storeDataSource: IStoreDataSource,
  ) {
    super(authorizerDataSource)
  }

  public async buildUseCase(input: IAdminGetStoreDetail): Promise<IAdminGetStoreDetailOutput> {
    const store = await this.storeDataSource.getStoreById(input.id)
    if (!store) {
      throw new Error('No Store found')
    }
    return store
  }
}

interface IAdminGetStoreDetail {
  id: string
}

interface IAdminGetStoreDetailOutput {
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
