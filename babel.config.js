module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: ["last 2 versions"],
        },
        useBuiltIns: "usage",
        corejs: 2,
      },
    ],
    "@babel/react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@loadable/babel-plugin",
    "@babel/plugin-syntax-dynamic-import",
    [
      "relay",
      {
        artifactDirectory: "./src/v2/__generated__",
      },
    ],
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
        displayName: true,
      },
    ],
    "inline-react-svg",
    "lodash",
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        root: ["./src"],
        alias: {
          storybook: "./src/v2/__stories__",
          v2: "./src/v2",
        },
      },
    ],
  ],
}
