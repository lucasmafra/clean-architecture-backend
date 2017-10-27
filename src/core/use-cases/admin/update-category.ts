import { AuthorizerDataSource, ICategoryDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminUpdateCategory extends BaseAdminUseCase<IAdminUpdateCategoryInput, IAdminUpdateCategoryOutput> {

  constructor(
    protected authorizerDataSource: AuthorizerDataSource,
    protected categoryDataSource: ICategoryDataSource,
  ) {
    super(authorizerDataSource)
  }

  public async buildUseCase(input: IAdminUpdateCategoryInput): Promise<IAdminUpdateCategoryOutput> {
    return this.categoryDataSource.updateCategory(input.id, input.category)
  }
}

interface IAdminUpdateCategoryInput {
  id: string,
  category: {
    name?: string
    image?: string,
  }
}

interface IAdminUpdateCategoryOutput {
  id: string
  name: string
  image: string
}
