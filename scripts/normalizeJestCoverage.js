const libCoverage = require("istanbul-lib-coverage")
const { createReporter } = require("istanbul-api")
const fs = require("fs")
const path = require("path")

const normalizeJestCoverage = result => {
  Object.entries(result).forEach(([k, v]) => {
    if (v.data) result[k] = v.data
  })

  return result
}

const map = libCoverage.createCoverageMap()
const jestCoverage = require("../.nyc_output/coverage-final.json")

map.merge(normalizeJestCoverage(jestCoverage))

const reporter = createReporter()
reporter.addAll(["json"])
reporter.write(map)

fs.copyFile(
  "./coverage/coverage-final.json",
  "./.nyc_output/coverage-final.json",
  error =>
    error &&
    console.error(
      chalk.red(`[codecov] Error merging mocha and jest coverage.\n`),
      error.stack,
      "\n"
    )
)
