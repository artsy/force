import { crop, resize } from "Utils/resizer"

jest.mock("sharify", () => ({
  data: {
    GEMINI_CLOUDFRONT_URL: "d7hftxdivxxvm.cloudfront.net",
  },
}))

describe("resizer", () => {
  describe("#crop", () => {
    it("uses width, height, and quality", () => {
      const url = crop("https://media.artsy.net/img.jpg", {
        width: 100,
        height: 100,
        quality: 80,
      })
      expect(url).toMatch("d7hftxdivxxvm")
      expect(url).toMatch("width=100")
      expect(url).toMatch("height=100")
      expect(url).toMatch("quality=80")
    })
  })

  describe("#resize", () => {
    it("resizes to a width", () => {
      const url = resize("https://media.artsy.net/img.jpg", {
        width: 100,
      })
      expect(url).toMatch("d7hftxdivxxvm")
      expect(url).toMatch("width=100")
      expect(url).toMatch("quality=80")
      expect(url).toMatch("resize_to=width")
    })

    it("resizes to a height", () => {
      const url = resize("https://media.artsy.net/img.jpg", {
        height: 100,
      })
      expect(url).toMatch("d7hftxdivxxvm")
      expect(url).toMatch("height=100")
      expect(url).toMatch("quality=80")
      expect(url).toMatch("resize_to=height")
    })
  })
})
