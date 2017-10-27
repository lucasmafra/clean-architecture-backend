import { ICategoryDataSource, ISubcategoryDataSource } from 'core'
import { AuthorizerDataSource } from 'core'
import { BaseCustomerUseCase } from './base-customer-use-case'

export class CustomerGetCategories extends BaseCustomerUseCase<null, ICustomerGetCategoriesOutput[]> {

  constructor(
    protected authorizerDataSource: AuthorizerDataSource,
    protected categoryDataSource: ICategoryDataSource,
    protected subcategoryDataSource: ISubcategoryDataSource,
  ) {
    super(authorizerDataSource)
  }

  public async buildUseCase(): Promise<ICustomerGetCategoriesOutput[]> {
    const result = new Array<ICustomerGetCategoriesOutput>()
    const categories = await this.categoryDataSource.getAllCategories()
    for (const category of categories) {
      const subcategories = await this.subcategoryDataSource.getSubcategoriesByCategoryId(category.id)
      result.push({
        subcategories,
        ...category,
      })
    }
    return result
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
