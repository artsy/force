import path from "path"
import nodeExternals from "webpack-node-externals"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"
import { EarlyHintsPlugin } from "./rspack/plugins/EarlyHintsPlugin"

export default defineConfig({
  environments: {
    client: {
      tools: {
        htmlPlugin: false,
        rspack: {
          plugins: [new EarlyHintsPlugin()],
        },
      },
      output: {
        target: "web",
        manifest: true,
        externals: {
          async_hooks: "async_hooks", // Required because getAsyncStorage isn't using async import()
        },
      },
      source: {
        entry: {
          index: "./src/client.tsx",
        },
      },
    },

    server: {
      output: {
        target: "node",
        distPath: {
          root: "dist/server",
        },
      },
      source: {
        entry: {
          index: "./src/server",
        },
      },
      tools: {
        rspack: {
          externals: [nodeExternals()],
          node: {
            __dirname: true,
          },
        },
        swc: {
          module: {
            type: "commonjs",
          },
        },
      },
    },
  },

  /**
   * Shared config across environments
   */

  dev: {
    writeToDisk: true,
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  tools: {
    swc: {
      jsc: {
        experimental: {
          plugins: [
            [
              "@swc/plugin-styled-components",
              {
                ssr: true,
                displayName: true,
              },
            ],
            ["@swc/plugin-loadable-components", {}],
            [
              "@swc/plugin-relay",
              {
                // Must be fully-resolved absolute path
                rootDir: path.resolve(process.cwd(), "src"),
                artifactDirectory: "__generated__",
                language: "typescript",
              },
            ],
          ],
        },
      },
    },
  },
})
