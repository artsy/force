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
const metaphysicsProd = "https://metaphysics-production.artsy.net/"

const downloadProductionSchema = async endpoint => {
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

const downloadGitHubReaction = async release => {
  const response = await fetch(
    `https://github.com/artsy/reaction/raw/v${release}/data/schema.graphql`
  )

  const body = await response.text()
  return body
}

const getBreakingChanges = async () => {
  const packageJSON = JSON.parse(
    readFileSync(__dirname + "/../package.json", "utf8")
  )
  const reactionVersion = packageJSON["dependencies"]["@artsy/reaction"]
  const reactionSchema = await downloadGitHubReaction(reactionVersion)
  const metaphyicsSchema = await downloadProductionSchema(metaphysicsProd)
  return findBreakingChanges(
    buildSchema(metaphyicsSchema),
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
