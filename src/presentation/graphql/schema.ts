import { GraphQLObjectType } from 'graphql'
import { GraphQLSchema } from 'graphql/type'
import { merge } from 'lodash'
import { AdminMutations, AdminQueries } from './admin'

const Query = merge(
  AdminQueries,
//   CompanyOwnerQueries,
//   CustomerQueries,
//   PublicQueries,
//   StoreManagerQueries,
) as GraphQLObjectType

const Mutation = merge(
  AdminMutations,
//   CompanyOwnerMutations,
//   CustomerMutations,
//   StoreManagerMutations,
//   PublicMutations,
) as GraphQLObjectType

Query.name = 'RootQuery'
Query.description = 'All MyTopShop queries'

Mutation.name = 'RootMutation'
Mutation.description = 'All MyTopShop mutations'

const MyTopShopSchema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

export { MyTopShopSchema }
