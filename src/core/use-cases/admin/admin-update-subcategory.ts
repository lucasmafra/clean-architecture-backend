import { AuthorizerServiceGateway, SubcategoryRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminUpdateSubcategoryUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
    protected input: IUseCaseInput,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput> {
    return this.dependencies.subcategoryRepository.updateSubcategory(this.input.id, this.input.subcategory)
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
