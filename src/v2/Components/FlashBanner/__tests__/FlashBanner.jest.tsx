import "jest-styled-components"
import {
  FlashBanner,
  FlashBannerQueryRenderer,
} from "v2/Components/FlashBanner"
import { graphql } from "react-relay"
import { Banner } from "@artsy/palette"
import { flushPromiseQueue, renderRelayTree } from "v2/DevTools"
import { mount } from "enzyme"
import { useTracking } from "v2/System/Analytics/useTracking"
import { SystemContextProvider } from "v2/System/SystemContext"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

jest.mock("v2/System/Analytics/useTracking")
jest.unmock("react-relay")
const trackEvent = jest.fn()

const { location: originalLocation } = window

const getRelayWrapper = async ({
  data,
  mutationResults = {},
  queryString: search = "",
  props: passedProps = {},
}) => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  delete window.location
  window.location = { search } as any

  const wrapper = await renderRelayTree({
    Component: props => {
      return <FlashBanner {...props} {...passedProps} />
    },
    query: graphql`
      query FlashBannerTestQuery @raw_response_type @relay_test_operation {
        me {
          canRequestEmailConfirmation
        }
      }
    `,
    variables: {},
    mockData: data,
    mockMutationResults: mutationResults,
  })
  return {
    wrapper,
  }
}

afterEach(() => {
  window.location = originalLocation
})

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => {
    return { trackEvent }
  })
})

describe("FlashBanner", () => {
  it("renders nothing if no banner applies", () => {
    const wrapper = mount(<FlashBanner />)

    expect(wrapper.find(Banner).exists()).toBeFalsy()
  })

  it("renders based on a contentCode prop", () => {
    const wrapper = mount(<FlashBanner contentCode="already_confirmed" />)

    expect(wrapper.text()).toContain("You have already confirmed your email")
  })

  it("renders based on props.me.canRequestEmailConfirmation (from relay)", async () => {
    const { wrapper } = await getRelayWrapper({
      data: {
        me: { id: "woot", canRequestEmailConfirmation: true },
      },
    })

    expect(wrapper.text()).toContain("Please verify your email address")
  })

  it("renders based on a flash_message query param", () => {
    window.location = { search: "?flash_message=blank_token" } as any

    const wrapper = mount(<FlashBanner />)

    expect(wrapper.text()).toContain("An error has occurred.")
  })

  it("returns nothing for an unsupported content code", () => {
    const wrapper = mount(<FlashBanner contentCode="porntipsguzzardo" />)

    expect(wrapper.find(Banner).exists()).toBeFalsy()
  })

  it("contentCode takes precedence over query string and props.me", () => {
    window.location = { search: "?flash_message=expired_token" } as any

    const wrapper = mount(
      <FlashBanner
        contentCode="invalid_token"
        me={{
          canRequestEmailConfirmation: true,
        }}
      />
    )

    expect(wrapper.text()).toContain("An error has occurred.")
  })

  it("query string takes precedence over props.me", () => {
    window.location = { search: "?flash_message=expired_token" } as any

    const wrapper = mount(
      <FlashBanner
        me={{
          canRequestEmailConfirmation: true,
        }}
      />
    )

    expect(wrapper.text()).toContain("Link expired.")
  })
})

describe("Email confirmation link expired", () => {
  it("user is prompted to re-request email confirmation if they can", async () => {
    const { wrapper } = await getRelayWrapper({
      data: {
        me: { canRequestEmailConfirmation: true },
      },
      queryString: "?flash_message=expired_token",
    })

    expect(wrapper.text()).toContain("Link expired.Resend verification email")
  })

  it("user seeing banner can click to re-trigger email confirmation message", async () => {
    const { wrapper } = await getRelayWrapper({
      data: {
        me: { canRequestEmailConfirmation: true },
      },
      queryString: "?flash_message=expired_token",
      mutationResults: {
        sendConfirmationEmail: {
          confirmationOrError: {
            unconfirmedEmail: "ceo@blackwater.biz",
          },
        },
      },
    })

    expect(wrapper.text()).toContain("Link expired.")

    wrapper.find("button").first().simulate("click")
    await flushPromiseQueue()
    wrapper.update()

    expect(wrapper.text()).toContain(
      "An email has been sent to ceo@blackwater.biz"
    )
  })

  it("user click to re-trigger is tracked", async () => {
    const { wrapper } = await getRelayWrapper({
      data: {
        me: { canRequestEmailConfirmation: true },
      },
      queryString: "?flash_message=expired_token",
    })

    expect(wrapper.text()).toContain("Link expired.")

    wrapper.find("button").first().simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action_type: "Click",
      subject: "Email Confirmation Link Expired",
    })
  })

  it("user sees an error message if sendConfirmationEmail mutation fails", async () => {
    const { wrapper } = await getRelayWrapper({
      data: {
        me: { canRequestEmailConfirmation: true },
      },
      queryString: "?flash_message=expired_token",
      mutationResults: {
        sendConfirmationEmail: {
          confirmationOrError: {
            mutationError: {
              error: "BadError",
              message: "Something Bad",
            },
          },
        },
      },
    })

    expect(wrapper.text()).toContain("Link expired.")

    wrapper.find("button").first().simulate("click")
    await flushPromiseQueue()
    wrapper.update()

    expect(wrapper.text()).toContain("Something went wrong")
  })
})

