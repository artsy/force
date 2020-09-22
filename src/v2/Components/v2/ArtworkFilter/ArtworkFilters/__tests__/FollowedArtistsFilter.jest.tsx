import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { FollowedArtistsFilter } from "../FollowedArtistsFilter"

describe("FollowedArtistsFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <FollowedArtistsFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const FollowedArtistsFilterTest = () => {
    context = useArtworkFilterContext()
    return <FollowedArtistsFilter />
  }

  it("updates context on filter change", done => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").simulate("click")

    setTimeout(() => {
      expect(context.filters.includeArtworksByFollowedArtists).toEqual(true)
      done()
    }, 0)
  })
})
