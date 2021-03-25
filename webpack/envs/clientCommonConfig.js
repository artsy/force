// @ts-check

export const clientChunks = {
  cacheGroups: {
    vendors: false,
    artsy: {
      chunks: "all",
      enforce: true,
      minChunks: 1,
      minSize: 0,
      name: "artsy",
      reuseExistingChunk: true,
      test: /.*node_modules[\\/](@artsy)[\\/]/,
    },
    "arsty-common": {
      chunks: "all",
      enforce: true,
      minChunks: 5,
      minSize: 0,
      name: "artsy-common",
      reuseExistingChunk: true,
      test: /.*src[\\/]/,
    },
    "common-react": {
      chunks: "all",
      enforce: true,
      minChunks: 1,
      minSize: 0,
      name: "common-react",
      reuseExistingChunk: true,
      test: /.*node_modules[\\/](react|react-dom)[\\/]/,
    },
    "common-utility": {
      chunks: "all",
      enforce: true,
      minChunks: 1,
      minSize: 0,
      name: "common-utility",
      reuseExistingChunk: true,
      test: /.*node_modules[\\/](lodash.*|luxon.*)[\\/]/,
    },
    commons: {
      chunks: "all",
      enforce: true,
      minChunks: 2,
      minSize: 0,
      name: "common",
      priority: 10,
      reuseExistingChunk: true,
      test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|luxon.*[\\/]|jquery.*[\\/]))/,
    },
  },
  maxInitialRequests: Infinity,
}
