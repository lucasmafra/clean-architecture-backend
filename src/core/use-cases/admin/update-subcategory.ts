import { AuthorizerDataSource, ISubcategoryDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminUpdateSubcategory extends BaseAdminUseCase<IAdminUpdateSubcategoryInput, IAdminUpdateSubcategoryOutput> {

  constructor(
    protected authorizerDataSource: AuthorizerDataSource,
    protected subcategoryDataSource: ISubcategoryDataSource,
  ) {
    super(authorizerDataSource)
  }

  public async buildUseCase(input: IAdminUpdateSubcategoryInput): Promise<IAdminUpdateSubcategoryOutput> {
    return this.subcategoryDataSource.updateSubcategory(input.id, input.subcategory)
  }
}

interface IAdminUpdateSubcategoryInput {
  id: string,
  subcategory: {
    name?: string
    image?: string,
  }
}

interface IAdminUpdateSubcategoryOutput {
  id: string
  name: string
  image: string
}
