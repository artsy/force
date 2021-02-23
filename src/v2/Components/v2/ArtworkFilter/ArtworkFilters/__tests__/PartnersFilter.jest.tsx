import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"
import { PartnersFilter } from "../PartnersFilter"

describe("PartnersFilter", () => {
  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <PartnersFilter />
      </ArtworkFilterContextProvider>
    )
  }

  describe("partners", () => {
    it("renders partners", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            slice: "PARTNER",
            counts: [{ name: "Percy Z", count: 10, value: "percy-z" }],
          },
        ],
      })
      expect(wrapper.find("Checkbox").first().text()).toContain("Percy Z")
    })
  })
})
