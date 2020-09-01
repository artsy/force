import { SystemContextProvider } from "v2/Artsy"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { commitMutation } from "react-relay"
import { FollowButton } from "../Button"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "../FollowArtistButton"
import { ContextModule, OwnerType } from "@artsy/cohesion"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("FollowArtistButton", () => {
  let props
  const getWrapper = (passedProps = props, user = {}) => {
    return mount(
      <SystemContextProvider user={user}>
        <FollowArtistButton {...passedProps} />
      </SystemContextProvider>
    )
  }

  Object.defineProperty(window, "location", {
    writable: true,
    value: { assign: jest.fn() },
  })

  beforeEach(() => {
    props = {
      artist: {
        internalID: "damon-zucconi",
        id: "1234",
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
        contextOwnerType: OwnerType.home
      }
    }
  })

  // FIXME: Reenable when React 16.4.5 is release
  // https://github.com/facebook/react/issues/13150#issuecomment-411134477

  // describe("snapshots", () => {
  //   it("Renders properly", () => {
  //     const component = renderer
  //       .create(
  //         <SystemContextProvider>
  //           <FollowArtistButton {...props} />
  //         </SystemContextProvider>
  //       )
  //       .toJSON()
  //     expect(component).toMatchSnapshot()
  //   })
  // })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(props.onOpenAuthModal).toBeCalledWith("signup", {
        contextModule: "intextTooltip",
        copy: "Sign up to follow artists",
        intent: "followArtist",
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "damon-zucconi",
        },
      })
    })

    it("Follows an artist if current user", () => {
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.artistID).toBe("damon-zucconi")
      expect(mutation.unfollow).toBe(false)
    })

    it("Unfollows an artist if current user", () => {
      props.artist.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.artistID).toBe("damon-zucconi")
      expect(mutation.unfollow).toBe(true)
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].action).toBe(
        "Followed Artist"
      )
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.artist.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].action).toBe(
        "Unfollowed Artist"
      )
    })

    it("Tracks with custom trackingData if provided", () => {
      props.trackingData = { contextModule: "tooltip" }
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].contextModule).toBe(
        "tooltip"
      )
    })
  })
})
