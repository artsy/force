// @ts-check

import UglifyJsPlugin from "uglifyjs-webpack-plugin"

export const productionConfig = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: "common",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "common",
          chunks: "initial",
          minChunks: 10,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
}
