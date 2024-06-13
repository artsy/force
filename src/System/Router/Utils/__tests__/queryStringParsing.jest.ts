import { queryStringParsing } from "System/Router/Utils/queryStringParsing"

interface ParsedQuery {
  acquireable: any
  page: any
}

describe(queryStringParsing, () => {
  it("coerces booleans from the strings 'true' and 'false'", () => {
    const parsedTrue: Partial<ParsedQuery> = queryStringParsing(
      "acquireable=true"
    )
    expect(parsedTrue.acquireable).toBe(true)

    const parsedFalse: Partial<ParsedQuery> = queryStringParsing(
      "acquireable=false"
    )
    expect(parsedFalse.acquireable).toBe(false)
  })

  it("coerces ints from strings", () => {
    const parsedPage: Partial<ParsedQuery> = queryStringParsing("page=4")
    expect(parsedPage.page).toBe(4)
  })

  it("passes through strings", () => {
    const parsedPage: Partial<ParsedQuery> = queryStringParsing("page=blah")
    expect(parsedPage.page).toBe("blah")
  })
})
