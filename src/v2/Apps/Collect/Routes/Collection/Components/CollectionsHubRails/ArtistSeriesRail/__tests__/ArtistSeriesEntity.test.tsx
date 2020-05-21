import { CollectionsHubLinkedCollections } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import {
  ArtistSeriesEntity,
  ArtworkImage,
  StyledLink,
} from "../ArtistSeriesEntity"

jest.mock("Artsy/Analytics/useTracking")
jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("ArtistSeriesEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      member: CollectionsHubLinkedCollections.linkedCollections[0].members[0],
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  it("showing the correct text, price guidance, amount of hits and image", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(component.text()).toMatch("Flags unique collections")
    expect(component.text()).toMatch("From $1,000")
    expect(component.find(ArtworkImage).length).toBe(3)
    expect(
      component
        .find(ArtworkImage)
        .at(0)
        .getElement().props.src
    ).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
  })

  it("uses small image width when there are more than 2 hits", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(component.find(ArtworkImage).length).toBe(3)
    expect(
      component
        .find(ArtworkImage)
        .at(0)
        .getElement().props.width
    ).toBe(72)
  })

  it("uses medium image width when there are only 2 hits", () => {
    props.member.artworksConnection.edges.pop()
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(component.find(ArtworkImage).length).toBe(2)
    expect(
      component
        .find(ArtworkImage)
        .at(0)
        .getElement().props.width
    ).toBe(109)
  })

  it("uses large image width when there is exactly 1 hit", () => {
    props.member.artworksConnection.edges.pop()
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(component.find(ArtworkImage).length).toBe(1)
    expect(
      component
        .find(ArtworkImage)
        .at(0)
        .getElement().props.width
    ).toBe(221)
  })

  it("uses the hit title for alt text if there is no artist", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(
      component
        .find(ArtworkImage)
        .at(0)
        .getElement().props.alt
    ).toMatch("A great flag from Jasper")
  })

  it("uses the artist name and title for alt text if there is an artist", () => {
    props.member.artworksConnection.edges[0].node.artist.name = "Jasper Johns"
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(
      component
        .find(ArtworkImage)
        .at(0)
        .getElement().props.alt
    ).toMatch("Jasper Johns, A great flag from Jasper")
  })

  it("if price_guidance is missing, NOT showing 'From $' ", () => {
    delete props.member.price_guidance
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(component.text()).not.toMatch("From $")
  })

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      const component = mount(<ArtistSeriesEntity {...props} itemNumber={0} />)

      component
        .find(StyledLink)
        .at(0)
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "ArtistCollectionsRail",
        context_page_owner_type: "Collection",
        type: "thumbnail",
        destination_path: "undefined/collection/Many-Flags",
        item_number: 0,
      })
    })
  })
})
