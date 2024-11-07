import fs from "fs"
import path from "path"
import { getImageEarlyHints } from "Server/earlyHints"
import { getScriptEarlyHints } from "Server/earlyHints"

jest.mock("fs")
jest.mock("Server/config", () => ({ CDN_URL: "https://cdn.example.com" }))

describe("getScriptEarlyHints", () => {
  const HINTS_PATH = path.join(
    process.cwd(),
    "public/assets",
    "early-hints.json"
  )

  const mockReadFileSync = fs.readFileSync as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return link headers and preload tags with CDN URL in production", () => {
    process.env.NODE_ENV = "production"
    const mockChunkFiles = ["/chunk1.js", "/chunk2.js"]

    mockReadFileSync.mockReturnValueOnce(JSON.stringify(mockChunkFiles))

    const result = getScriptEarlyHints()

    expect(fs.readFileSync).toHaveBeenCalledWith(HINTS_PATH, "utf-8")
    expect(result.scriptLinkHeaders).toEqual([
      `<https://cdn.example.com/chunk1.js>; rel=preload; as=script`,
      `<https://cdn.example.com/chunk2.js>; rel=preload; as=script`,
    ])
    expect(result.scriptLinkPreloadTags).toEqual([
      `<link rel="preload" as="script" href="https://cdn.example.com/chunk1.js">`,
      `<link rel="preload" as="script" href="https://cdn.example.com/chunk2.js">`,
    ])
  })

  it("should return link headers and preload tags without CDN URL in development", () => {
    process.env.NODE_ENV = "development"
    const mockChunkFiles = ["/chunk1.js", "/chunk2.js"]

    mockReadFileSync.mockReturnValueOnce(JSON.stringify(mockChunkFiles))

    const result = getScriptEarlyHints()

    expect(fs.readFileSync).toHaveBeenCalledWith(HINTS_PATH, "utf-8")
    expect(result.scriptLinkHeaders).toEqual([
      `</chunk1.js>; rel=preload; as=script`,
      `</chunk2.js>; rel=preload; as=script`,
    ])
    expect(result.scriptLinkPreloadTags).toEqual([
      `<link rel="preload" as="script" href="/chunk1.js">`,
      `<link rel="preload" as="script" href="/chunk2.js">`,
    ])
  })
})

describe("getImageEarlyHints", () => {
  it("should extract src attributes from img tags with fetchpriority attribute and format link headers and preload tags", () => {
    const html = `
      <html>
        <body>
          <img src="image1.jpg" fetchpriority="high">
          <img src="image2.jpg">
          <img src="image3.jpg" fetchpriority="low">
          <img fetchpriority="medium" src="image4.jpg">
        </body>
      </html>
    `
    const result = getImageEarlyHints(html)

    expect(result).toEqual({
      imageLinkHeaders: [
        "<image1.jpg>; rel=preload; as=image",
        "<image3.jpg>; rel=preload; as=image",
        "<image4.jpg>; rel=preload; as=image",
      ],
      imageLinkPreloadTags: [
        '<link rel="preload" as="image" href="image1.jpg">',
        '<link rel="preload" as="image" href="image3.jpg">',
        '<link rel="preload" as="image" href="image4.jpg">',
      ],
    })
  })

  it("should return empty arrays when no img tags with fetchpriority attribute exist", () => {
    const html = `
      <html>
        <body>
          <img src="image1.jpg">
          <img src="image2.jpg">
          <img src="image3.jpg">
        </body>
      </html>
    `
    const result = getImageEarlyHints(html)

    expect(result).toEqual({
      imageLinkHeaders: [],
      imageLinkPreloadTags: [],
    })
  })

  it("should return empty arrays when html tag is falsy", () => {
    const html = ``
    const result = getImageEarlyHints(html)

    expect(result).toEqual({
      imageLinkHeaders: [],
      imageLinkPreloadTags: [],
    })
  })

  it("should handle mixed attribute orders correctly", () => {
    const html = `
      <html>
        <body>
          <img fetchpriority="high" src="image1.jpg">
          <img alt="test image" src="image2.jpg" fetchpriority="low">
        </body>
      </html>
    `
    const result = getImageEarlyHints(html)

    expect(result).toEqual({
      imageLinkHeaders: [
        "<image1.jpg>; rel=preload; as=image",
        "<image2.jpg>; rel=preload; as=image",
      ],
      imageLinkPreloadTags: [
        '<link rel="preload" as="image" href="image1.jpg">',
        '<link rel="preload" as="image" href="image2.jpg">',
      ],
    })
  })

  it("should handle single quotes in attributes", () => {
    const html = `
      <html>
        <body>
          <img src='image1.jpg' fetchpriority='high'>
          <img src='image2.jpg'>
          <img fetchpriority='medium' src='image3.jpg'>
        </body>
      </html>
    `
    const result = getImageEarlyHints(html)

    expect(result).toEqual({
      imageLinkHeaders: [
        "<image1.jpg>; rel=preload; as=image",
        "<image3.jpg>; rel=preload; as=image",
      ],
      imageLinkPreloadTags: [
        '<link rel="preload" as="image" href="image1.jpg">',
        '<link rel="preload" as="image" href="image3.jpg">',
      ],
    })
  })

  it("should handle no img tags in the HTML string", () => {
    const html = `
      <html>
        <body>
          <p>No images here</p>
        </body>
      </html>
    `
    const result = getImageEarlyHints(html)

    expect(result).toEqual({
      imageLinkHeaders: [],
      imageLinkPreloadTags: [],
    })
  })
})
