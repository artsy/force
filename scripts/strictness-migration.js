// @ts-check

const glob = require("glob").sync
const fs = require("fs")
const _ = require("lodash")
const chalk = require("chalk").default
const { execSync } = require("child_process")

/**
 * @param {string | number | Buffer | import("url").URL} filePath
 */
function countIssuesInFile(filePath) {
  return (
    fs.readFileSync(filePath).toString().split("STRICT_NULL_CHECK").length - 1
  )
}

function countIssuesInWholeProject() {
  return glob("src/**/*.ts{x,}")
    .map(countIssuesInFile)
    .reduce((a, b) => a + b, 0)
}

switch (process.argv[2]) {
  case "count":
    if (process.argv.length === 3) {
      console.log(countIssuesInWholeProject().toString())
    } else {
      console.log(
        _.flatten(process.argv.slice(3).map(f => glob(f, { nodir: true })))
          .map(countIssuesInFile)
          .reduce((a, b) => a + b, 0)
          .toString()
      )
    }
    break
  case "check-pr":
    try {
      execSync("git merge origin/main", { stdio: "inherit" })
    } catch (e) {
      console.log(
        "Branch has conflicts with main, aborting strictness migration check"
      )
      process.exit(0)
    }
    const current = countIssuesInWholeProject()
    execSync("git checkout origin/main", { stdio: "inherit" })
    const onMain = countIssuesInWholeProject()
    if (current > onMain) {
      console.error(
        chalk.yellow.bold("WARNING:"),
        `The number of comments with the substring ${chalk.cyan(
          "STRICT_NULL_CHECK"
        )} has risen from ${chalk.green(onMain)} in ${chalk.bold(
          "main"
        )} to ${chalk.red(current)} in this PR.`
      )
      console.error(
        `These comments were added when we switched on TypeScript's strict mode, and their number should only ever go down.\n`
      )

      console.error(
        `It is safe to ignore this failure if you are in a hurry, but please consider refactoring to remove these tags.`
      )
      process.exit(1)
    } else if (current < onMain) {
      console.log(
        `Yay! Thanks for decreasing the number of strictness migration issues from ${chalk.bold(
          onMain
        )} to ${chalk.bold(current)} 🌟`
      )
    } else {
      console.log(
        `There's still ${chalk.bold(
          onMain
        )} strictness migration issues to fix.`
      )
    }
}
