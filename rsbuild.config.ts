import path from "path"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"
import nodeExternals from "webpack-node-externals"

const basePath = path.resolve(process.cwd(), "src")

export default defineConfig({
  dev: {
    writeToDisk: true,
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  environments: {
    client: {
      output: {
        target: "web",
        manifest: true,
        externals: {
          async_hooks: "async_hooks", // Required because getAsyncStorage isn't using async import()
        },
      },
      source: {
        entry: {
          index: path.resolve(basePath, "client.tsx"),
        },
      },
      html: {
        template: path.resolve(basePath, "template.html"),
      },
    },

    server: {
      output: {
        target: "node",
      },
      performance: {
        chunkSplit: {
          strategy: "all-in-one",
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
      source: {
        entry: {
          server: path.resolve(basePath, "dev2.js"),
        },
      },
    },
  },

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
            [
              "@swc/plugin-relay",
              {
                rootDir: path.resolve(basePath),
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
