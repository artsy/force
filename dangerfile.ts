import { warn, danger, peril } from "danger"
import { BreakingChange } from "graphql"

// tslint:disable-next-line:no-default-export
export default async () => {
  // Warn about creating new JS files
  const jsFiles = danger.git.created_files.filter(
    f => f.includes("src") && f.endsWith(".js")
  )
  if (jsFiles.length) {
    const files = danger.github.utils.fileLinks(jsFiles)
    warn(
      `Please don't include .js files, we want to be using TypeScript found: ${files}.`
    )
  }

  // Breaking change check for Metaphysics production when deploying
  // also locked against Peril having access to the file
  if (!peril && danger.github.pr.base.ref === "release") {
    const { getBreakingChanges } = require("./scripts/validate_schemas")
    const breakingChanges = await getBreakingChanges()
    const bc = breakingChanges
    const typesMissing = bc.filter(b => b.type === "TYPE_REMOVED")
    const fieldsMissing = bc.filter(b => b.type === "FIELD_REMOVED")
    const unionOptionsMissing = bc.filter(
      b => b.type === "TYPE_REMOVED_FROM_UNION"
    )
    const fieldChanged = bc.filter(b => b.type === "FIELD_CHANGED_KIND")

    const descriptions = {
      "Missing types": typesMissing,
      "Fields missing": fieldsMissing,
      "Fields changed": fieldChanged,
      "Union types-mismatch": unionOptionsMissing,
    }

    if (bc.length) {
      warn(
        `Metaphysics production does not have a compatible schema for force's GraphQL usage, please deploy metaphysics to production and re-run Travis CI.`
      )
    }

    Object.keys(descriptions).forEach(key => {
      const breakingChanges: BreakingChange[] = descriptions[key]
      if (breakingChanges.length) {
        const fields = breakingChanges.map(
          b => "`" + b.description.split(" ")[0] + "`"
        )
        warn(`${key}: ${danger.utils.sentence(fields)}`)
      }
    })
  }
}
