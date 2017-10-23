import { Arg, Field, List, NonNull, ObjectType } from 'graphql-decorator'
import { CategoryForCustomer, customerGetCategories } from './get-categories'
import { customerUpdateProfile, UpdateCustomerProfileInput, UpdateCustomerProfileOutput} from './update-customer'

@ObjectType()
export class CustomerQueries  {

    @List() @Field({ type: CategoryForCustomer })
    public categories() {
        return customerGetCategories()
    }
}

@ObjectType()
export class CustomerMutations  {

    @Field({ type: UpdateCustomerProfileOutput })
    public updateProfile( @NonNull() @Arg({name: 'input'}) input: UpdateCustomerProfileInput) {
        return customerUpdateProfile(input)
    }
}
