import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { ConfirmRegistrationModal } from "../ConfirmRegistrationModal"
import { act } from "react-dom/test-utils"
import { Button } from "@artsy/palette"

describe("Confirm Registration Modal", () => {
  beforeAll(() => {
    jest.spyOn(history, "replaceState")
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe("sanitizing the URL", () => {
    it.skip("removes /confirm-registration from the url", () => {
      document.title = "big time"
      window.location.pathname = "/auction/auction-one/confirm-registration"

      act(() =>
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        renderTestComponent({
          Component: ConfirmRegistrationModal,
          options: { renderMode: "mount" },
        })
      )

      expect(history.replaceState).toHaveBeenCalledWith(
        {},
        "big time",
        "/auction/auction-one"
      )
    })
  })

  describe("onClose", () => {
    it("calls the onClose prop when the modal is closed", () => {
      const mockOnClose = jest.fn()

      const { wrapper } = renderTestComponent({
        Component: ConfirmRegistrationModal,
        options: { renderMode: "mount" },
        props: { onClose: mockOnClose },
        data: {
          app: {
            me: {
              bidders: [
                {
                  qualified_for_bidding: true,
                },
              ],
            },
          },
        },
      })
      wrapper.find(Button).simulate("click")
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe("User is not registered for sale", () => {
    it("does not render the modal if there is no user", () => {
      const { wrapper } = renderTestComponent({
        Component: ConfirmRegistrationModal,
        options: { renderMode: "render" },
        data: {
          app: {
            me: null,
          },
        },
      })
      expect(wrapper.text().length).toBe(0)
    })
  })

  describe("User is registered for sale", () => {
    describe("User is qualified for bidding", () => {
      it("shows a qualified message", () => {
        const { wrapper } = renderTestComponent({
          Component: ConfirmRegistrationModal,
          options: { renderMode: "mount" },
          data: {
            app: {
              modalType: "ConfirmRegistration",
              me: {
                bidders: [
                  {
                    qualified_for_bidding: true,
                  },
                ],
              },
            },
          },
        })

        expect(wrapper.text()).toEqual(
          expect.stringContaining("Registration complete")
        )
      })
    })

    describe("User is not qualified for bidding", () => {
      it("shows a bid could not be placed message if the user was trying to bid + register", () => {
        const { wrapper } = renderTestComponent({
          Component: ConfirmRegistrationModal,
          props: { cantBid: true },
          options: { renderMode: "mount" },
          data: {
            app: {
              modalType: "ConfirmBidAndRegistration",

              me: {
                bidders: [
                  {
                    qualified_for_bidding: false,
                  },
                ],
              },
            },
          },
        })
        expect(wrapper.text()).toEqual(
          expect.stringContaining("We're sorry, your bid could not be placed.")
        )
      })

      it("shows a registration pending message if the user was trying to register", () => {
        const { wrapper } = renderTestComponent({
          Component: ConfirmRegistrationModal,
          options: { renderMode: "mount" },
          data: {
            app: {
              modalType: "ConfirmRegistration",
              me: {
                bidders: [
                  {
                    qualified_for_bidding: false,
                  },
                ],
                identityVerified: false,
              },
              sale: {
                requireIdentityVerification: false,
              },
            },
          },
        })

        expect(wrapper.text()).toContain("Registration pending")
        expect(wrapper.text()).toContain("Artsy is reviewing your registration")
      })

      it("shows a registration pending message if the sale requires IDV and the user is verified", () => {
        const { wrapper } = renderTestComponent({
          Component: ConfirmRegistrationModal,
          options: { renderMode: "mount" },
          data: {
            app: {
              modalType: "ConfirmRegistration",
              me: {
                bidders: [
                  {
                    qualified_for_bidding: false,
                  },
                ],
                identityVerified: true,
              },
              sale: {
                requireIdentityVerification: true,
              },
            },
          },
        })

        expect(wrapper.text()).toContain("Registration pending")
        expect(wrapper.text()).toContain("Artsy is reviewing your registration")
      })

      it("shows a registration pending message if the sale requires IDV and the user is not verified but has no startable IDV flow", () => {
        const { wrapper } = renderTestComponent({
          Component: ConfirmRegistrationModal,
          options: { renderMode: "mount" },
          data: {
            app: {
              modalType: "ConfirmRegistration",
              me: {
                bidders: [
                  {
                    qualified_for_bidding: false,
                  },
                ],
                identityVerified: false,
                pendingIdentityVerification: null,
              },
              sale: {
                requireIdentityVerification: true,
              },
            },
          },
        })

        expect(wrapper.text()).toContain("Registration pending")
        expect(wrapper.text()).toContain("Artsy is reviewing your registration")
      })

      it("shows an 'please verify identity' message if the sale requires IDV but the user, who is not verified, has an available IDV flow", () => {
        const { wrapper } = renderTestComponent({
          Component: ConfirmRegistrationModal,
          options: { renderMode: "mount" },
          data: {
            app: {
              modalType: "ConfirmRegistration",
              me: {
                bidders: [
                  {
                    qualified_for_bidding: false,
                  },
                ],
                identityVerified: false,
                pendingIdentityVerification: {
                  internalID: "whatever",
                },
              },
              auction: {
                requireIdentityVerification: true,
              },
            },
          },
        })

        expect(wrapper.text()).toContain("Registration pending")
        expect(wrapper.text()).toContain(
          "To complete your registration and start bidding, please click the Verify identity button or follow the link sent to your email."
        )
      })
    })
  })
})
