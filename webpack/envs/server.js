import path from "path"
import webpack from "webpack"
import nodeExternals from "webpack-node-externals"
import { NODE_ENV, basePath } from "../../src/lib/environment"
import { baseConfig } from "./base"

export const serverConfig = {
  mode: NODE_ENV,
  devtool: "source-map",
  target: "node",
  externals: [nodeExternals()],
  node: {
    __dirname: true,
  },
  entry: path.join(basePath, "src/index.js"),
  output: {
    filename: "server.dist.js",
    path: path.resolve(basePath, "src"),
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.coffee$/,
        include: [path.resolve(basePath, "node_modules/artsy-ezel-components")],
        use: ["coffee-loader"],
      },
      {
        test: /(\.(js|ts)x?$)/,
        include: path.resolve(basePath, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [["@babel/plugin-transform-modules-commonjs"]],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".coffee"],
    modules: [path.resolve(basePath, "src"), "node_modules"],
  },
}
