import { Arg, Field, List, NonNull, ObjectType } from 'graphql-decorator'
import { adminCreateCategory, CreateCategoryInputForAdmin, CreateCategoryOutputForAdmin } from './create-category'
import { adminGetCompanyOwnerDetail, CompanyOwnerDetailForAdmin } from './get-company-owner-detail'
import { adminGetCompanyOwners, CompanyOwnerForAdmin } from './get-company-owners'

@ObjectType()
export class AdminQueries  {

    @List() @Field({ type: CompanyOwnerForAdmin })
    public companyOwners() {
        return adminGetCompanyOwners()
    }

    @Field({ type: CompanyOwnerDetailForAdmin })
    public companyOwner( @Arg({ name: 'id' }) id: string ) {
        return adminGetCompanyOwnerDetail(id)
    }

    @Field({ type: CreateCategoryOutputForAdmin })
    public createCategory( @Arg({ name: 'input' }) input: CreateCategoryInputForAdmin ) {
        return adminCreateCategory(input)
    }
}

@ObjectType()
export class AdminMutations  {

    @Field({ type: CreateCategoryOutputForAdmin })
    public createCategory( @NonNull() @Arg({ name: 'input' }) input: CreateCategoryInputForAdmin ) {
        return adminCreateCategory(input)
    }
}
