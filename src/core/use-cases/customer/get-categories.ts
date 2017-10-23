import { ICategoryRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseCustomerUseCase } from './base-customer-use-case'

export class CustomerGetCategories extends BaseCustomerUseCase<null, ICustomerGetCategoriesOutput[]> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected categoryRepository: ICategoryRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(): Promise<ICustomerGetCategoriesOutput[]> {
    return this.categoryRepository.getAllCategories()
  }
}

export interface ICustomerGetCategoriesOutput {
  id: string
  name: string
  image: string
  subcategories: Array<{
    id: string,
    name: string,
    image: string,
  }>
}
