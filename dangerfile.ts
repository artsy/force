/* eslint-disable jest/no-jasmine-globals */
import { warn, danger, markdown } from "danger"
import * as fs from "fs"
import { getBreakingChanges } from "./scripts/validateSchemas"

/**
 * Helpers
 */
const filesOnly = (file: string) =>
  fs.existsSync(file) && fs.lstatSync(file).isFile()

// Modified or Created can be treated the same a lot of the time
const getCreatedFiles = (createdFiles: string[]) =>
  createdFiles.filter(filesOnly)

function preventNewJSFilesFromBeingCreated() {
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

function preventDefaultQueryRenderImport() {
  const newQueryRendererImports = getCreatedFiles(
    danger.git.created_files
  ).filter(filename => {
    const content = fs.readFileSync(filename).toString()
    return content.includes("<QueryRenderer")
  })
  if (newQueryRendererImports.length > 0) {
    fail(`Please use <SystemQueryRenderer /> instead of <QueryRender />. This prevents double fetching during the server-side render pass. See: ${newQueryRendererImports
      .map(filename => `- \`${filename}\``)
      .join("\n")}
  }`)
  }
}

async function checkIfMetaphysicsSchemaIsInSync() {
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

;(async function () {
  preventNewJSFilesFromBeingCreated()
  preventDefaultQueryRenderImport()
  await checkIfMetaphysicsSchemaIsInSync()
})()
