import { AuthorizerDataSource } from 'core'
import { ISubcategoryDataSource } from 'core/data-sources'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateSubcategory extends BaseAdminUseCase<IAdminCreateSubcategoryInput, IAdminCreateSubcategoryOutput> {

    constructor(
        protected authorizerDataSource: AuthorizerDataSource,
        protected subcategoryDataSource: ISubcategoryDataSource,
    ) {
        super(authorizerDataSource)
    }

    public async buildUseCase(input: IAdminCreateSubcategoryInput): Promise<IAdminCreateSubcategoryOutput> {
        return this.subcategoryDataSource.createSubcategory(input)
    }

}

class IAdminCreateSubcategoryInput {
    public name: string
    public image: string
    public categoryId: string
}

class IAdminCreateSubcategoryOutput {
    public id: string
    public name: string
    public image: string
    public categoryId: string
}
