const rspack = require("@rspack/core")

/**
 * This plugin generates a JSON file with the list of entry chunk files to
 * be used by the server to send early hints to the client.
 */

class EarlyHintsPlugin {
  /**
   * @param {rspack.Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("EarlyHintPlugin", compilation => {
      compilation.hooks.processAssets.tap(
        {
          name: "EarlyHintPlugin",
          stage: rspack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        assets => {
          const publicPath = compilation.outputOptions.publicPath || ""

          /**
           * Collect entry chunk files (JavaScript files only)
           * @type {string[]}
           */
          const entryChunkFiles = Array.from(compilation.chunks)
            .filter(chunk => chunk.canBeInitial()) // Select only entry chunks
            .reduce(
              (acc, chunk) => {
                const jsFiles = Array.from(chunk.files)
                  .filter(file => file.endsWith(".js"))
                  .map(file => `${publicPath}${file}`)
                return acc.concat(jsFiles)
              },
              /** @type {string[]} */ []
            )

          // Output `early-hints.json` to webpack output/publicPath directory
          assets["early-hints.json"] = new rspack.sources.RawSource(
            JSON.stringify(entryChunkFiles),
            false
          )
        }
      )
    })
  }
}

module.exports = { EarlyHintsPlugin }
