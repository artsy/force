import path from "path"
import { StorybookConfig } from "storybook-react-rsbuild"
import { mergeRsbuildConfig } from "@rsbuild/core"

const config: StorybookConfig = {
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  stories: ["../src/**/*.story.tsx"],
  typescript: {
    // Disable docgeneration due to TypeScript 2.3.x incompatability.
    // TODO: Fix this once https://github.com/styleguidist/react-docgen-typescript/issues/356
    // is addressed
    reactDocgen: false,
  },
  framework: {
    name: "storybook-react-rsbuild",
    options: {
      builder: {
        environment: "client",
      },
    },
  },

  rsbuildFinal: config => {
    return mergeRsbuildConfig(config, {
      tools: {
        swc: {
          jsc: {
            baseUrl: path.resolve(process.cwd(), "src"),
          },
        },
      },
    })
  },

  docs: {},
}

export default config
