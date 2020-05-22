import { ArtistCollectionEntity_collection } from "v2/__generated__/ArtistCollectionEntity_collection.graphql"
import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "v2/Artsy/Analytics"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { mount } from "enzyme"
import React from "react"
import { ArtistCollectionEntity, ArtworkImage } from "../ArtistCollectionEntity"
jest.unmock("react-tracking")

describe("ArtistCollectionEntity", () => {
  it("Renders expected fields", () => {
    const component = mount(<ArtistCollectionEntity {...props} />)

    expect(component.text()).not.toMatch("Jasper Johns:")
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
    const twoArtworkCollectionProps = {
      ...props,
      collection: {
        ...collection,
        artworksConnection: {
          edges: [
            props.collection.artworksConnection.edges[0],
            props.collection.artworksConnection.edges[1],
          ],
        },
      },
    }

    const component = mount(
      <ArtistCollectionEntity {...twoArtworkCollectionProps} />
    )
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(component.find(ArtworkImage).length).toBe(2)
    expect(artworkImage.width).toBe(130)
  })

  it("Returns correct number of images if a hit has no image url", () => {
    const noImageCollectionProps = {
      ...props,
      collection: {
        ...collection,
        artworksConnection: {
          edges: [
            {
              node: {
                ...props.collection.artworksConnection.edges[0].node,
                image: null,
              },
            },
            props.collection.artworksConnection.edges[1],
            props.collection.artworksConnection.edges[2],
          ],
        },
      },
    }

    const component = mount(
      <ArtistCollectionEntity {...noImageCollectionProps} />
    )
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(component.find(ArtworkImage).length).toBe(2)
    expect(artworkImage.width).toBe(130)
  })

  it("Renders a backup image if no artworks returned", () => {
    const noArtworksCollectionProps = {
      ...props,
      collection: {
        ...collection,
        artworksConnection: {
          edges: [],
        },
      },
    }
    const component = mount(
      <ArtistCollectionEntity {...noArtworksCollectionProps} />
    )
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
    const { Component, dispatch } = mockTracking(ArtistCollectionEntity)
    const component = mount(<Component {...props} />)
    component.find(RouterLink).simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      context_module: "CollectionsRail",
      context_page_owner_type: "Artist",
      destination_path: "undefined/collection/jasper-johns-flags",
      type: "thumbnail",
    })
  })
})

const collection: ArtistCollectionEntity_collection = {
  " $refType": null,
  ...CollectionsRailFixture[0],
}

const props = {
  collection,
  lazyLoad: false,
}
