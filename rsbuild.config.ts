import path from "path"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"

const basePath = process.cwd()

export default defineConfig({
  plugins: [pluginReact(), pluginNodePolyfill()],
  source: {
    entry: {
      client: "./src/client.tsx",
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
                artifactDirectory: "src/__generated__",
                language: "typescript",
              },
            ],
          ],
        },
      },
    },
  },
  output: {
    externals: {
      // Required because getAsyncStorage isn't using async import()
      async_hooks: "async_hooks",
    },
  },
})
