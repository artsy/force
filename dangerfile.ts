import { warn, danger } from "danger"
import { getBreakingChanges } from "./scripts/validate_schemas"
import { BreakingChange } from "graphql"

// tslint:disable-next-line:no-default-export
export default async () => {
  // Warn about creating new JS files
  const jsFiles = danger.git.created_files.filter(f => f.endsWith(".js"))
  if (jsFiles.length) {
    const files = danger.github.utils.fileLinks(jsFiles)
    warn(
      `Please don't include .js files, we want to be using TypeScript found: ${files}.`
    )
  }

  // Breaking change check for Metaphysics production when deploying
  // if (danger.github.pr.base.ref === "release") {
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

  Object.keys(descriptions).forEach(key => {
    const breakingChanges: BreakingChange[] = descriptions[key]
    if (breakingChanges.length) {
      const fields = breakingChanges.map(b => b.description.split(" ")[0])
      fail(`${key}: ${danger.utils.sentence(fields)}`)
    }
  })
  // }
}
