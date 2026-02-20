import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useRouter } from "System/Hooks/useRouter"
import { CheckoutModal, CheckoutModalError } from "../CheckoutModal"

// Mock the useCheckoutContext hook
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")

// Mock the useCheckoutModal hook
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal")

// Mock the useRouter hook
jest.mock("System/Hooks/useRouter")

const mockRouterReplace = jest.fn()
const mockDismissCheckoutErrorModal = jest.fn()

describe("CriticalErrorModal", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCheckoutContext as jest.Mock).mockReturnValue({
      artworkPath: "/artwork/test-artwork",
    })
    ;(useCheckoutModal as jest.Mock).mockReturnValue({
      dismissCheckoutErrorModal: mockDismissCheckoutErrorModal,
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      router: { replace: mockRouterReplace },
    })

    // Mock window.location
    delete (window as any).location
    window.location = { reload: jest.fn(), href: "" } as any
  })

  it("does not render when error is null", () => {
    const { container } = render(<CheckoutModal error={null} />)
    expect(container.firstChild).toBeNull()
  })

  describe("loading_timeout error", () => {
    it("shows the loading timeout message with reload button", () => {
      render(<CheckoutModal error={CheckoutModalError.LOADING_TIMEOUT} />)

      expect(screen.getByText("Checkout error")).toBeInTheDocument()
      expect(
        screen.getByText("There was an error loading your checkout."),
      ).toBeInTheDocument()
      expect(screen.getByText("Reload")).toBeInTheDocument()
      expect(screen.getByText("Return to Artwork")).toBeInTheDocument()
    })

    it("reloads the page when Reload button is clicked", async () => {
      render(<CheckoutModal error={CheckoutModalError.LOADING_TIMEOUT} />)

      const reloadButton = screen.getByText("Reload")
      await userEvent.click(reloadButton)

      expect(window.onbeforeunload).toBeNull()
      expect(window.location.reload).toHaveBeenCalled()
    })

    it("returns to artwork when Return to Artwork button is clicked", async () => {
      render(<CheckoutModal error={CheckoutModalError.LOADING_TIMEOUT} />)

      const returnButton = screen.getByText("Return to Artwork")
      await userEvent.click(returnButton)

      expect(mockRouterReplace).toHaveBeenCalledWith("/artwork/test-artwork")
    })
  })

  describe("artwork_version_mismatch error", () => {
    it("shows the version mismatch message without reload button", () => {
      render(
        <CheckoutModal error={CheckoutModalError.ARTWORK_VERSION_MISMATCH} />,
      )

      expect(screen.getByText("Work has been updated")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Something about the work changed since you started checkout. Please review the work before submitting your order.",
        ),
      ).toBeInTheDocument()
      expect(screen.queryByText("Reload")).not.toBeInTheDocument()
      expect(screen.getByText("Return to Artwork")).toBeInTheDocument()
    })

    it("returns to artwork when Return to Artwork button is clicked", async () => {
      render(
        <CheckoutModal error={CheckoutModalError.ARTWORK_VERSION_MISMATCH} />,
      )

      const returnButton = screen.getByText("Return to Artwork")
      await userEvent.click(returnButton)

      expect(mockRouterReplace).toHaveBeenCalledWith("/artwork/test-artwork")
    })
  })

  describe("artwork_not_for_sale error", () => {
    it("shows the sold work message without reload button", () => {
      render(<CheckoutModal error={CheckoutModalError.ARTWORK_NOT_FOR_SALE} />)

      expect(screen.getByText("Not available")).toBeInTheDocument()
      expect(
        screen.getByText("Sorry, the work is no longer available."),
      ).toBeInTheDocument()
      expect(screen.queryByText("Reload")).not.toBeInTheDocument()
      expect(screen.getByText("Return to Artwork")).toBeInTheDocument()
    })

    it("returns to artwork when Return to Artwork button is clicked", async () => {
      render(<CheckoutModal error={CheckoutModalError.ARTWORK_NOT_FOR_SALE} />)

      const returnButton = screen.getByText("Return to Artwork")
      await userEvent.click(returnButton)

      expect(mockRouterReplace).toHaveBeenCalledWith("/artwork/test-artwork")
    })
  })

  describe("unknown error types", () => {
    it("shows the default error message without reload button", () => {
      render(<CheckoutModal error={CheckoutModalError.OTHER_ERROR} />)

      expect(screen.getByText("Checkout error")).toBeInTheDocument()
      expect(
        screen.getByText(
          "There was an error with your checkout. Please return to the artwork and try again.",
        ),
      ).toBeInTheDocument()
      expect(screen.queryByText("Reload")).not.toBeInTheDocument()
      expect(screen.getByText("Return to Artwork")).toBeInTheDocument()
    })
  })

  describe("modal close handling", () => {
    it("returns to artwork when modal is closed via X button", async () => {
      render(<CheckoutModal error={CheckoutModalError.LOADING_TIMEOUT} />)

      // ModalDialog should have a close button with aria-label
      const closeButton = screen.getByLabelText("Close")
      await userEvent.click(closeButton)

      expect(mockRouterReplace).toHaveBeenCalledWith("/artwork/test-artwork")
    })
  })

  describe("submit_error", () => {
    it("shows dismissible error message with Continue button", () => {
      render(<CheckoutModal error={CheckoutModalError.SUBMIT_ERROR} />)

      expect(screen.getByText("An error occurred")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Something went wrong while submitting your order. Please try again.",
        ),
      ).toBeInTheDocument()
      expect(screen.getByText("Continue")).toBeInTheDocument()
      expect(screen.queryByText("Return to Artwork")).not.toBeInTheDocument()
    })

    it("dismisses modal when Continue button is clicked", async () => {
      render(<CheckoutModal error={CheckoutModalError.SUBMIT_ERROR} />)

      const continueButton = screen.getByText("Continue")
      await userEvent.click(continueButton)

      expect(mockDismissCheckoutErrorModal).toHaveBeenCalled()
      expect(mockRouterReplace).not.toHaveBeenCalled()
    })

    it("dismisses modal when X button is clicked", async () => {
      render(<CheckoutModal error={CheckoutModalError.SUBMIT_ERROR} />)

      const closeButton = screen.getByLabelText("Close")
      await userEvent.click(closeButton)

      expect(mockDismissCheckoutErrorModal).toHaveBeenCalled()
      expect(mockRouterReplace).not.toHaveBeenCalled()
    })
  })

  describe("CHARGE_AUTHORIZATION_FAILED error", () => {
    it("shows payment authentication error message with Continue button", () => {
      render(
        <CheckoutModal
          error={CheckoutModalError.CHARGE_AUTHORIZATION_FAILED}
        />,
      )

      expect(
        screen.getByText("An error occurred while processing your payment"),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "We are unable to authenticate your payment method. Please choose a different payment method and try again.",
        ),
      ).toBeInTheDocument()
      expect(screen.getByText("Continue")).toBeInTheDocument()
      expect(screen.queryByText("Return to Artwork")).not.toBeInTheDocument()
    })

    it("dismisses modal when Continue button is clicked", async () => {
      render(
        <CheckoutModal
          error={CheckoutModalError.CHARGE_AUTHORIZATION_FAILED}
        />,
      )

      const continueButton = screen.getByText("Continue")
      await userEvent.click(continueButton)

      expect(mockDismissCheckoutErrorModal).toHaveBeenCalled()
      expect(mockRouterReplace).not.toHaveBeenCalled()
    })

    it("dismisses modal when X button is clicked", async () => {
      render(
        <CheckoutModal
          error={CheckoutModalError.CHARGE_AUTHORIZATION_FAILED}
        />,
      )

      const closeButton = screen.getByLabelText("Close")
      await userEvent.click(closeButton)

      expect(mockDismissCheckoutErrorModal).toHaveBeenCalled()
      expect(mockRouterReplace).not.toHaveBeenCalled()
    })
  })

  describe("override title and description", () => {
    it("uses override title when provided", () => {
      render(
        <CheckoutModal
          error={CheckoutModalError.SUBMIT_ERROR}
          overrideTitle="Custom Title"
        />,
      )

      expect(screen.getByText("Custom Title")).toBeInTheDocument()
    })

    it("uses override description when provided", () => {
      render(
        <CheckoutModal
          error={CheckoutModalError.SUBMIT_ERROR}
          overrideDescription="Custom description text"
        />,
      )

      expect(screen.getByText("Custom description text")).toBeInTheDocument()
    })

    it("uses both override title and description when provided", () => {
      render(
        <CheckoutModal
          error={CheckoutModalError.SUBMIT_ERROR}
          overrideTitle="Custom Title"
          overrideDescription="Custom description text"
        />,
      )

      expect(screen.getByText("Custom Title")).toBeInTheDocument()
      expect(screen.getByText("Custom description text")).toBeInTheDocument()
    })
  })
})
