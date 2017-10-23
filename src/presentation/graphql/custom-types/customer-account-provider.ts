import { CustomerAccountProvider } from 'core'
import { GraphQLEnumType } from 'graphql'

export const CustomerAccountProviderType = new GraphQLEnumType({
  name: 'CustomerAccountProvider',
  values: {
    Facebook: { value: CustomerAccountProvider.Facebook },
    Google: { value: CustomerAccountProvider.Google },
    Cognito: { value: CustomerAccountProvider.Cognito },
  },
})
