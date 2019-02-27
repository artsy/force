const chalk = require("chalk")

// @ts-check
const glob = require("glob")
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const { execSync } = require("child_process")
const { baseConfig } = require("../envs/baseConfig")

// Ouput
const DEST = "public/assets"

// Tasks
function clean() {
  glob.sync(`${DEST}/*.{css,css.cgz}`).forEach(file => fs.unlinkSync(file))
}

function compile() {
  console.log(chalk.green(`[compileCSS] Compiling...`))
  const files = glob.sync("src/{desktop,mobile}/assets/*.styl", {
    nodir: true,
  })
  execSync(`yarn stylus ${files.join(" ")} --compress -o ${DEST}`)
}

function fingerprint(file) {
  const contents = fs.readFileSync(file)
  const hash = crypto
    .createHash("sha1")
    .update(contents)
    .digest("hex")
    .slice(0, 21)
  const ext = ".css"
  const original = file.replace("public", "")
  const fingerprinted = path.basename(file, ext) + "." + hash + ext

  try {
    fs.renameSync(file, `${DEST}/${fingerprinted}`)
  } catch (error) {
    console.error("[compileCSS] Error renaming file:", error)
  }

  return {
    original,
    fingerprinted,
  }
}

// Return a CSS manifest as seed data to merge into Webpack manifest.json
function createManifest() {
  const manifest = glob.sync(`${DEST}/*.css`).reduce((acc, file) => {
    const { original, fingerprinted } = fingerprint(file)
    const { publicPath } = baseConfig.output
    return {
      ...acc,
      [original]: publicPath + fingerprinted,
    }
  }, {})
  return manifest
}

exports.getCSSManifest = () => {
  try {
    clean()
    compile()
    const manifest = createManifest()
    console.log(chalk.green(`[compileCSS] Complete.`))
    return manifest
  } catch (error) {
    console.error(chalk.red("[compileCSS] Error:", error))
    process.exit(1)
  }
}
