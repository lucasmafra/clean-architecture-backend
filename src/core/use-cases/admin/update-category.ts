import { AuthorizerServiceGateway, CategoryRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminUpdateCategoryUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput> {
    return this.dependencies.categoryRepository.updateCategory(input.id, input.category)
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  categoryRepository: CategoryRepositoryGateway.ICategoryRepository,
}

interface IUseCaseInput {
  id: string,
  category: {
    name?: string
    description?: string
    image?: string,
  }
}

interface IUseCaseOutput {
  id: string
  name: string
  description: string
  image: string
}
