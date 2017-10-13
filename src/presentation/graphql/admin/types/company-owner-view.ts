import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

export const CompanyOwnerView = new GraphQLObjectType({
  name: 'CompanyOwnerView',
  fields: {
    id: {
      type: GraphQLID,
    },
    email: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    cpf: {
      type: GraphQLString,
    },
  },
})
