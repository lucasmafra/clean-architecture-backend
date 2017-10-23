import { GraphQLScalarType } from 'graphql'

export const TimestampType = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Timestamp in seconds. Example: 08/02/1995 => 792201600',

  serialize: (input: any): any => { /* every argument 'input' for functions serialize, parseValue and parseLiteral functions has the properties 'kind', 'value' and 'loc'*/
    try {
      const date = new Date(input)
      return Math.floor(date.getTime() / 1000)
    } catch (err) {
        return err
    }
  },
  parseValue: (input: any): any => {
    try {
      const timestamp = Number.parseInt(input)
      const date = new Date(timestamp * 1000)
      return date
    } catch (err) {
        return err
    }
  },
  parseLiteral: (input: any): any => {
    try {
      const timestamp = Number.parseInt(input.value)
      const date = new Date(timestamp * 1000)
      return date
    } catch (err) {
        return err
    }
  },
})
