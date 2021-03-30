import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"
import { FacetFilter } from "../FacetFilter"

const RESULTS = [
  { name: "Acrylic", value: "acrylic", count: 42 },
  { name: "Brass", value: "brass", count: 42 },
  { name: "Bronze", value: "bronze", count: 42 },
  { name: "Canvas", value: "canvas", count: 42 },
  { name: "Drypoint", value: "drypoint", count: 42 },
  { name: "Enamel", value: "enamel", count: 42 },
  { name: "Foam", value: "foam", count: 42 },
  { name: "Glass", value: "glass", count: 42 },
]

describe("FacetFilter", () => {
  const getWrapper = (results = RESULTS) => {
    return mount(
      <ArtworkFilterContextProvider>
        <FacetFilter facetName="materialsTerms" results={results} />
      </ArtworkFilterContextProvider>
    )
  }

  it("renders correctly", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("input")).toHaveLength(1)
    expect(wrapper.text()).toEqual("Search")
  })

  it("responds to input by rendering the matched results", () => {
    const wrapper = getWrapper()

    wrapper.find("input").simulate("change", { target: { value: "b" } })

    expect(wrapper.text()).toContain("Brass")
    expect(wrapper.text()).toContain("Bronze")
    expect(wrapper.text()).not.toContain("Acrylic")
    expect(wrapper.text()).not.toContain("Canvas")
    expect(wrapper.text()).not.toContain("Drypoint")
    expect(wrapper.text()).not.toContain("Enamel")
    expect(wrapper.text()).not.toContain("Foam")
    expect(wrapper.text()).not.toContain("Glass")

    wrapper.find("input").simulate("change", { target: { value: "bro" } })

    expect(wrapper.text()).toContain("Bronze")
    expect(wrapper.text()).not.toContain("Brass")
    expect(wrapper.text()).not.toContain("Acrylic")
    expect(wrapper.text()).not.toContain("Canvas")
    expect(wrapper.text()).not.toContain("Drypoint")
    expect(wrapper.text()).not.toContain("Enamel")
    expect(wrapper.text()).not.toContain("Foam")
    expect(wrapper.text()).not.toContain("Glass")

    wrapper.find("input").simulate("change", { target: { value: "as" } })

    expect(wrapper.text()).toContain("Brass")
    expect(wrapper.text()).toContain("Canvas")
    expect(wrapper.text()).toContain("Glass")
    expect(wrapper.text()).not.toContain("Bronze")
    expect(wrapper.text()).not.toContain("Acrylic")
    expect(wrapper.text()).not.toContain("Drypoint")
    expect(wrapper.text()).not.toContain("Enamel")
    expect(wrapper.text()).not.toContain("Foam")

    // Clear input
    wrapper.find("button").simulate("click")

    expect(wrapper.text()).toEqual("Search")
  })

  it("displays a message when there are no results", () => {
    const wrapper = getWrapper()

    wrapper.find("input").simulate("change", { target: { value: "garbage" } })

    expect(wrapper.text()).toContain("No results.")
  })
})
