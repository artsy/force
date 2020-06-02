import "jest-styled-components"
import React from "react"
import { FlashBanner } from "v2/Components/FlashBanner"
import { graphql } from "react-relay"
import { Banner } from "@artsy/palette"
import { flushPromiseQueue, renderRelayTree } from "v2/DevTools"
import { mount } from "enzyme"
import { mockTracking } from "v2/Artsy/Analytics"

jest.unmock("react-relay")
jest.unmock("react-tracking")

const { location: originalLocation } = window

const getRelayWrapper = async ({
  data,
  mutationResults = {},
  queryString: search = "",
  props: passedProps = {},
}) => {
  delete window.location
  window.location = { search } as any

  const { Component, dispatch } = mockTracking(FlashBanner)

  const wrapper = await renderRelayTree({
    Component: props => {
      return <Component {...props} {...passedProps} />
    },
    query: graphql`
      query FlashBannerTestQuery @raw_response_type {
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
    dispatch,
  }
}

afterEach(() => {
  window.location = originalLocation
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
    window.location = { search: "?flash_message=expired_token" } as any

    const wrapper = mount(<FlashBanner />)

    expect(wrapper.text()).toContain("Link expired. Resend verification email.")
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

    expect(wrapper.text()).toContain("Link expired. Resend verification email.")
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
        data: { me: { id: "woot", canRequestEmailConfirmation: true } },
      })

      expect(wrapper.text()).toContain("Please verify your email address")
    })

    it("user seeing banner can click to trigger email confirmation message", async () => {
      const { wrapper } = await getRelayWrapper({
        data: { me: { id: "woot", canRequestEmailConfirmation: true } },
        mutationResults: {
          sendConfirmationEmail: {
            confirmationOrError: {
              unconfirmedEmail: "ceo@blackwater.biz",
            },
          },
        },
      })

      expect(wrapper.text()).toContain("Please verify your email address")

      wrapper
        .find("button")
        .first()
        .prop("onClick")({} as any)
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain(
        "An email has been sent to ceo@blackwater.biz"
      )
    })

    it("user click on confirm email button is tracked", async () => {
      const { wrapper, dispatch } = await getRelayWrapper({
        data: { me: { id: "woot", canRequestEmailConfirmation: true } },
        mutationResults: {
          sendConfirmationEmail: {
            confirmationOrError: {
              unconfirmedEmail: "ceo@blackwater.biz",
            },
          },
        },
      })

      expect(wrapper.text()).toContain("Please verify your email address")

      wrapper
        .find("button")
        .first()
        .prop("onClick")({} as any)

      expect(dispatch).toHaveBeenCalledWith({
        action_type: "Click",
        subject: "Email Confirmation CTA",
      })
    })

    it("user sees an error message if sendConfirmationEmail mutation fails", async () => {
      const { wrapper } = await getRelayWrapper({
        data: { me: { id: "woot", canRequestEmailConfirmation: true } },
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

      wrapper
        .find("button")
        .first()
        .prop("onClick")({} as any)
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain("Something went wrong")
    })

    it("a flash_message indicating an error supercedes the confirmation prompt", async () => {
      const { wrapper } = await getRelayWrapper({
        data: {
          me: { id: "woot", canRequestEmailConfirmation: true },
        },
        queryString: "?flash_message=invalid_token",
      })

      expect(wrapper.text()).toContain("An error has occurred.")
    })

    it("user sees an error message to re-trigger verification if flash_message=expired_token", async () => {
      const { wrapper } = await getRelayWrapper({
        data: {
          me: { id: "woot", canRequestEmailConfirmation: true },
        },
        queryString: "?flash_message=expired_token",
      })

      expect(wrapper.text()).toContain("Link expired.")
    })
  })
})
