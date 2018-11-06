// @ts-check

// Grab the schema for reaction out of the node_modules
// to see if it is a subset of the production schema
const { readFileSync } = require("fs")
const {
  introspectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
  findBreakingChanges,
} = require("graphql")

const fetch = require("isomorphic-fetch")

const reactionSchema = readFileSync(
  "node_modules/@artsy/reaction/data/schema.graphql",
  "utf8"
)

const metaphysicsProd = "https://metaphysics-production.artsy.net/"

const downloadSchema = async endpoint => {
  const postBody = {
    query: introspectionQuery,
    operationName: "IntrospectionQuery",
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const { data } = await response.json()
  // commentDescriptions is hidden
  // @ts-ignore
  return printSchema(buildClientSchema(data), { commentDescriptions: true })
}

export const getBreakingChanges = async () => {
  const metaphyiscSchema = await downloadSchema(metaphysicsProd)
  return findBreakingChanges(
    buildSchema(metaphyiscSchema),
    buildSchema(reactionSchema)
  )
}
