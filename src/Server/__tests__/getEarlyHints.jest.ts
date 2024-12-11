import fs from "fs"
import path from "path"
import { getEarlyHints } from "Server/getEarlyHints"

jest.mock("fs")
jest.mock("Server/config", () => ({ CDN_URL: "https://cdn.example.com" }))

const HINTS_PATH = path.join(process.cwd(), "dist", "early-hints.json")

describe("getEarlyHints", () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return link headers and preload tags with CDN URL in production", () => {
    process.env.NODE_ENV = "production"
    const mockChunkFiles = ["/chunk1.js", "/chunk2.js"]

    mockReadFileSync.mockReturnValueOnce(JSON.stringify(mockChunkFiles))

    const result = getEarlyHints("")

    expect(fs.readFileSync).toHaveBeenCalledWith(HINTS_PATH, "utf-8")
    expect(result.linkHeaders).toEqual([
      `<https://cdn.example.com/chunk1.js>; rel=preload; as=script`,
      `<https://cdn.example.com/chunk2.js>; rel=preload; as=script`,
    ])
    expect(result.linkPreloadTags).toEqual([
      `<link rel="preload" as="script" href="https://cdn.example.com/chunk1.js">`,
      `<link rel="preload" as="script" href="https://cdn.example.com/chunk2.js">`,
    ])
  })
})
