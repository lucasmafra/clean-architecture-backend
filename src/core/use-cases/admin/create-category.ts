import { ICategoryRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateCategory extends BaseAdminUseCase<IAdminCreateCategoryInput, IAdminCreateCategoryOutput> {

    constructor(
        protected authorizerService: AuthorizerService,
        protected categoryRepository: ICategoryRepository,
    ) {
        super(authorizerService)
    }

    public async buildUseCase(input: IAdminCreateCategoryInput): Promise<IAdminCreateCategoryOutput> {
        return this.categoryRepository.createCategory(input)
    }
}

export interface IAdminCreateCategoryInput {
    name: string
    image: string,
}

interface IAdminCreateCategoryOutput {
    id: string
    name: string
    image: string
}
