import { SystemContextProvider } from "v2/Artsy"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { commitMutation } from "react-relay"
import { FollowButton } from "../Button"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "../FollowArtistButton"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import * as openAuthModal from "v2/Utils/openAuthModal"
import renderer from "react-test-renderer"

const openAuthToFollowSave = jest.spyOn(openAuthModal, "openAuthToFollowSave")
jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("FollowArtistButton", () => {
  let props
  let mediator
  const getWrapper = (passedProps = props, user = {}) => {
    return mount(
      <SystemContextProvider user={user} mediator={mediator}>
        <FollowArtistButton {...passedProps} />
      </SystemContextProvider>
    )
  }

  Object.defineProperty(window, "location", {
    writable: true,
    value: { assign: jest.fn() },
  })

  beforeEach(() => {
    mediator = { trigger: jest.fn() }
    props = {
      artist: {
        internalID: "12345",
        id: "1234",
        slug: "damon-zucconi",
        name: "Damon Zucconi",
        is_followed: false,
        counts: { follows: 99 },
      },
      onOpenAuthModal: jest.fn(),
      relay: { environment: "" },
      tracking: { trackEvent: jest.fn() },
      trackingData: {
        ownerSlug: "damon-zucconi",
        ownerId: "1234",
        contextModule: ContextModule.artistsToFollowRail,
        contextOwnerType: OwnerType.home,
      },
    }
  })

  describe("snapshots", () => {
    it("Renders properly", () => {
      const component = renderer
        .create(
          <SystemContextProvider>
            <FollowArtistButton {...props} />
          </SystemContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(openAuthToFollowSave).toBeCalledWith(mediator, {
        contextModule: "artistsToFollowRail",
        entity: {
          counts: {
            follows: 99,
          },
          id: "1234",
          internalID: "12345",
          is_followed: false,
          name: "Damon Zucconi",
          slug: "damon-zucconi",
        },
        intent: "followArtist",
      })
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "damon-zucconi",
        },
        contextModule: "artistsToFollowRail",
        copy: "Sign up to follow Damon Zucconi",
        intent: "followArtist",
        mode: "signup",
      })
    })

    it("Follows an artist if current user", () => {
      const component = getWrapper(props, { id: "uid" })
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.artistID).toBe("12345")
      expect(mutation.unfollow).toBe(false)
    })

    it("Unfollows an artist if current user", () => {
      props.artist.is_followed = true
      const component = getWrapper(props, { id: "uid" })
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.artistID).toBe("12345")
      expect(mutation.unfollow).toBe(true)
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper(props, { id: "uid" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "followedArtist",
        contextModule: "artistsToFollowRail",
        contextOwnerType: "home",
        ownerId: "1234",
        ownerSlug: "damon-zucconi",
      })
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.artist.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "unfollowedArtist",
        contextModule: "artistsToFollowRail",
        contextOwnerType: "home",
        ownerId: "1234",
        ownerSlug: "damon-zucconi",
      })
    })
  })
})
