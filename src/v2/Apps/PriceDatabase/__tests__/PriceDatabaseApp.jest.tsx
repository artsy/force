import React from "react"
import { PriceDatabase } from "../PriceDatabase"
import { mount } from "enzyme"
import { HeadProvider } from "react-head"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

describe("PriceDatabaseApp", () => {
  it("renders correct components", () => {
    const wrapper = mount(
      <HeadProvider>
        <PriceDatabase />
      </HeadProvider>
    )
    expect(wrapper.find("PriceDatabaseMeta").length).toBe(1)
  })
})
