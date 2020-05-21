import { CollectionHubFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { ArrowButton } from "v2/Components/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { OtherCollectionsRail } from "../index"

jest.mock("Artsy/Analytics/useTracking")
jest.mock("found", () => ({
  Link: props => <div>{props.children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("CollectionsRail", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[0],
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
    const component = mount(<OtherCollectionsRail {...props} />)

    expect(component.text()).toMatch("Other Collections")
    expect(component.text()).toMatch("Artist Posters")
    expect(component.text()).toMatch("Artist Skateboard Decks")
    expect(component.text()).toMatch("KAWS: Bearbricks")
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

      const component = mount(<OtherCollectionsRail {...props} />)

      component
        .find(ArrowButton)
        .at(1)
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "OtherCollectionsRail",
        context_page_owner_type: "Collection",
        type: "Button",
        subject: "clicked next button",
      })
    })
  })
})
