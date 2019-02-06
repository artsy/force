import glob from "glob"
import chalk from "chalk"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { execSync } from "child_process"

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

function gzip() {
  execSync(`gzip -S .cgz $(find ${DEST} -name '*.css')`)
}

function fingerprint(file) {
  const contents = fs.readFileSync(file)
  const hash = crypto
    .createHash("sha1")
    .update(contents)
    .digest("hex")
    .slice(0, 21)

  const ext = ".css.cgz"
  const original = file.replace("public", "").replace(".cgz", "")
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

// Return a CSS mamifest as seed data to merge into Webpack manifest.json
function createManifest() {
  const manifest = glob.sync(`${DEST}/*.css.cgz`).reduce((acc, file) => {
    const { original, fingerprinted } = fingerprint(file)
    return {
      ...acc,
      [original]: `/assets/${fingerprinted}`,
    }
  }, {})
  return manifest
}

export function getCSSManifest() {
  try {
    clean()
    compile()
    gzip()
    const manifest = createManifest()
    console.log(chalk.green(`[compileCSS] Complete.`))
    return manifest
  } catch (error) {
    console.error(chalk.red("[compileCSS] Error:", error))
    process.exit(1)
  }
}
