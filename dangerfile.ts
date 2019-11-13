import { warn, danger, markdown } from "danger"
import { getBreakingChanges } from "./scripts/validateSchemas"

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

  const isReleasePR = danger.github.pr.base.ref === "release"
  const versionToCheck = isReleasePR ? "production" : "staging"
  const changes: string[] = await getBreakingChanges(versionToCheck, 2)

  // There are breaking changes with the schema
  if (changes.length) {
    if (isReleasePR) {
      const deployURL = "https://github.com/artsy/metaphysics#deployment"
      fail(
        `You need to promote Metaphysics from staging to production. The schema used in Reaction, is further ahead than the version in Metaphyisc production. This could cause your queries to fail. You can see how to [deploy here](${deployURL}).`
      )
    } else {
      warn(
        "The staging version of Metaphysics has breaking changes, this might not affect your build, but could mean your queries don't work the way you expect. See below for breaking changes:"
      )
    }

    // Show a list of the changes
    markdown(changes.map(change => `- :warning: ${change}`).join("\n"))
  }
}
