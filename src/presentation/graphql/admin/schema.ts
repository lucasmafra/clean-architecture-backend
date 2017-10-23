import { Arg, Field, List, ObjectType } from 'graphql-decorator'
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
}
