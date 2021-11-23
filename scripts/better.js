/**
 * A one off script used to help facilitate strict type checking migration
 *
 * See: https://just-be.dev/notes/Projects/Enabling+Strict+Type+Checking+in+Force
 */
const results = require("../.betterer.results")["strictNullCheck migration"]
const fs = require("fs")
const path = require("path")

const files = JSON.parse(results.value)

const JS_COMMENT =
  "// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION"
const JSX_COMMENT =
  "{/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}"

for (let [label, warnings] of Object.entries(files)) {
  let offset = 0
  const [file] = label.split(":")
  const filePath = path.join(process.cwd(), file)
  const content = fs.readFileSync(filePath, "utf-8").split("\n")
  const lines = Array.from(new Set(warnings.map(([l]) => l)))
  for (let lineNum of lines) {
    const pos = lineNum + offset++
    const prevLine = content[pos - 1].trim()
    if (prevLine.startsWith("<") && prevLine.endsWith(">")) {
      content.splice(pos, 0, JSX_COMMENT)
    } else {
      content.splice(pos, 0, JS_COMMENT)
    }
  }
  fs.writeFileSync(filePath, content.join("\n"))
}
