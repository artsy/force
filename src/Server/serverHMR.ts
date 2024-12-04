import { Express } from "express"
import chokidar from "chokidar"
import path from "path"

// The directory containing compiled server files
const DIST_DIR = path.join(process.cwd(), "dist", "server")

// The source directory to match for cache purging
const SRC_DIR = path.join(process.cwd(), "src")

export const serverHMR = (app: Express, server) => {
  // Middleware to handle hot-swappable routes
  let currentAppHandler = require(path.join(DIST_DIR))

  // Setup the initial handler
  app.use((req, res, next) => currentAppHandler(req, res, next))

  // Function to clear all `require.cache` entries referencing the `src` folder
  function clearRequireCacheForSrc() {
    Object.keys(require.cache).forEach(modulePath => {
      if (modulePath.startsWith(SRC_DIR)) {
        delete require.cache[modulePath]
      }
    })
    console.log("Cleared require cache for src files.")
  }

  // Watch the `dist/server` folder for changes
  chokidar
    .watch(DIST_DIR, { ignoreInitial: true })
    .on("all", (event, filePath) => {
      console.log(`Detected ${event} in ${filePath}`)
      if (filePath.endsWith(".js")) {
        try {
          clearRequireCacheForSrc()

          // Reload the app handler
          const newAppHandler = require(path.join(DIST_DIR))

          // Replace the app handler dynamically
          currentAppHandler = newAppHandler
          console.log("Hot-swapped application handler.")
        } catch (error) {
          console.error("Error reloading app handler:", error)
        }
      }
    })
}
