import React from "react"
import { PriceDatabase } from "../PriceDatabase"
import { mount, ReactWrapper } from "enzyme"
import { HeadProvider } from "react-head"
import { PriceDatabaseArtistAutosuggest } from "../Components/PriceDatabaseArtistAutosuggest"
import { Button, MultiSelect } from "@artsy/palette"

jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return { router: { push: mockRouterPush } }
    }),
  }
})

const mockRouterPush = jest.fn()

describe("PriceDatabaseApp", () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    wrapper = mount(
      <HeadProvider>
        <PriceDatabase />
      </HeadProvider>
    )
  })

  it("renders correct components", () => {
    expect(wrapper.find("PriceDatabaseMeta").length).toBe(1)
    expect(wrapper.find("PriceDatabaseSearch").length).toBe(1)
    expect(wrapper.find("PriceDatabaseBenefits").length).toBe(1)
  })

  it("searches for artist's auction results without filters", () => {
    wrapper
      .find(PriceDatabaseArtistAutosuggest)
      .props()
      .onChange("gerhard-richter")
    wrapper.find(Button).simulate("click")

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/artist/gerhard-richter/auction-results"
    )
  })

  it("searches for artist's auction results with filters", () => {
    wrapper.find(PriceDatabaseArtistAutosuggest).props().onChange("banksy")

    const mediumFilter = wrapper.find(MultiSelect).at(0)
    mediumFilter.props().onSelect([{ value: "Painting", text: "Painting" }])

    const sizeFilter = wrapper.find(MultiSelect).at(1)
    sizeFilter.props().onSelect([
      { value: "SMALL", text: "SMALL" },
      { value: "MEDIUM", text: "MEDIUM" },
    ])

    const organizationFilter = wrapper.find(MultiSelect).at(2)
    organizationFilter
      .props()
      .onSelect([{ value: "Phillips", text: "Phillips" }])

    wrapper.find(Button).simulate("click")

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/artist/banksy/auction-results?organizations%5B0%5D=Phillips&categories%5B0%5D=Painting&sizes%5B0%5D=SMALL&sizes%5B1%5D=MEDIUM"
    )
  })
})
