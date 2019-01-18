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
}
