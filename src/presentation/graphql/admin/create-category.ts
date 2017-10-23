import { IAdminCreateCategoryInput, IAdminCreateCategoryOutput } from 'core'
import { Injector } from 'di-typescript'
import { Field, InputObjectType, NonNull, ObjectType } from 'graphql-decorator'
import { AdminCreateCategory } from 'presentation/use-case-factories/admin'

@InputObjectType()
export class CreateCategoryInputForAdmin implements IAdminCreateCategoryInput {

    @NonNull() @Field()
    public name: string

    @NonNull() @Field()
    public image: string

}

@ObjectType()
export class CreateCategoryOutputForAdmin implements IAdminCreateCategoryOutput {

    @Field()
    public id: string

    @Field()
    public name: string

    @Field()
    public image: string

}

export function adminCreateCategory(input: CreateCategoryInputForAdmin): Promise<IAdminCreateCategoryOutput>  {
    const useCase = new Injector().get(AdminCreateCategory).build()
    return useCase.execute(input)
}
