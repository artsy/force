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
    config.externals = {
      redis: "redis",
      request: "request",
      async_hooks: "async_hooks",
    }
    return config
  },
}
