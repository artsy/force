import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useRouter } from "System/Hooks/useRouter"
import { CriticalErrorModal } from "../CriticalErrorModal"

// Mock the useCheckoutContext hook
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")

// Mock the useRouter hook
jest.mock("System/Hooks/useRouter")

const mockRouterReplace = jest.fn()

describe("CriticalErrorModal", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCheckoutContext as jest.Mock).mockReturnValue({
      artworkPath: "/artwork/test-artwork",
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      router: { replace: mockRouterReplace },
    })

    // Mock window.location
    delete (window as any).location
    window.location = { reload: jest.fn(), href: "" } as any
  })

  it("does not render when error is null", () => {
    const { container } = render(<CriticalErrorModal error={null} />)
    expect(container.firstChild).toBeNull()
  })

  describe("loading_timeout error", () => {
    it("shows the loading timeout message with reload button", () => {
      render(<CriticalErrorModal error="loading_timeout" />)

      expect(screen.getByText("Checkout Error")).toBeInTheDocument()
      expect(
        screen.getByText(
          "There was an error loading your checkout. Please try refreshing the page.",
        ),
      ).toBeInTheDocument()
      expect(screen.getByText("Reload")).toBeInTheDocument()
      expect(screen.getByText("Return to Artwork")).toBeInTheDocument()
    })

    it("reloads the page when Reload button is clicked", async () => {
      render(<CriticalErrorModal error="loading_timeout" />)

      const reloadButton = screen.getByText("Reload")
      await userEvent.click(reloadButton)

      expect(window.onbeforeunload).toBeNull()
      expect(window.location.reload).toHaveBeenCalled()
    })

    it("returns to artwork when Return to Artwork button is clicked", async () => {
      render(<CriticalErrorModal error="loading_timeout" />)

      const returnButton = screen.getByText("Return to Artwork")
      await userEvent.click(returnButton)

      expect(mockRouterReplace).toHaveBeenCalledWith("/artwork/test-artwork")
    })
  })

  describe("artwork_version_mismatch error", () => {
    it("shows the version mismatch message without reload button", () => {
      render(<CriticalErrorModal error="artwork_version_mismatch" />)

      expect(screen.getByText("Checkout Error")).toBeInTheDocument()
      expect(
        screen.getByText(
          "The artwork has been updated since you started checkout. Please return to the artwork to create a new order.",
        ),
      ).toBeInTheDocument()
      expect(screen.queryByText("Reload")).not.toBeInTheDocument()
      expect(screen.getByText("Return to Artwork")).toBeInTheDocument()
    })

    it("returns to artwork when Return to Artwork button is clicked", async () => {
      render(<CriticalErrorModal error="artwork_version_mismatch" />)

      const returnButton = screen.getByText("Return to Artwork")
      await userEvent.click(returnButton)

      expect(mockRouterReplace).toHaveBeenCalledWith("/artwork/test-artwork")
    })
  })

  describe("unknown error types", () => {
    it("shows the default error message without reload button", () => {
      render(<CriticalErrorModal error="some_unknown_error" />)

      expect(screen.getByText("Checkout Error")).toBeInTheDocument()
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
      render(<CriticalErrorModal error="loading_timeout" />)

      // ModalDialog should have a close button with aria-label
      const closeButton = screen.getByLabelText("Close")
      await userEvent.click(closeButton)

      expect(mockRouterReplace).toHaveBeenCalledWith("/artwork/test-artwork")
    })
  })
})
