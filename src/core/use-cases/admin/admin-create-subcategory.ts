import * as uuid from 'uuid'
import { AuthorizerServiceGateway, CategoryRepositoryGateway, SubcategoryRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateSubcategoryUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
    protected input: IUseCaseInput,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput> {
    await this.validate()
    return this.dependencies.subcategoryRepository.createSubcategory({
      id: uuid.v4(),
      ...this.input,
    })
  }

  private async validate() {
    const category = await this.dependencies.categoryRepository.getCategoryById(this.input.categoryId)
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
