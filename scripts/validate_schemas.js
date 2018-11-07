// @ts-check

// Grab the schema for reaction out of the node_modules
// to see if it is a subset of the production schema
//
// Used both by Danger during the deploy PR, and also
// before the deployment on circle
//
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

const getBreakingChanges = async () => {
  const metaphyiscSchema = await downloadSchema(metaphysicsProd)
  return findBreakingChanges(
    buildSchema(metaphyiscSchema),
    buildSchema(reactionSchema)
  )
}

module.exports = {
  getBreakingChanges,
}

// @ts-ignore
if (require.main === module) {
  // When this is being called as a script via `node scripts/validate_schemas.js`
  getBreakingChanges().then(changes => {
    if (changes.length) {
      process.exitCode = 1
      console.error(
        "Failing due to breaking changes between Force and Metaphysics Production\n\n"
      )
      console.error(changes)
      console.error(
        "\n\nYou should deploy metaphysics production, and re-deploy force"
      )
    }
  })
}
