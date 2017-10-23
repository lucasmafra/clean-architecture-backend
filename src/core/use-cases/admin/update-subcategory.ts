import { ISubcategoryRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminUpdateSubcategory extends BaseAdminUseCase<IAdminUpdateSubcategoryInput, IAdminUpdateSubcategoryOutput> {

  constructor(
    protected authorizerService: AuthorizerService,
    protected subcategoryRepository: ISubcategoryRepository,
  ) {
    super(authorizerService)
  }

  public async buildUseCase(input: IAdminUpdateSubcategoryInput): Promise<IAdminUpdateSubcategoryOutput> {
    return this.subcategoryRepository.updateSubcategory(input.id, input.subcategory)
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
