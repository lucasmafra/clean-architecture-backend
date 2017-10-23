import { Field, Mutation, ObjectType, Query, Schema } from 'graphql-decorator'
import { AdminMutations, AdminQueries } from './admin'
import { CustomerMutations, CustomerQueries } from './customer'

@ObjectType()
export class RootQuery {

    @Field({ type: AdminQueries}) public adminQueries() {
        return true
    }
    @Field( { type: CustomerQueries}) public customerQueries() {
        return true
    }
    // @Field( { type: CompanyOwnerQueries}) public companyOwnerQueries() {
    //     return true
    // }
    // @Field( { type: StoreManagerQueries}) public storeManagerQueries() {
    //     return true
    // }
    // @Field( { type: PublicQueries}) public publicQueries() {
    //     return true
    // }
}

@ObjectType()
export class RootMutation {

    @Field({ type: AdminMutations}) public adminMutations() {
        return true
    }
    @Field( { type: CustomerMutations}) public customerMutations() {
        return true
    }
    // @Field( { type: CompanyOwnerMutations}) public companyOwnerMutations() {
    //     return true
    // }
    // @Field( { type: StoreManagerMutations}) public storeManagerMutations() {
    //     return true
    // }
    // @Field( { type: PublicMutations}) public publicMutations() {
    //     return true
    // }
}

@Schema()
export class MyTopShopSchema {
  @Query() public query: RootQuery
  @Mutation() public mutation: RootMutation
}
