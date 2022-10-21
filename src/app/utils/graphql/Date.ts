import { GraphQLScalarType } from 'graphql';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value: string) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.toISOString();
  },
})

export { dateScalar }