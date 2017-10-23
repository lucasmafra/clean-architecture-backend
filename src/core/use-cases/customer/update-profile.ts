import { CustomerAccountProvider, ICustomerRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseCustomerUseCase } from './base-customer-use-case'

export class CustomerUpdateProfile extends BaseCustomerUseCase<ICustomerUpdateProfileInput, ICustomerUpdateProfileOutput> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected customerRepository: ICustomerRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(input: ICustomerUpdateProfileInput): Promise<ICustomerUpdateProfileOutput> {
    return this.customerRepository.updateCustomer(this.credential.userId, input)
  }
}

export interface ICustomerUpdateProfileInput {
    name?: string
    country?: string
    state?: string
    city?: string
    gender?: string
    dateOfBirth?: Date
    accountProviders?: CustomerAccountProvider[]
    profilePicture?: string
}

export interface ICustomerUpdateProfileOutput {
    id: string
    email: string
    name: string
    city: string
    state: string
    country: string
    accountProviders: CustomerAccountProvider[]
    gender?: string
    dateOfBirth?: Date
    profilePicture?: string
}
