const webpack = require("webpack")

module.exports = {
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  stories: ["../src/**/*.story.tsx"],
  typescript: {
    // Disable docgeneration due to TypeScript 2.3.x incompatability.
    // TODO: Fix this once https://github.com/styleguidist/react-docgen-typescript/issues/356
    // is addressed
    reactDocgen: "none",
  },
  webpackFinal: async config => {
    config.stats = "errors-only"
    // TODO: This shouldn't be needed in storybook 7.
    // See: https://github.com/storybookjs/storybook/issues/15335#issuecomment-1172733138
    config.module.rules.push({
      test: /\.(m?js)$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    })
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      })
    )
    config.externals = {
      redis: "redis",
      request: "request",
      async_hooks: "async_hooks",
    }

    return config
  },
  core: {
    builder: "webpack5",
  },
}
