import { CollectionHubFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { ArrowButton } from "v2/Components/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import {
  FeaturedCollectionEntity,
  FeaturedCollectionsRails,
  FeaturedImage,
  StyledLink,
} from "../index"

jest.mock("Artsy/Analytics/useTracking")

jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("FeaturedCollectionsRails", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[1],
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  const memberData = () => {
    return {
      description:
        "<p>From SpongeBob SquarePants to Snoopy, many beloved childhood cartoons have made an impact on the history of art.</p>",
      price_guidance: 60,
      slug: "art-inspired-by-cartoons",
      thumbnail: "http://files.artsy.net/images/cartoons_thumbnail.png",
      title: "Art Inspired by Cartoons",
    }
  }

  it("Renders expected fields", () => {
    const component = mount(<FeaturedCollectionsRails {...props} />)

    expect(component.text()).toMatch("Featured Collections")
    expect(component.text()).toMatch("Art Inspired by Cartoons")
    expect(component.text()).toMatch("Street Art: Celebrity Portraits")
    expect(component.text()).toMatch("Street Art: Superheroes and Villains")
  })

  describe("Tracking", () => {
    it("Tracks arrow click", () => {
      props.collectionGroup.members = [
        memberData(),
        memberData(),
        memberData(),
        memberData(),
        memberData(),
      ]

      const component = mount(<FeaturedCollectionsRails {...props} />)

      component
        .find(ArrowButton)
        .at(1)
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "FeaturedCollectionsRail",
        context_page_owner_type: "Collection",
        type: "Button",
        subject: "clicked next button",
      })
    })
  })
})

describe("FeaturedCollectionEntity", () => {
  let props
  const trackEvent = jest.fn()

  const memberDataWithoutPriceGuidance = () => {
    return {
      description:
        "<p>From SpongeBob SquarePants to Snoopy, many beloved childhood cartoons have made an impact on the history of art.</p>",
      price_guidance: null,
      slug: "art-inspired-by-cartoons",
      thumbnail: "http://files.artsy.net/images/cartoons_thumbnail.png",
      title: "Art Inspired by Cartoons",
    }
  }

  beforeEach(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[1],
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  it("Renders expected fields for FeaturedCollectionEntity", () => {
    const component = mount(<FeaturedCollectionsRails {...props} />)
    const firstEntity = component.find(FeaturedCollectionEntity).at(0)

    expect(firstEntity.text()).toMatch("From SpongeBob SquarePants to Snoopy")
    expect(firstEntity.text()).toMatch("From $60")
    const featuredImage = component.find(FeaturedImage).at(0)
    expect(featuredImage.getElement().props.src).toContain(
      "cartoons_thumbnail.png&width=500&height=500&quality=80"
    )
  })

  it("Does not renders price guidance for FeaturedCollectionEntity when it is null", () => {
    props.collectionGroup.members = [memberDataWithoutPriceGuidance()]
    const component = mount(<FeaturedCollectionsRails {...props} />)
    const firstEntity = component.find(FeaturedCollectionEntity).at(0)

    expect(firstEntity.text()).not.toContain("From $")
  })

  it("Tracks collection entity click", () => {
    const { members } = props.collectionGroup
    const component = mount(
      <FeaturedCollectionEntity member={members[0]} itemNumber={0} />
    )
    component
      .find(StyledLink)
      .at(0)
      .simulate("click")

    expect(trackEvent).toBeCalledWith({
      action_type: "Click",
      context_page: "Collection",
      context_module: "FeaturedCollectionsRail",
      context_page_owner_type: "Collection",
      type: "thumbnail",
      destination_path: "undefined/collection/art-inspired-by-cartoons",
      item_number: 0,
    })
  })
})
