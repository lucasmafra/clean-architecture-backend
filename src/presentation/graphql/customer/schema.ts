import { Field, List, ObjectType } from 'graphql-decorator'
import { CategoryForCustomer, customerGetCategories } from './get-categories'

@ObjectType()
export class CustomerQueries  {

    @List() @Field({ type: CategoryForCustomer })
    public categories() {
        return customerGetCategories()
    }
}
