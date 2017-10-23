import { ICategoryRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminUpdateCategory extends BaseAdminUseCase<IAdminUpdateCategoryInput, IAdminUpdateCategoryOutput> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected categoryRepository: ICategoryRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(input: IAdminUpdateCategoryInput): Promise<IAdminUpdateCategoryOutput> {
    return this.categoryRepository.updateCategory(input.id, input.category)
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
