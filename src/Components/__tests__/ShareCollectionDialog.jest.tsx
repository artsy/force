import {
  ShareCollectionDialog,
  type ShareCollectionDialogProps,
} from "Components/ShareCollectionDialog"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({
    user: { id: "user-id-1" },
  }),
}))

jest.mock("Utils/getENV", () => ({
  getENV: () => "https://artsy.biz",
}))

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: jest.fn(),
  },
  configurable: true,
})

const mockSubmitMutation = jest.fn()
jest.mock("Utils/Hooks/useMutation", () => ({
  useMutation: () => ({
    submitMutation: mockSubmitMutation,
  }),
}))

const mockSendToast = jest.fn()
jest.mock("@artsy/palette", () => {
  const originalModule = jest.requireActual("@artsy/palette")
  return {
    ...originalModule,
    useToasts: () => ({
      sendToast: mockSendToast,
    }),
  }
})

jest.useFakeTimers()

describe("ShareCollectionDialog", () => {
  const mockOnClose = jest.fn()
  const mockCollection = {
    internalID: "collection-id-1",
    slug: "test-collection-slug",
    name: "Test Collection",
    private: true, // initially private
  } as ShareCollectionDialogProps["collection"]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly with initial state (private collection)", () => {
    render(
      <ShareCollectionDialog
        onClose={mockOnClose}
        collection={mockCollection}
      />,
    )

    expect(screen.getByText("Share “Test Collection”")).toBeInTheDocument()

    const toggle = screen.getByRole("toggle")
    const inputField = screen.getByRole("textbox")
    const copyButton = screen.getByRole("button", { name: /Copy link/ })
    const openLinkButton = screen.getByRole("link", { name: /Open in new tab/ })

    expect(toggle).toBeEnabled()
    expect(inputField).toBeDisabled()
    expect(copyButton).toBeDisabled()
    expect(openLinkButton).toHaveAttribute("disabled")
  })

  it("renders correctly with a shared collection", () => {
    render(
      <ShareCollectionDialog
        onClose={mockOnClose}
        collection={{
          ...mockCollection,
          private: false, // not private = shared
        }}
      />,
    )

    expect(screen.getByText("Share “Test Collection”")).toBeInTheDocument()

    const toggle = screen.getByRole("toggle")
    const inputField = screen.getByRole("textbox")
    const copyButton = screen.getByRole("button", { name: /Copy link/ })
    const openLinkButton = screen.getByRole("link", { name: /Open in new tab/ })

    expect(toggle).toBeEnabled()
    expect(inputField).toBeEnabled()
    expect(copyButton).toBeEnabled()
    expect(openLinkButton).not.toHaveAttribute("disabled")
  })

  it("copies the link to clipboard when clicked", () => {
    render(
      <ShareCollectionDialog
        onClose={mockOnClose}
        collection={{
          ...mockCollection,
          private: false, // not private = shared
        }}
      />,
    )

    const copyButton = screen.getByRole("button", { name: /Copy link/ })
    fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "https://artsy.biz/user/user-id-1/collection/test-collection-slug",
    )
  })

  it("closes the dialog when Done button is clicked", () => {
    render(
      <ShareCollectionDialog
        onClose={mockOnClose}
        collection={mockCollection}
      />,
    )

    fireEvent.click(screen.getByText("Done"))
    expect(mockOnClose).toHaveBeenCalled()
  })

  it("toggles collection visibility when toggle is clicked", async () => {
    mockSubmitMutation.mockResolvedValue({
      updateCollection: {
        responseOrError: {
          collection: {
            internalID: "collection-id-1",
            slug: "test-collection-slug",
            private: false,
          },
        },
      },
    })

    render(
      <ShareCollectionDialog
        onClose={mockOnClose}
        collection={mockCollection}
      />,
    )

    const toggle = screen.getByRole("toggle")
    fireEvent.click(toggle)

    expect(mockSubmitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            id: "collection-id-1",
            private: false, // toggle from private to public
          },
        },
      }),
    )

    // After the mutation resolves, the inputs should be enabled
    await waitFor(() => {
      const inputField = screen.getByRole("textbox")
      expect(inputField).not.toBeDisabled()
    })
  })

  it("handles error when toggling collection visibility", async () => {
    // Set up mock mutation to reject
    mockSubmitMutation.mockRejectedValue(new Error("Mutation failed"))

    render(
      <ShareCollectionDialog
        onClose={mockOnClose}
        collection={mockCollection}
      />,
    )

    const toggle = screen.getByRole("toggle")
    fireEvent.click(toggle)

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
      expect(mockSendToast).toHaveBeenCalledWith({
        message: "Failed to enable sharing",
        variant: "error",
      })
    })
  })
})
