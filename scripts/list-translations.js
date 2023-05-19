const { readFileSync } = require("fs")
const chalk = require("chalk")

const PATH_TO_TRANSLATIONS = "./src/System/i18n/locales/en-US/translation.json"

/**
 * Recursively descend into all leaf nodes of the translations object,
 * and return an array of [path, value] pairs.
 *
 * @param {Object} obj - The translations object or sub-object currently being traversed
 * @param {string} prefix  - The prefix to prepend to the current path, representing the path to the current object
 *
 * @return {string[][]} An array of [path, value] pairs
 *
 */
function getLeafNodes(obj, prefix = "") {
  let leafNodes = []
  for (let key in obj) {
    let path = prefix + key
    if (typeof obj[key] === "object") {
      leafNodes = leafNodes.concat(getLeafNodes(obj[key], path + "."))
    } else {
      leafNodes.push([path, obj[key]])
    }
  }
  return leafNodes
}

/**
 * Pretty print a resulting array of [path, value] pairs
 *
 * @param {string[][]} translations - leaf nodes of the translation config object, formatted as [path, value] pairs
 *
 */
function prettyPrint(translations) {
  translations.forEach(([path, value]) => {
    const prettyPath = chalk.blue(path)
    const separator = chalk.hex("#cccccc")("|")
    const prettyValue = chalk.bold(value.replace(/\n+/g, " "))

    console.log(`${prettyPath} ${separator} ${prettyValue}`)
  })
}

/* main */

// read the translations
const translationConfig = JSON.parse(readFileSync(PATH_TO_TRANSLATIONS, "utf8"))

// extract the leaf nodes
const translations = getLeafNodes(translationConfig)

// print the results
prettyPrint(translations)
