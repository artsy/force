import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import {
  ArtworkImage,
  RelatedCollectionEntity,
  StyledLink,
} from "../RelatedCollectionEntity"
jest.unmock("react-tracking")

describe("RelatedCollectionEntity", () => {
  let props

  beforeEach(() => {
    props = {
      collection: CollectionsRailFixture[0],
    }
  })

  it("Renders expected fields", () => {
    const component = mount(<RelatedCollectionEntity {...props} />)

    expect(component.text()).toMatch("Jasper Johns:")
    expect(component.text()).toMatch("Flags")
    expect(component.text()).toMatch("From $1,000")
    expect(component.find(ArtworkImage).length).toBe(3)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(artworkImage.src).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
    expect(artworkImage.alt).toBe("Jasper Johns, Flag")
    expect(artworkImage.width).toBe(86)
  })

  it("Returns proper image size if 2 artworks returned", () => {
    props.collection.artworksConnection.edges.pop()
    const component = mount(<RelatedCollectionEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(component.find(ArtworkImage).length).toBe(2)
    expect(artworkImage.width).toBe(130)
  })

  it("Renders a backup image if no artworks returned", () => {
    props.collection.artworksConnection.edges = []
    const component = mount(<RelatedCollectionEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(component.find(ArtworkImage).length).toBe(1)
    expect(artworkImage.src).toBe(
      "http://files.artsy.net/images/jasperjohnsflag.png"
    )
    expect(artworkImage.width).toBe(262)
  })

  it("Tracks link clicks", () => {
    const { Component, dispatch } = mockTracking(RelatedCollectionEntity)
    const component = mount(<Component {...props} />)
    component.find(StyledLink).simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      context_module: "CollectionsRail",
      context_page_owner_type: "Collection",
      destination_path: "undefined/collection/jasper-johns-flags",
      type: "thumbnail",
    })
  })
})
