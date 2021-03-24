import { FacetAutosuggest } from "../FacetAutosuggest"
import { ReactWrapper, mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"

const searchResults = [
  {
    value: "doggy-gallery",
    count: 12,
    name: "Doggy Gallery",
  },
  {
    value: "catty-gallery",
    count: 12,
    name: "Catty Gallery",
  },
]

const simulateTyping = (wrapper: ReactWrapper, text: string) => {
  const input = wrapper.find("input")
  input.simulate("focus")
  input.simulate("change", { target: { value: text } })
}

const getWrapper = suggestions => {
  return mount(
    <ArtworkFilterContextProvider>
      <FacetAutosuggest
        placeholder="Enter a gallery"
        facets={suggestions}
        facetName="partnerIDs"
        alwaysShow
      />
    </ArtworkFilterContextProvider>
  )
}

describe("SearchBar", () => {
  it("displays search results", () => {
    const component = getWrapper(searchResults)

    simulateTyping(component, "cat")

    expect(component.text()).toContain("Catty Gallery")
    expect(component.text()).not.toContain("Doggy Gallery")
  })

  it("displays empty state", () => {
    const component = getWrapper(searchResults)

    simulateTyping(component, "magic")

    expect(component.text()).toContain("No results.")
  })
})
