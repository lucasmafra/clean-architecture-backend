import { AuthorizerServiceGateway, SubcategoryRepositoryGateway } from 'core/gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminUpdateSubcategoryUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput> {
    return this.dependencies.subcategoryRepository.updateSubcategory(input.id, input.subcategory)
  }
}

interface IUseCaseDependencies {
  authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
  subcategoryRepository: SubcategoryRepositoryGateway.ISubcategoryRepository,
}

interface IUseCaseInput {
  id: string,
  subcategory: {
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
