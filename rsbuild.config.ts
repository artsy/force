import path from "path"
import nodeExternals from "webpack-node-externals"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"
import { EarlyHintsPlugin } from "./rspack/plugins/EarlyHintsPlugin"

require("@artsy/multienv").loadEnvs(".env.shared", ".env")

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
        // FIXME: Do not inject all env vars into the client! this is just for test
        define: {
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
          sd: JSON.stringify(process.env.NODE_ENV),
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
