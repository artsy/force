import {
  createJumpHash,
  extractJumpTargetIDFromHash,
  injectHeadingIDs,
  injectHeadingIDsIntoBodies,
  stripEmptyParagraphs,
} from "../extractHeadings"

describe("injectHeadingIDs", () => {
  const articleSlug = "article-slug"

  it("injects JUMP namespace IDs into H2 elements", () => {
    const body = "<h2>First Section</h2><p>Content</p><h2>Second Section</h2>"
    const outline = [
      { heading: "First Section", slug: "first-section" },
      { heading: "Second Section", slug: "second-section" },
    ]

    const result = injectHeadingIDs(body, outline, articleSlug)

    expect(result).toBe(
      '<h2 id="JUMP--article-slug--first-section">First Section</h2>' +
        "<p>Content</p>" +
        '<h2 id="JUMP--article-slug--second-section">Second Section</h2>',
    )
  })

  it("preserves existing attributes on H2 elements", () => {
    const body = '<h2 class="title">Heading</h2><h2>Other</h2>'
    const outline = [
      { heading: "Heading", slug: "heading" },
      { heading: "Other", slug: "other" },
    ]

    const result = injectHeadingIDs(body, outline, articleSlug)

    expect(result).toBe(
      '<h2 class="title" id="JUMP--article-slug--heading">Heading</h2>' +
        '<h2 id="JUMP--article-slug--other">Other</h2>',
    )
  })

  it("does not inject ID if H2 already has an id attribute", () => {
    const body = '<h2 id="existing">Heading</h2><h2>Other</h2><h2>Third</h2>'
    const outline = [
      { heading: "Heading", slug: "heading" },
      { heading: "Other", slug: "other" },
      { heading: "Third", slug: "third" },
    ]

    const result = injectHeadingIDs(body, outline, articleSlug)

    expect(result).toContain('id="existing"')
    expect(result).not.toContain('id="JUMP--heading"')
    expect(result).toContain('id="JUMP--article-slug--other"')
  })

  it("does not inject ID if the existing id attribute uses different case or spacing", () => {
    const body = '<h2 ID = "existing">Heading</h2><h2>Other</h2>'
    const outline = [
      { heading: "Heading", slug: "heading" },
      { heading: "Other", slug: "other" },
    ]

    const result = injectHeadingIDs(body, outline, articleSlug)

    expect(result).toContain('ID = "existing"')
    expect(result).not.toContain('id="JUMP--heading"')
    expect(result).toContain('id="JUMP--article-slug--other"')
  })

  it("returns body unchanged when outline is empty", () => {
    const body = "<h2>Heading</h2><p>Content</p>"
    const result = injectHeadingIDs(body, [], articleSlug)

    expect(result).toBe(body)
  })

  it("handles headings with inner HTML tags", () => {
    const body = '<h2><a href="/artist/foo">Artist Name</a></h2><h2>Plain</h2>'
    const outline = [
      { heading: "Artist Name", slug: "artist-name" },
      { heading: "Plain", slug: "plain" },
    ]

    const result = injectHeadingIDs(body, outline, articleSlug)

    expect(result).toBe(
      '<h2 id="JUMP--article-slug--artist-name"><a href="/artist/foo">Artist Name</a></h2>' +
        '<h2 id="JUMP--article-slug--plain">Plain</h2>',
    )
  })
})

describe("injectHeadingIDsIntoBodies", () => {
  const articleSlug = "article-slug"

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

    const result = injectHeadingIDsIntoBodies(bodies, outline, articleSlug)

    expect(result).toEqual([
      '<h2 id="JUMP--article-slug--first">First</h2><p>Content</p>',
      null,
      '<h2 id="JUMP--article-slug--second">Second</h2><p>More</p>',
    ])
  })

  it("strips empty paragraphs from each body", () => {
    const bodies = [
      "<p>Intro</p><p><br></p>",
      "<p>&nbsp;</p><h2>Section</h2><p>Body</p><p> </p>",
    ]
    const outline = [{ heading: "Section", slug: "section" }]

    const result = injectHeadingIDsIntoBodies(bodies, outline, articleSlug)

    expect(result).toEqual([
      "<p>Intro</p>",
      '<h2 id="JUMP--article-slug--section">Section</h2><p>Body</p>',
    ])
  })

  it("handles duplicate heading text across bodies", () => {
    const bodies = ["<h2>Overview</h2>", "<h2>Overview</h2>"]
    const outline = [
      { heading: "Overview", slug: "overview" },
      { heading: "Overview", slug: "overview-1" },
    ]

    const result = injectHeadingIDsIntoBodies(bodies, outline, articleSlug)

    expect(result).toEqual([
      '<h2 id="JUMP--article-slug--overview">Overview</h2>',
      '<h2 id="JUMP--article-slug--overview-1">Overview</h2>',
    ])
  })
})

describe("stripEmptyParagraphs", () => {
  it.each([
    ["<p></p>", ""],
    ["<p> </p>", ""],
    ["<p>\n\t</p>", ""],
    ["<p><br></p>", ""],
    ["<p><br/></p>", ""],
    ["<p><br /></p>", ""],
    ["<p>&nbsp;</p>", ""],
    ["<p>&#160;</p>", ""],
    ['<p class="foo"><br></p>', ""],
  ])("removes empty paragraph %p", (input, expected) => {
    expect(stripEmptyParagraphs(input)).toBe(expected)
  })

  it("preserves paragraphs with text content", () => {
    expect(stripEmptyParagraphs("<p>Hello</p>")).toBe("<p>Hello</p>")
  })

  it("preserves paragraphs containing inline elements with text", () => {
    expect(stripEmptyParagraphs("<p>Hi<br>there</p>")).toBe(
      "<p>Hi<br>there</p>",
    )
  })

  it("only removes empty paragraphs, leaving surrounding markup intact", () => {
    expect(
      stripEmptyParagraphs("<p>One</p><p><br></p><p>Two</p><p>&nbsp;</p>"),
    ).toBe("<p>One</p><p>Two</p>")
  })
})

describe("extractJumpTargetIDFromHash", () => {
  it("extracts the target id without the JUMP namespace", () => {
    expect(
      extractJumpTargetIDFromHash(
        createJumpHash({
          articleSlug: "article-slug",
          slug: "first-section",
        }),
      ),
    ).toBe("article-slug--first-section")
  })

  it("returns null for non-jump hashes", () => {
    expect(extractJumpTargetIDFromHash("#not-a-jump-target")).toBeNull()
  })
})
