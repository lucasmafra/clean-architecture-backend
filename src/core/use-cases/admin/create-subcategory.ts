import { AuthorizerServiceGateway, CategoryRepositoryGateway, SubcategoryRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateSubcategoryUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput> {
    await this.validate(input.categoryId)
    return this.dependencies.subcategoryRepository.createSubcategory(input)
  }

  private async validate(categoryId: string) {
    const category = await this.dependencies.categoryRepository.getCategoryById(categoryId)
    if (!category) {
      throw new Error('Invalid category id')
    }
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  subcategoryRepository: SubcategoryRepositoryGateway.ISubcategoryRepository,
  categoryRepository: CategoryRepositoryGateway.ICategoryRepository,
}

interface IUseCaseInput {
  name: string
  description: string
  image: string,
  categoryId: string,
}

interface IUseCaseOutput {
  id: string
  name: string
  description: string
  image: string
  categoryId: string
}
