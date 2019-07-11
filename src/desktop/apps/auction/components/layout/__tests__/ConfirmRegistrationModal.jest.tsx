import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { ConfirmRegistrationModal } from "../ConfirmRegistrationModal"
import { act } from "react-dom/test-utils"
describe("Confirm Registration Modal", () => {
  beforeAll(() => {
    jest.spyOn(history, "replaceState")
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe("sanitizing the URL", () => {
    xit("removes /confirm-registration from the url", () => {
      document.title = "big time"
      window.location.pathname = "/auction/auction-one/confirm-registration"

      act(() =>
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

  describe("User is not registered for sale", () => {
    it("does not render the modal", () => {
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
          options: { renderMode: "render" },
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
        expect(wrapper.text()).toEqual(
          expect.stringContaining("Registration complete")
        )
      })
    })

    describe("User is not qualified for bidding", () => {
      it("shows a not qualified message", () => {
        const { wrapper } = renderTestComponent({
          Component: ConfirmRegistrationModal,
          options: { renderMode: "render" },
          data: {
            app: {
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
          expect.stringContaining("Registration pending")
        )
      })
    })
  })
})
