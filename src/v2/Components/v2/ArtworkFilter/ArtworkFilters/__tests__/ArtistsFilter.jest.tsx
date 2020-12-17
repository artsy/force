import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { ArtistsFilter } from "../ArtistsFilter"

describe("ArtistsFilter", () => {
  let context

  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ArtistsFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const ArtistsFilterTest = () => {
    context = useArtworkFilterContext()
    return <ArtistsFilter />
  }

  describe("artists", () => {
    it("renders artists", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            counts: [{ count: 10, name: "Percy Z", value: "percy-z" }],
            slice: "ARTIST",
          },
        ],
        counts: { followedArtists: 0 },
      })
      expect(wrapper.find("Checkbox").last().text()).toContain("Percy Z")
    })

    describe("show more", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            counts: [
              { count: 10, name: "Percy A", value: "percy-a" },
              { count: 10, name: "Percy B", value: "percy-b" },
              { count: 10, name: "Percy C", value: "percy-c" },
              { count: 10, name: "Percy D", value: "percy-d" },
              { count: 10, name: "Percy E", value: "percy-e" },
              { count: 10, name: "Percy F", value: "percy-f" },
              { count: 10, name: "Percy G", value: "percy-g" },
            ],
            slice: "ARTIST",
          },
        ],
        counts: { followedArtists: 0 },
      })

      it("renders the first 6 and includes a show more expand link", () => {
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

  describe("followed artists", () => {
    it("updates includeArtworksByFollowedArtists on filter change", done => {
      const wrapper = getWrapper({
        aggregations: [{ counts: [{}], slice: "ARTIST" }],
        counts: { followedArtists: 5 },
      })
      wrapper.find("Checkbox").first().simulate("click")

      setTimeout(() => {
        expect(context.filters.includeArtworksByFollowedArtists).toEqual(true)
        done()
      }, 0)
    })

    it("is disabled if there are no results", () => {
      const wrapper = getWrapper({
        aggregations: [{ counts: [{}], slice: "ARTIST" }],
        counts: { followedArtists: 0 },
      })
      expect(wrapper.find("Checkbox").first().props().disabled).toBeTruthy()
    })
  })
})
