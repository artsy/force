module.exports = {
  stories: ["../src/**/*.story.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

  webpackFinal: async config => {
    config.stats = "errors-only"
    config.externals = {
      redis: "redis",
      request: "request",
    }
    return config
  },
}
