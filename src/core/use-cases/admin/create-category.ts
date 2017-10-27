import { IsString, Length } from 'class-validator'
import { AuthorizerDataSource, ICategoryDataSource } from 'core'
import { Serializable } from 'presentation/api/request'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminCreateCategory extends BaseAdminUseCase<AdminCreateCategoryInput, AdminCreateCategoryOutput> {

    constructor(
        protected authorizerDataSource: AuthorizerDataSource,
        protected categoryDataSource: ICategoryDataSource,
    ) {
        super(authorizerDataSource)
    }

    public async buildUseCase(input: AdminCreateCategoryInput): Promise<AdminCreateCategoryOutput> {
        return this.categoryDataSource.createCategory(input)
    }
}

export class AdminCreateCategoryInput {
    @Serializable() @IsString() @Length(10, 20)
    public name: string

    @Serializable() @IsString() @Length(10, 20)
    public image: string
}

export class AdminCreateCategoryOutput {
    public id: string
    public name: string
    public image: string
}
