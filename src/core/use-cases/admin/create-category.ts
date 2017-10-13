import { AuthorizerServiceGateway, CategoryRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateCategoryUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput> {
    return this.dependencies.categoryRepository.createCategory(input)
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  categoryRepository: CategoryRepositoryGateway.ICategoryRepository,
}

interface IUseCaseInput {
  name: string
  description: string
  image: string,
}

interface IUseCaseOutput {
  id: string
  name: string
  description: string
  image: string
}
