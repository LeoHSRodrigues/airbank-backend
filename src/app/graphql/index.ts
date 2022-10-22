import { makeExecutableSchema } from '@graphql-tools/schema'

import { resolver } from "@/app/graphql/resolvers";
import { types } from "@/app/graphql/types";

export const schema = makeExecutableSchema({
    resolvers: resolver,
    typeDefs: types,
  });