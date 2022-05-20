import { SystemContextProvider } from "v2/System"
import { mount } from "enzyme"
import "jest-styled-components"
import { commitMutation } from "react-relay"
import { FollowButton } from "../Button"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "../FollowProfileButton"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import * as openAuthModal from "v2/Utils/openAuthModal"
import { AnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { ArtworkDetailsFixture } from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkDetails"

const openAuthToSatisfyIntent = jest.spyOn(
  openAuthModal,
  "openAuthToSatisfyIntent"
)
jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("FollowProfileButton", () => {
  let props
  let mediator
  const getWrapper = (passedProps = props, user = { id: "1234" }) => {
    return mount(
      <SystemContextProvider user={user} mediator={mediator}>
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: "54321",
            contextPageOwnerType: OwnerType.artwork,
            contextPageOwnerSlug: "andy-warhol-skull",
          }}
        >
          <FollowProfileButton {...passedProps} />
        </AnalyticsContext.Provider>
      </SystemContextProvider>
    )
  }

  beforeAll(() => {
    mediator = { ready: () => true, trigger: jest.fn() }
    props = {
      profile: { ...ArtworkDetailsFixture.partner.profile },
      relay: { environment: "" },
      tracking: { trackEvent: jest.fn() },
      contextModule: ContextModule.aboutTheWork,
    }
  })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper(props, {} as any)
      component.find(FollowButton).simulate("click")

      expect(openAuthToSatisfyIntent).toBeCalledWith(mediator, {
        contextModule: "aboutTheWork",
        entity: {
          name: "Salon 94",
          slug: "salon-94",
        },
        intent: "followPartner",
      })
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        afterSignUpAction: {
          action: "follow",
          kind: "profile",
          objectId: "salon-94",
        },
        contextModule: "aboutTheWork",
        copy: "Sign up to follow Salon 94",
        intent: "followPartner",
        mode: "signup",
        redirectTo: "http://localhost/",
      })
    })

    it("Follows partner if current user", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.profileID).toBe("54321")
      expect(mutation.unfollow).toBe(false)
    })

    it("Unfollows partner if current user", () => {
      props.profile.is_followed = true
      const component = getWrapper()
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.profileID).toBe("54321")
      expect(mutation.unfollow).toBe(true)
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "followedPartner",
        context_module: "aboutTheWork",
        context_owner_id: "54321",
        context_owner_slug: "andy-warhol-skull",
        context_owner_type: "artwork",
        owner_id: "54321",
        owner_slug: "salon-94",
        owner_type: "partner",
      })
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.profile.is_followed = true
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "unfollowedPartner",
        context_module: "aboutTheWork",
        context_owner_id: "54321",
        context_owner_slug: "andy-warhol-skull",
        context_owner_type: "artwork",
        owner_id: "54321",
        owner_slug: "salon-94",
        owner_type: "partner",
      })
    })
  })
})
