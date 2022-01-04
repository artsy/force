import { createURL, searchStateToUrl, urlToSearchState } from "../url"

describe("createURL", () => {
  it("should correctly convert object to url string", () => {
    const state = {
      query: "abc",
      page: "2",
      items: ["1", "2"],
      user: {
        name: "name",
      },
    }

    expect(createURL(state)).toBe(
      "?query=abc&page=2&items%5B0%5D=1&items%5B1%5D=2&user%5Bname%5D=name"
    )
  })

  it("should skip empty values", () => {
    const state = {
      query: "abc",
      page: 2,
      name: undefined,
      age: undefined,
    }

    expect(createURL(state)).toBe("?query=abc&page=2")
  })
})

describe("urlToSearchState", () => {
  it("should correctly parse url into state object", () => {
    const search =
      "?query=abc&page=2&items%5B0%5D=1&items%5B1%5D=2&user%5Bname%5D=name"

    expect(urlToSearchState(search)).toEqual({
      query: "abc",
      page: "2",
      items: ["1", "2"],
      user: {
        name: "name",
      },
    })
  })
})

describe("searchStateToUrl", () => {
  it("should skip denied keys", () => {
    const state = {
      query: "abc",
      page: 2,
      configure: {
        itemsPerPage: 10,
      },
    }

    expect(searchStateToUrl(state)).toBe("?query=abc&page=2")
  })
})
