import {
  injectHeadingIDs,
  injectHeadingIDsIntoBodies,
} from "../extractHeadings"

describe("injectHeadingIDs", () => {
  it("injects JUMP namespace IDs into H2 elements", () => {
    const body = "<h2>First Section</h2><p>Content</p><h2>Second Section</h2>"
    const outline = [
      { heading: "First Section", slug: "first-section" },
      { heading: "Second Section", slug: "second-section" },
    ]

    const result = injectHeadingIDs(body, outline)

    expect(result).toBe(
      '<h2 id="JUMP--first-section">First Section</h2>' +
        "<p>Content</p>" +
        '<h2 id="JUMP--second-section">Second Section</h2>',
    )
  })

  it("preserves existing attributes on H2 elements", () => {
    const body = '<h2 class="title">Heading</h2><h2>Other</h2>'
    const outline = [
      { heading: "Heading", slug: "heading" },
      { heading: "Other", slug: "other" },
    ]

    const result = injectHeadingIDs(body, outline)

    expect(result).toBe(
      '<h2 class="title" id="JUMP--heading">Heading</h2>' +
        '<h2 id="JUMP--other">Other</h2>',
    )
  })

  it("does not inject ID if H2 already has an id attribute", () => {
    const body = '<h2 id="existing">Heading</h2><h2>Other</h2><h2>Third</h2>'
    const outline = [
      { heading: "Heading", slug: "heading" },
      { heading: "Other", slug: "other" },
      { heading: "Third", slug: "third" },
    ]

    const result = injectHeadingIDs(body, outline)

    expect(result).toContain('id="existing"')
    expect(result).not.toContain('id="JUMP--heading"')
    expect(result).toContain('id="JUMP--other"')
  })

  it("does not inject ID if the existing id attribute uses different case or spacing", () => {
    const body = '<h2 ID = "existing">Heading</h2><h2>Other</h2>'
    const outline = [
      { heading: "Heading", slug: "heading" },
      { heading: "Other", slug: "other" },
    ]

    const result = injectHeadingIDs(body, outline)

    expect(result).toContain('ID = "existing"')
    expect(result).not.toContain('id="JUMP--heading"')
    expect(result).toContain('id="JUMP--other"')
  })

  it("returns body unchanged when outline is empty", () => {
    const body = "<h2>Heading</h2><p>Content</p>"
    const result = injectHeadingIDs(body, [])

    expect(result).toBe(body)
  })

  it("handles headings with inner HTML tags", () => {
    const body = '<h2><a href="/artist/foo">Artist Name</a></h2><h2>Plain</h2>'
    const outline = [
      { heading: "Artist Name", slug: "artist-name" },
      { heading: "Plain", slug: "plain" },
    ]

    const result = injectHeadingIDs(body, outline)

    expect(result).toBe(
      '<h2 id="JUMP--artist-name"><a href="/artist/foo">Artist Name</a></h2>' +
        '<h2 id="JUMP--plain">Plain</h2>',
    )
  })
})

describe("injectHeadingIDsIntoBodies", () => {
  it("injects IDs across multiple bodies using shared slug queues", () => {
    const bodies = [
      "<h2>First</h2><p>Content</p>",
      null,
      "<h2>Second</h2><p>More</p>",
    ]
    const outline = [
      { heading: "First", slug: "first" },
      { heading: "Second", slug: "second" },
    ]

    const result = injectHeadingIDsIntoBodies(bodies, outline)

    expect(result).toEqual([
      '<h2 id="JUMP--first">First</h2><p>Content</p>',
      null,
      '<h2 id="JUMP--second">Second</h2><p>More</p>',
    ])
  })

  it("handles duplicate heading text across bodies", () => {
    const bodies = ["<h2>Overview</h2>", "<h2>Overview</h2>"]
    const outline = [
      { heading: "Overview", slug: "overview" },
      { heading: "Overview", slug: "overview-1" },
    ]

    const result = injectHeadingIDsIntoBodies(bodies, outline)

    expect(result).toEqual([
      '<h2 id="JUMP--overview">Overview</h2>',
      '<h2 id="JUMP--overview-1">Overview</h2>',
    ])
  })
})
