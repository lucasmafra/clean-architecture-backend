import * as uuid from 'uuid'
import { AuthorizerServiceGateway, CategoryRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateCategoryUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

  constructor(
    protected dependencies: IUseCaseDependencies,
    protected input: IUseCaseInput,
  ) {
    super(dependencies.authorizerService)
  }

  public async buildUseCase(): Promise<IUseCaseOutput> {
    return this.dependencies.categoryRepository.createCategory({
      id: uuid.v4(),
      ...this.input,
    })
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