describe("Email Confirmation CTA", () => {
  describe("user cannot request email confirmation", () => {
    it("user is not prompted to request email confirmation if no logged in user is present", async () => {
      const { wrapper } = await getRelayWrapper({ data: { me: null } })

      expect(wrapper.find(Banner).exists()).toBeFalsy()
    })

    it("user is not prompted to request email confirmation if !me.canRequestEmailConfirmation", async () => {
      const { wrapper } = await getRelayWrapper({
        data: {
          me: { id: "woot", canRequestEmailConfirmation: false },
        },
      })

      expect(wrapper.find(Banner).exists()).toBeFalsy()
    })
  })

  describe("user can request email confirmation (me?.canRequestEmailConfirmation=true)", () => {
    it("user is prompted to request email confirmation if they can", async () => {
      const { wrapper } = await getRelayWrapper({
        data: { me: { canRequestEmailConfirmation: true } },
      })

      expect(wrapper.text()).toContain("Please verify your email address")
    })

    it("user seeing banner can click to trigger email confirmation message", async () => {
      const { wrapper } = await getRelayWrapper({
        data: { me: { canRequestEmailConfirmation: true } },
        mutationResults: {
          sendConfirmationEmail: {
            confirmationOrError: {
              unconfirmedEmail: "ceo@blackwater.biz",
            },
          },
        },
      })

      expect(wrapper.text()).toContain("Please verify your email address")

      wrapper.find("button").first().simulate("click")
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain(
        "An email has been sent to ceo@blackwater.biz"
      )
    })

    it("user click on confirm email button is tracked", async () => {
      const { wrapper } = await getRelayWrapper({
        data: { me: { canRequestEmailConfirmation: true } },
        mutationResults: {
          sendConfirmationEmail: {
            confirmationOrError: {
              unconfirmedEmail: "ceo@blackwater.biz",
            },
          },
        },
      })

      expect(wrapper.text()).toContain("Please verify your email address")

      wrapper.find("button").first().simulate("click")

      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        subject: "Email Confirmation CTA",
      })
    })

    it("user sees an error message if sendConfirmationEmail mutation fails", async () => {
      const { wrapper } = await getRelayWrapper({
        data: { me: { canRequestEmailConfirmation: true } },
        mutationResults: {
          sendConfirmationEmail: {
            confirmationOrError: {
              mutationError: {
                error: "BadError",
                message: "Something Bad",
              },
            },
          },
        },
      })

      expect(wrapper.text()).toContain("Please verify your email address")

      wrapper.find("button").first().simulate("click")
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain("Something went wrong")
    })

    it("a flash_message indicating an error supercedes the confirmation prompt", async () => {
      const { wrapper } = await getRelayWrapper({
        data: {
          me: { canRequestEmailConfirmation: true },
        },
        queryString: "?flash_message=invalid_token",
      })

      expect(wrapper.text()).toContain("An error has occurred.")
    })

    it("does not request user-specific data from metaphysics if there is no user", () => {
      const wrapper = mount(
        <SystemContextProvider user={null}>
          <FlashBannerQueryRenderer />
        </SystemContextProvider>
      )
      expect(wrapper.find(SystemQueryRenderer).exists()).toBeFalsy()
    })

    it("does requests user-specific data from metaphysics if there is a user", () => {
      const wrapper = mount(
        <SystemContextProvider user={{ id: "someonespecial" }}>
          <FlashBannerQueryRenderer />
        </SystemContextProvider>
      )
      expect(wrapper.find(SystemQueryRenderer).prop("query")).not.toBeNull()
    })
  })
})
