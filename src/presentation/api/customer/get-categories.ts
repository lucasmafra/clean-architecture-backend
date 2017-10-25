import { ICustomerGetCategoriesOutput } from 'core'
import { Injector } from 'di-typescript'
import { Field, List, ObjectType } from 'graphql-decorator'
import { CustomerGetCategories } from 'presentation/use-case-factories/customer'

@ObjectType()
export class SubcategoryForCustomer {

    @Field()
    public id: string

    @Field()
    public name: string

    @Field()
    public image: string

}

@ObjectType()
export class CategoryForCustomer implements ICustomerGetCategoriesOutput {

    @Field()
    public id: string

    @Field()
    public name: string

    @Field()
    public image: string

    @List() @Field({ type: SubcategoryForCustomer })
    public subcategories: SubcategoryForCustomer[]
}

export function customerGetCategories(): Promise<CategoryForCustomer[]> {
    const useCase = new Injector().get(CustomerGetCategories).build()
    return useCase.execute(null)
}
