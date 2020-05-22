import { SystemContextProvider } from "v2/Artsy"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { commitMutation } from "react-relay"
import { FollowButtonDeprecated } from "../ButtonDeprecated"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "../FollowArtistButton"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("FollowArtistButton", () => {
  const getWrapper = (props = {}, user = {}) => {
    return mount(
      <SystemContextProvider user={user}>
        <FollowArtistButton relay={{ environment: "" }} {...props} />
      </SystemContextProvider>
    )
  }

  Object.defineProperty(window, "location", {
    writable: true,
    value: { assign: jest.fn() },
  })

  let testProps
  beforeEach(() => {
    testProps = {
      artist: {
        internalID: "damon-zucconi",
        id: "1234",
        is_followed: false,
        counts: { follows: 99 },
      },
      onOpenAuthModal: jest.fn(),
      tracking: { trackEvent: jest.fn() },
    }
  })

  // FIXME: Reenable when React 16.4.5 is release
  // https://github.com/facebook/react/issues/13150#issuecomment-411134477

  // describe("snapshots", () => {
  //   it("Renders properly", () => {
  //     const component = renderer
  //       .create(
  //         <SystemContextProvider>
  //           <FollowArtistButton {...testProps} />
  //         </SystemContextProvider>
  //       )
  //       .toJSON()
  //     expect(component).toMatchSnapshot()
  //   })
  // })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper(testProps)
      component.find(FollowButtonDeprecated).simulate("click")

      expect(testProps.onOpenAuthModal).toBeCalledWith("signup", {
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
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.artistID).toBe("damon-zucconi")
      expect(mutation.unfollow).toBe(false)
    })

    it("Unfollows an artist if current user", () => {
      testProps.artist.is_followed = true
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.artistID).toBe("damon-zucconi")
      expect(mutation.unfollow).toBe(true)
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")

      expect(testProps.tracking.trackEvent.mock.calls[0][0].action).toBe(
        "Followed Artist"
      )
    })

    it("Tracks unfollow click when unfollowing", () => {
      testProps.artist.is_followed = true
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")

      expect(testProps.tracking.trackEvent.mock.calls[0][0].action).toBe(
        "Unfollowed Artist"
      )
    })

    it("Tracks with custom trackingData if provided", () => {
      testProps.trackingData = { contextModule: "tooltip" }
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")

      expect(testProps.tracking.trackEvent.mock.calls[0][0].contextModule).toBe(
        "tooltip"
      )
    })
  })
})
