import { ISubcategoryRepository } from 'core/repositories'
import { AuthorizerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateSubcategory extends BaseAdminUseCase<IAdminCreateSubcategoryInput, IAdminCreateSubcategoryOutput> {

    constructor(
        protected authorizerService: AuthorizerService,
        protected subcategoryRepository: ISubcategoryRepository,
    ) {
        super(authorizerService)
    }

    public async buildUseCase(input: IAdminCreateSubcategoryInput): Promise<IAdminCreateSubcategoryOutput> {
        return this.subcategoryRepository.createSubcategory(input)
    }

}

interface IAdminCreateSubcategoryInput {
    name: string
    image: string,
    categoryId: string,
}

interface IAdminCreateSubcategoryOutput {
    id: string
    name: string
    image: string
    categoryId: string
}
