import path from "path"
import nodeExternals from "webpack-node-externals"
import LoadablePlugin from "@loadable/webpack-plugin"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginAssetsRetry } from "@rsbuild/plugin-assets-retry"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"
import { EarlyHintsPlugin } from "./rspack/plugins/EarlyHintsPlugin"
import { loadEnvs } from "@artsy/multienv"

loadEnvs(".env.shared", ".env")

export default defineConfig({
  environments: {
    client: {
      plugins: [pluginAssetsRetry()],
      source: {
        entry: {
          index: "./src/client.tsx",
        },
      },
      output: {
        target: "web",
        manifest: true,
        externals: {
          async_hooks: "async_hooks", // Required because getAsyncStorage isn't using async import()
        },
      },
      tools: {
        htmlPlugin: false,
        rspack: {
          plugins: [
            new EarlyHintsPlugin(),
            new LoadablePlugin({
              filename: "loadable-stats.json",
            }),
          ],
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
    progressBar: true,
    writeToDisk: true,
  },
  performance: {
    // TODO: Uncomment and play around with different bundle split strategies,
    // along with stats below:
    // chunkSplit: {
    //   strategy: "split-by-size",
    //   minSize: 30000,
    //   maxSize: 50000,
    // },
    ...(process.env.GENERATE_STATS_FILE
      ? {
          bundleAnalyze: {
            generateStatsFile: true,
          },
        }
      : {}),
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  tools: {
    swc: {
      jsc: {
        experimental: {
          plugins: [
            ["@swc/plugin-loadable-components", {}],
            [
              "@swc/plugin-styled-components",
              {
                ssr: true,
                displayName: true,
              },
            ],
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
