import { SystemContextProvider } from "v2/System"
import { mount } from "enzyme"
import "jest-styled-components"
import { commitMutation } from "react-relay"
import { FollowButton } from "../Button"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "../FollowArtistButton"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import * as openAuthModal from "v2/Utils/openAuthModal"
import { AnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { mockLocation } from "v2/DevTools/mockLocation"

const openAuthToSatisfyIntent = jest.spyOn(
  openAuthModal,
  "openAuthToSatisfyIntent"
)
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
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: "54321",
            contextPageOwnerType: OwnerType.artwork,
            contextPageOwnerSlug: "andy-warhol-skull",
          }}
        >
          <FollowArtistButton {...passedProps} />
        </AnalyticsContext.Provider>
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    mockLocation()
    mediator = { ready: () => true, trigger: jest.fn() }
    props = {
      artist: {
        internalID: "12345",
        slug: "damon-zucconi",
        name: "Damon Zucconi",
        is_followed: false,
        counts: { follows: 99 },
      },
      relay: { environment: "" },
      tracking: { trackEvent: jest.fn() },
      contextModule: ContextModule.artistsToFollowRail,
    }
  })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(openAuthToSatisfyIntent).toBeCalledWith(mediator, {
        contextModule: "artistsToFollowRail",
        entity: {
          counts: {
            follows: 99,
          },
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
        context_module: "artistsToFollowRail",
        context_owner_id: "54321",
        context_owner_slug: "andy-warhol-skull",
        context_owner_type: "artwork",
        owner_id: "12345",
        owner_slug: "damon-zucconi",
        owner_type: "artist",
      })
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.artist.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "unfollowedArtist",
        context_module: "artistsToFollowRail",
        context_owner_id: "54321",
        context_owner_slug: "andy-warhol-skull",
        context_owner_type: "artwork",
        owner_id: "12345",
        owner_slug: "damon-zucconi",
        owner_type: "artist",
      })
    })
  })
})
