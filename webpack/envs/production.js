// @ts-check

import UglifyJsPlugin from "uglifyjs-webpack-plugin"

export const productionConfig = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          // TODO: Enable when we get sourcemaps running
          // mangle: true,
          compress: {
            warnings: false,
          },
        },
      }),
    ],
  },
}
