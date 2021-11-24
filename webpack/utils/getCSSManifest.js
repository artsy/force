// @ts-check

import chalk from "chalk"
import glob from "glob"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { execSync } from "child_process"
import { legacySharedConfig } from "../envs/legacySharedConfig"
import { env } from "./env"
import { log } from "./log"

// Ouput
const DEST = "public/assets"

// Tasks
function clean() {
  glob.sync(`${DEST}/*.{css,css.cgz}`).forEach(file => fs.unlinkSync(file))
}

function compile() {
  log(chalk.green(`[Force compileCSS] Compiling...`))
  try {
    fs.mkdirSync(DEST, { recursive: true })
  } catch {
    // Create the output directory, ignore if already exists.
  }
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
    console.error("[Force compileCSS] Error renaming file:", error)
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
    const { publicPath } = legacySharedConfig().output
    return {
      ...acc,
      [original]: publicPath + fingerprinted,
    }
  }, {})
  return manifest
}

// Do to how the configuartions are exported css compilation is likely to
// execute multiple times. Cache the first results.
let cachedManifest = null

export function getCSSManifest() {
  try {
    if (env.buildServer) {
      return {}
    }
    if (cachedManifest) {
      log(chalk.green(`[Force compileCSS] Using Cache.`))
      return cachedManifest
    }
    clean()
    compile()
    cachedManifest = createManifest()
    log(chalk.green(`[Force compileCSS] Complete.`))
    return cachedManifest
  } catch (error) {
    console.error(chalk.red("[Force compileCSS] Error:", error))
    process.exit(1)
  }
}
