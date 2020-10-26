import { cropped, resized } from "../resized"

describe("#cropped", () => {
  it("uses width, height, and quality", () => {
    const { src, srcSet } = cropped("https://media.artsy.net/img.jpg", {
      width: 100,
      height: 100,
      quality: 80,
    })

    expect(src).toContain("d7hftxdivxxvm")
    expect(src).toContain("&width=100&height=100&quality=80")
    expect(srcSet).toContain("1x, ")
    expect(srcSet).toContain("&width=100&height=100&quality=80")
    expect(srcSet).toContain("2x")
    expect(srcSet).toContain("&width=200&height=200&quality=80")
  })
})

describe("#resized", () => {
  it("resizeds to a width", () => {
    const { src, srcSet } = resized("https://media.artsy.net/img.jpg", {
      width: 100,
    })

    expect(src).toContain("d7hftxdivxxvm")
    expect(src).toContain("&width=100&quality=80")
    expect(src).toContain("resize_to=width")
    expect(srcSet).toContain("1x, ")
    expect(srcSet).toContain("&width=100&quality=80")
    expect(srcSet).toContain("2x")
    expect(srcSet).toContain("&width=200&quality=80")
  })

  it("resizeds to a height", () => {
    const { src, srcSet } = resized("https://media.artsy.net/img.jpg", {
      height: 100,
    })

    expect(src).toContain("d7hftxdivxxvm")
    expect(src).toContain("&height=100&quality=80")
    expect(src).toContain("resize_to=height")
    expect(srcSet).toContain("1x, ")
    expect(srcSet).toContain("&height=100&quality=80")
    expect(srcSet).toContain("2x")
    expect(srcSet).toContain("&height=200&quality=80")
  })
})
