import { FacetAutosuggest, orderedFacets } from "../FacetAutosuggest"
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

describe("orderedFacets", () => {
  it("returns the original list, but with selected items moved to the front", () => {
    const results = [
      {
        value: "cat1",
        name: "Cat 1",
        count: 10,
      },
      {
        value: "cat2",
        name: "Cat 2",
        count: 10,
      },
      {
        value: "cat3",
        name: "Cat 3",
        count: 10,
      },
      {
        value: "cat4",
        name: "Cat 4",
        count: 10,
      },
      {
        value: "cat5",
        name: "Cat 5",
        count: 10,
      },
    ]

    const selected = ["cat4", "cat5"]

    expect(orderedFacets(selected, results)).toEqual([
      {
        value: "cat4",
        name: "Cat 4",
        count: 10,
      },
      {
        value: "cat5",
        name: "Cat 5",
        count: 10,
      },
      {
        value: "cat1",
        name: "Cat 1",
        count: 10,
      },
      {
        value: "cat2",
        name: "Cat 2",
        count: 10,
      },
      {
        value: "cat3",
        name: "Cat 3",
        count: 10,
      },
    ])
  })
})
