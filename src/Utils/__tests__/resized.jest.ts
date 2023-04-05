import { cropped, maxWidthByArea, resized } from "Utils/resized"

jest.mock("sharify", () => ({
  data: {
    GEMINI_CLOUDFRONT_URL: "d7hftxdivxxvm.cloudfront.net",
  },
}))

describe("#cropped", () => {
  it("uses width, height, and quality", () => {
    const { src, srcSet } = cropped("https://media.artsy.net/img.jpg", {
      width: 100,
      height: 100,
      quality: 80,
    })

    expect(src).toContain("d7hftxdivxxvm")
    expect(src).toContain("width=100")
    expect(src).toContain("height=100")
    expect(src).toContain("quality=80")
    expect(srcSet).toContain("1x, ")
    expect(srcSet).toContain("width=100")
    expect(srcSet).toContain("height=100")
    expect(srcSet).toContain("quality=80")
    expect(srcSet).toContain("2x")
    expect(srcSet).toContain("width=200")
    expect(srcSet).toContain("height=200")
    expect(srcSet).toContain("quality=80")
  })
})

describe("#resized", () => {
  it("resizeds to a width", () => {
    const { src, srcSet } = resized("https://media.artsy.net/img.jpg", {
      width: 100,
    })

    expect(src).toContain("d7hftxdivxxvm")
    expect(src).toContain("quality=80")
    expect(src).toContain("width=100")
    expect(src).toContain("resize_to=width")
    expect(srcSet).toContain("1x, ")
    expect(srcSet).toContain("width=100")
    expect(srcSet).toContain("quality=80")
    expect(srcSet).toContain("2x")
    expect(srcSet).toContain("width=200")
    expect(srcSet).toContain("quality=80")
  })

  it("resizeds to a height", () => {
    const { src, srcSet } = resized("https://media.artsy.net/img.jpg", {
      height: 100,
    })

    expect(src).toContain("d7hftxdivxxvm")
    expect(src).toContain("height=100")
    expect(src).toContain("quality=80")
    expect(src).toContain("resize_to=height")
    expect(srcSet).toContain("1x, ")
    expect(srcSet).toContain("height=100")
    expect(srcSet).toContain("quality=80")
    expect(srcSet).toContain("2x")
    expect(srcSet).toContain("height=200")
    expect(srcSet).toContain("quality=80")
  })
})

describe("maxWidthByArea", () => {
  it("sets a max width for a proportional box", () => {
    expect(
      maxWidthByArea({
        width: 100,
        height: 100,
        area: 10000,
      })
    ).toEqual(100)

    expect(
      maxWidthByArea({
        width: 200,
        height: 100,
        area: 10000,
      })
    ).toEqual(141)

    expect(
      maxWidthByArea({
        width: 100,
        height: 200,
        area: 10000,
      })
    ).toEqual(71)

    expect(
      maxWidthByArea({
        width: 10,
        height: 200,
        area: 10000,
      })
    ).toEqual(22)
  })
})
