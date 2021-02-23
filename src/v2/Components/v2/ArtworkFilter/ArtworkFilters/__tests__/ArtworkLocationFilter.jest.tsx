import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"
import { ArtworkLocationFilter } from "../ArtworkLocationFilter"

describe("ArtworkLocationFilter", () => {
  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ArtworkLocationFilter />
      </ArtworkFilterContextProvider>
    )
  }

  describe("locations", () => {
    it("renders locations", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            slice: "LOCATION_CITY",
            counts: [
              {
                name: "Cattown, Cat City, Nowhere USA",
                count: 10,
                value: "percy-z",
              },
            ],
          },
        ],
      })
      expect(wrapper.find("Checkbox").first().text()).toContain(
        "Cattown, Cat City, Nowhere USA"
      )
    })

    describe("show more", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            slice: "LOCATION_CITY",
            counts: [
              { name: "Percy A", count: 10, value: "percy-a" },
              { name: "Percy B", count: 9, value: "percy-b" },
              { name: "Percy C", count: 8, value: "percy-c" },
              { name: "Percy D", count: 7, value: "percy-d" },
              { name: "Percy E", count: 6, value: "percy-e" },
              { name: "Percy F", count: 5, value: "percy-f" },
              { name: "Percy G", count: 4, value: "percy-g" },
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
