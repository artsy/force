import { type HTMLProps, buildHtmlTemplate } from "html"

const STYLE_LINK = '<link rel="stylesheet" href="/static/css/index.abc.css">'

const buildProps = (overrides: Partial<HTMLProps> = {}): HTMLProps => {
  return {
    cdnUrl: "",
    content: {
      body: "<div>app</div>",
      styleLinks: STYLE_LINK,
      style: '<style data-styled="active">.a{color:red}</style>',
    },
    disable: {
      analytics: true,
      segment: true,
      stripe: true,
      scripts: true,
      thirdParties: true,
    },
    env: "test",
    fontUrl: "https://fonts.example.com",
    icons: {
      appleTouchIcon: "/apple-touch-icon.png",
      favicon: "/favicon.ico",
      faviconSVG: "/favicon.svg",
    },
    imageCdnUrl: "https://images.example.com",
    manifest: {
      browserconfig: "/browserconfig.xml",
      openSearch: "/opensearch.xml",
      webmanifest: "/manifest.webmanifest",
    },
    theme: "light",
    ...overrides,
  }
}

describe("buildHtmlTemplate", () => {
  it("sets the palette theme attribute on <html>", () => {
    expect(buildHtmlTemplate(buildProps({ theme: "dark" }))).toContain(
      '<html lang="en" data-palette-theme="dark">',
    )
    expect(buildHtmlTemplate(buildProps({ theme: "light" }))).toContain(
      '<html lang="en" data-palette-theme="light">',
    )
  })

  it("places the style links in <head>, before styled-components styles and the app root", () => {
    const html = buildHtmlTemplate(buildProps())

    const linkIndex = html.indexOf(STYLE_LINK)

    expect(linkIndex).toBeGreaterThan(-1)
    expect(linkIndex).toBeLessThan(html.indexOf("</head>"))
    expect(linkIndex).toBeLessThan(html.indexOf("<style data-styled"))
    expect(linkIndex).toBeLessThan(html.indexOf('<div id="root">'))
  })
})
