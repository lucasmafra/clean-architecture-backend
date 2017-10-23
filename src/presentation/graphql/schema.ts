import { Field, ObjectType, Query, Schema } from 'graphql-decorator'
import { AdminQueries } from './admin'
import { CustomerQueries } from './customer'

@ObjectType()
export class RootQuery {

    @Field({ type: AdminQueries}) public adminQueries() {
        return true
    }
    @Field( { type: CustomerQueries}) public customerQueries() {
        return true
    }
}

@Schema()
export class MyTopShopSchema {
  @Query() public query: RootQuery
//   @Mutation() public mutation: Mutations
}
