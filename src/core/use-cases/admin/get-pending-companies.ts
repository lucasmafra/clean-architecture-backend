import { ICompanyRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminGetPendingCompanies extends BaseAdminUseCase<null, IAdminGetPendingCompaniesOutput[]> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected companyRepository: ICompanyRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(): Promise<IAdminGetPendingCompaniesOutput[]> {
    return this.companyRepository.getAllPendingCompanies()
  }
}

interface IAdminGetPendingCompaniesOutput {
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
