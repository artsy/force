import {
  type RsbuildManifest,
  extractStyleLinkTags,
} from "System/Router/Utils/extractStyleLinkTags"

describe("extractStyleLinkTags", () => {
  it("returns one stylesheet link per initial CSS file, prefixed with the CDN", () => {
    const manifest: RsbuildManifest = {
      entries: {
        index: {
          initial: {
            js: ["/static/js/index.abc.js"],
            css: ["/static/css/index.abc.css", "/static/css/lib.def.css"],
          },
        },
      },
    }

    expect(extractStyleLinkTags({ manifest, cdnUrl: "https://cdn" })).toEqual(
      '<link rel="stylesheet" href="https://cdn/static/css/index.abc.css">' +
        '<link rel="stylesheet" href="https://cdn/static/css/lib.def.css">',
    )
  })

  it("uses relative URLs without a CDN", () => {
    const manifest: RsbuildManifest = {
      entries: {
        index: { initial: { css: ["/static/css/index.abc.css"] } },
      },
    }

    expect(extractStyleLinkTags({ manifest })).toEqual(
      '<link rel="stylesheet" href="/static/css/index.abc.css">',
    )
  })

  it("returns an empty string when the manifest has no CSS", () => {
    const manifest: RsbuildManifest = {
      entries: {
        index: { initial: { js: ["/static/js/index.abc.js"] } },
      },
    }

    expect(extractStyleLinkTags({ manifest, cdnUrl: "https://cdn" })).toEqual(
      "",
    )
  })

  it("returns an empty string when the manifest has no index entry", () => {
    expect(extractStyleLinkTags({ manifest: { entries: {} } })).toEqual("")
  })
})
