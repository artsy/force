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

    describe("show more", () => {
      const wrapper = getWrapper({
        counts: { followedArtists: 0 },
        aggregations: [
          {
            slice: "PARTNER",
            counts: [
              { name: "Percy A", count: 10, value: "percy-a" },
              { name: "Percy B", count: 10, value: "percy-b" },
              { name: "Percy C", count: 10, value: "percy-c" },
              { name: "Percy D", count: 10, value: "percy-d" },
              { name: "Percy E", count: 10, value: "percy-e" },
              { name: "Percy F", count: 10, value: "percy-f" },
              { name: "Percy G", count: 10, value: "percy-g" },
            ],
          },
        ],
      })

      it("renders the first 6 and includes a show more expand link", () => {
        expect(wrapper.text()).toContain("Percy A")
        expect(wrapper.text()).toContain("Percy B")
        expect(wrapper.text()).toContain("Percy C")
        expect(wrapper.text()).toContain("Percy D")
        expect(wrapper.text()).toContain("Percy E")
        expect(wrapper.text()).toContain("Percy F")
        expect(wrapper.text()).toContain("Show 1 more")
        expect(wrapper.text()).not.toContain("Percy G")
      })

      it("reveals the rest of the list when 'Show more' is clicked, and can then hide the list again", done => {
        wrapper
          .findWhere(t => t.text() === "Show 1 more")
          .first()
          .simulate("click")

        setTimeout(() => {
          expect(wrapper.text()).toContain("Percy G")
          expect(wrapper.text()).toContain("Hide list")
          wrapper
            .findWhere(t => t.text() === "Hide list")
            .first()
            .simulate("click")

          setTimeout(() => {
            expect(wrapper.text()).toContain("Show 1 more")
            expect(wrapper.text()).not.toContain("Percy G")
            done()
          }, 0)
        }, 0)
      })
    })
  })
})
