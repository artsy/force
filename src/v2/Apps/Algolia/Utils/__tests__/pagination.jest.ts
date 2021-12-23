import { createPageCursors } from "../pagination"

describe("createPageCursors", () => {
  it("creates the proper structure for a short list", () => {
    const pageCursors = createPageCursors(1, 4)

    // All pages contained in `around`
    expect(pageCursors).not.toHaveProperty("first")
    expect(pageCursors).not.toHaveProperty("last")
    const { around } = pageCursors
    expect(around.length).toBe(4)

    // We are on the first page, and there is no previous page info.
    expect(around[0].isCurrent).toBe(true)
    expect(pageCursors).not.toHaveProperty("previous")
  })

  it("creates the proper structure when near the beginning of a long list", () => {
    const pageCursors = createPageCursors(1, 8)

    // There shouldn't be a `first` as it is contained in `around`.
    expect(pageCursors).not.toHaveProperty("first")

    const { around } = pageCursors
    expect(around.length).toBe(4)

    // We are on the first page, and there is no previous page info.
    expect(around[0].isCurrent).toBe(true)
    expect(pageCursors).not.toHaveProperty("previous")
  })

  it("creates the proper structure when near the middle of a long list", () => {
    const pageCursors = createPageCursors(4, 8)

    const { around, previous } = pageCursors
    expect(around.length).toBe(3)

    // We are on the fourth page.
    expect(around[1].page).toBe(4)
    expect(around[1].isCurrent).toBe(true)
    expect(previous.page).toBe(3)
  })

  it("creates the proper structure when near the end of a long list", () => {
    const pageCursors = createPageCursors(7, 8)

    // There shouldn't be a `last` as it is contained in `around`.
    expect(pageCursors).not.toHaveProperty("last")

    const { around, previous } = pageCursors
    expect(around.length).toBe(4)

    // We are on the seventh page.
    expect(around[2].page).toBe(7)
    expect(around[2].isCurrent).toBe(true)
    expect(previous.page).toBe(6)
  })

  it("creates the proper structure for an empty collection", () => {
    const pageCursors = createPageCursors(7, 0)

    // There shouldn't be a `first` or `last` as it is contained in `around`.
    expect(pageCursors).not.toHaveProperty("last")
    expect(pageCursors).not.toHaveProperty("first")
    expect(pageCursors).not.toHaveProperty("previous")

    const { around } = pageCursors
    expect(around.length).toBe(1)

    // We are on the first page.
    expect(around[0].page).toBe(1)
    expect(around[0].isCurrent).toBe(true)
  })
})
