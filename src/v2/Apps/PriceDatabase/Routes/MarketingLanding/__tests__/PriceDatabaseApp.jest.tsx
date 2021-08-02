import React from "react"
import { MarketingLandingApp } from "../MarketingLandingApp"
import { mount } from "enzyme"
import { HeadProvider } from "react-head"

describe("MarketingLandingApp", () => {
  it("renders correct components", () => {
    const wrapper = mount(
      <HeadProvider>
        <MarketingLandingApp />
      </HeadProvider>
    )
    expect(wrapper.find("PriceDatabaseMeta").length).toBe(1)
  })
})
