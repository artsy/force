const { Page } = require("desktop/models/page")

describe("Page", () => {
  it("can sanitize text to html", () => {
    const page = new Page({ content: "This is my content" })
    expect(page.sanitizedHtml("content")).toContain("<p>This is my content</p>")
  })

  it("removes unsupported tags", () => {
    const page = new Page({ content: "This is my <script>content</script>" })
    expect(page.sanitizedHtml("content")).toContain("<p>This is my </p>")
  })

  it("keeps supported html tags", () => {
    const page = new Page({
      content: "## This is my <summary>content</summary>",
    })

    const sanitizedPage = page.sanitizedHtml("content")
    expect(sanitizedPage).toContain("<summary>content</summary>")
    expect(sanitizedPage).toContain("<h2")
  })
})
