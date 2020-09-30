import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { FollowedArtistsFilter } from "../FollowedArtistsFilter"

describe("FollowedArtistsFilter", () => {
  let context

  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <FollowedArtistsFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const FollowedArtistsFilterTest = () => {
    context = useArtworkFilterContext()
    return <FollowedArtistsFilter />
  }

  it("updates context on filter change", done => {
    const wrapper = getWrapper({ counts: { followedArtists: 5 } })
    wrapper.find("Checkbox").simulate("click")

    setTimeout(() => {
      expect(context.filters.includeArtworksByFollowedArtists).toEqual(true)
      done()
    }, 0)
  })

  it("is disabled if there are no results", () => {
    const wrapper = getWrapper({ counts: { followedArtists: 0 } })
    expect(wrapper.find("Checkbox").props().disabled).toBeTruthy()
  })
})
