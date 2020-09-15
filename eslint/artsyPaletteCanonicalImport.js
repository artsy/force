/**
 *
 * @fileoverview Rule to disallow importing from @artsy/palette directly.
 */

"use strict"

const fs = require("fs")
const path = require("path")
const util = require("util")
const debuglog = util.debuglog("artsy:eslint")

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const basePath = path.join(__dirname, "..")
const nodeModulesPath = path.join(basePath, "node_modules")
const palettePath = path.join(nodeModulesPath, "@artsy", "palette")

// The default config to use if @artsy/palette cannot be found in node_modules.
const CONFIG_NO_PALETTE_FOUND = {
  ImportDeclaration: function (node) {
    const isPaletteImport =
      node.source &&
      node.source.type === "Literal" &&
      node.source.value === "@artsy/palette"
    if (!isPaletteImport) {
      return
    }
    context.report({
      node,
      message: `Prefer canonical import form for ${node.source.raw}: "@artsy/palette/dist/[...]"`,
    })
  },
}

// Only parse @artsy/palette once.
let loaded = false

// Reverse map to locate the file an export orignated in.
const exportLookupMap = new Map()

module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    schema: [],
  },
  create: function (context) {
    // If we cannot find the @artsy/palette install location, default to the
    // non-autofixing rule.
    const paletteInstalled = fs.existsSync(palettePath)
    if (!paletteInstalled) {
      return CONFIG_NO_PALETTE_FOUND
    }

    // Parse @artsy/palette only once.
    if (!loaded) {
      const bundleInfo = loadPalettePackageJson()
      const paletteMain = path.join(palettePath, bundleInfo.main)
      const { leafModules, leafTypes } = locateLeafModules(paletteMain)

      for (const leafModule of leafModules) {
        findExports(leafModule)
      }

      for (const leafType of leafTypes) {
        findTypeExports(leafType)
      }

      loaded = true
    }

    return {
      ImportDeclaration: function (node) {
        // starts with @artsy/palette and doesn't match the expected path.
        const isPaletteImport =
          node.source &&
          node.source.type === "Literal" &&
          node.source.value === "@artsy/palette"
        if (!isPaletteImport) {
          return
        }

        // Match up named imports that come from the same file.
        const importsMap = new Map()
        for (const s of node.specifiers) {
          if (s.type === "ImportSpecifier") {
            const namedImport = s.local.name
            const modulePath = exportLookupMap.get(namedImport)

            if (!exportLookupMap.has(namedImport)) {
              // FIXME: Should the lint rule do anything is there is a
              // named import that we don't know about?
              debuglog(`Could not locate export ${namedImport}`)
            }

            if (!importsMap.has(modulePath)) {
              importsMap.set(modulePath, [])
            }
            importsMap.get(modulePath).push(namedImport)
          }
        }

        // Generate new import statements.
        const imports = []
        for (const key of importsMap.keys()) {
          const modulePath = key
          const nameImports = importsMap.get(key).join(", ")
          imports.push(`import { ${nameImports} } from "${modulePath}"`)
        }

        context.report({
          node,
          message: `Prefer canonical import form for ${node.source.raw}: ${imports[0]}`,
          fix: fixer => {
            return fixer.replaceText(node, imports.join("\n"))
          },
        })
      },
    }
  },
}

// Load the @artsy/palette bundle information.
function loadPalettePackageJson() {
  return require(path.join(palettePath, "package.json"))
}

// Load all the modules that contain the exports we want to validate.
function locateLeafModules(entryPoint) {
  const moduleDir = path.dirname(entryPoint)
  return locateLeafModulesRecursive(moduleDir)
}

function locateLeafModulesRecursive(moduleDir) {
  const entries = fs.readdirSync(moduleDir)

  let leafModules = []
  let leafTypes = []
  for (const entry of entries) {
    const entryPath = path.join(moduleDir, entry)
    const entryStat = fs.statSync(entryPath)

    if (entryStat.isDirectory()) {
      const results = locateLeafModulesRecursive(entryPath)
      leafModules = leafModules.concat(results.leafModules)
      leafTypes = leafTypes.concat(results.leafTypes)
    }

    // Ignore included files that do not pertain to browser development.
    if (
      entryStat.isFile() &&
      entry.endsWith(".js") &&
      !entry.endsWith(".ios.js") &&
      !entry.endsWith(".story.js") &&
      entry !== "index.js"
    ) {
      leafModules.push(entryPath)
    } else if (
      entryStat.isFile() &&
      entry.endsWith(".d.ts") &&
      !entry.endsWith(".ios.d.ts") &&
      !entry.endsWith(".story.d.ts") &&
      entry !== "index.d.ts"
    ) {
      leafTypes.push(entryPath)
    }
  }
  return {
    leafModules,
    leafTypes,
  }
}

// Locate named exports.
function findExports(modulePath) {
  const loadedModule = _interopRequireWildcard(require(modulePath))

  Object.keys(loadedModule).forEach(function (key) {
    if (key === "default" || key === "__esModule") {
      return
    }

    if (exportLookupMap.has(key)) {
      debuglog(
        "duplicate module found",
        modulePath,
        key,
        exportLookupMap.get(key)
      )
    } else {
      exportLookupMap.set(
        key,
        modulePath.replace(nodeModulesPath + "/", "").replace(/\.js$/, "")
      )
    }
  })
}

// Locate type only exports.
function findTypeExports(typePath) {
  const lines = fs.readFileSync(typePath, "utf-8")
  for (const line of lines.split("\n")) {
    if (line.startsWith("export declare type ")) {
      const key = line.split(" ")[3]
      if (exportLookupMap.has(key)) {
        debuglog(
          "duplicate type found",
          typePath,
          key,
          exportLookupMap.get(key)
        )
      } else {
        exportLookupMap.set(
          key,
          typePath.replace(nodeModulesPath + "/", "").replace(/\.d\.ts$/, "")
        )
      }
    } else if (line.startsWith("export interface ")) {
      const key = line.split(" ")[2]
      if (exportLookupMap.has(key)) {
        debuglog(
          "duplicate interface found",
          typePath,
          key,
          exportLookupMap.get(key)
        )
      } else {
        exportLookupMap.set(
          key,
          typePath.replace(nodeModulesPath + "/", "").replace(/\.d\.ts$/, "")
        )
      }
    }
  }
}

// Webpack interop
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    let newObj = {}
    if (obj != null) {
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          let desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {}
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc)
          } else {
            newObj[key] = obj[key]
          }
        }
      }
    }
    newObj.default = obj
    return newObj
  }
}
