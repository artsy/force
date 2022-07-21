import { getArticlesColumns } from "../getArticlesColumns"

describe("getArticlesColumns", () => {
  it("divides articles into 2 columns", () => {
    const articles = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
    ]
    const columns = getArticlesColumns(articles)
    expect(columns).toEqual({
      leftColumn: [{ id: "1" }, { id: "3" }, { id: "5" }],
      rightColumn: [{ id: "2" }, { id: "4" }, { id: "6" }],
    })
  })
})
