// @ts-check
import crypto from "crypto"

const FRAMEWORK_BUNDLES = ["react", "react-dom", "@sentry"]
const TOTAL_PAGES = 12

export const splitChunks = {
  automaticNameDelimiter: "-",
  chunks: "all",
  cacheGroups: {
    default: false,
    defaultVendors: false,
    "artsy-framework": {
      name: "artsy-framework",
      chunks: "all",
      test: /.*node_modules[\\/](@artsy)[\\/]/,
      priority: 40,
      enforce: true,
    },
    framework: {
      name: "framework",
      chunks: "all",
      // This regex ignores nested copies of framework libraries so they're
      // bundled with their issuer.
      test: new RegExp(
        `(?<!node_modules.*)[\\\\/]node_modules[\\\\/](${FRAMEWORK_BUNDLES.join(
          `|`
        )})[\\\\/]`
      ),
      priority: 50,
      // Don't let webpack eliminate this chunk (prevents this chunk from
      // becoming a part of the commons chunk)
      enforce: true,
    },
    lib: {
      // if a module is bigger than 160kb from node_modules we make a separate
      // chunk for it
      test(module) {
        return (
          module.size() > 160000 &&
          /node_modules[/\\]/.test(module.identifier())
        )
      },
      name(module) {
        const rawRequest =
          module.rawRequest && module.rawRequest.replace(/^@(\w+)[/\\]/, "$1-")
        if (rawRequest) return `${rawRequest}-lib`

        const identifier = module.identifier()
        const trimmedIdentifier = /(?:^|[/\\])node_modules[/\\](.*)/.exec(
          identifier
        )
        const processedIdentifier =
          trimmedIdentifier &&
          trimmedIdentifier[1].replace(/^@(\w+)[/\\]/, "$1-")

        return `${processedIdentifier || identifier}-lib`
      },
      priority: 30,
      minChunks: 1,
      reuseExistingChunk: true,
    },
    commons: {
      name: "commons",
      chunks: "all",
      minChunks: TOTAL_PAGES,
      priority: 20,
    },
    shared: {
      name(module, chunks) {
        const cryptoName = crypto
          .createHash("sha1")
          .update(
            chunks.reduce((acc, chunk) => {
              return acc + chunk.name
            }, "")
          )
          .digest("base64")
          .replace(/[\/=+]/g, "")

        return `shared-${cryptoName}`
      },
      priority: 10,
      minChunks: 2,
      reuseExistingChunk: true,
    },
  },
  maxInitialRequests: 20,
  maxSize: 307200, // 300kb
  minSize: 102400, // 100kb
}
