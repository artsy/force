import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { SearchByImageModal } from "../SearchByImageModal"
import { uploadImageToS3 } from "../uploadImageToS3"

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ModalDialog: ({ children, dialogProps, height, title }) => {
    return (
      <div
        data-testid="search-by-image-modal"
        data-dialog-props={JSON.stringify(dialogProps)}
        data-height={JSON.stringify(height)}
      >
        <span>{title}</span>
        {children}
      </div>
    )
  },
  useToasts: () => ({ sendToast: mockSendToast }),
}))

jest.mock("System/Hooks/useRouter", () => ({ useRouter: jest.fn() }))
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

jest.mock("../uploadImageToS3", () => ({ uploadImageToS3: jest.fn() }))

jest.mock("Components/FileUpload/FileDropzone", () => ({
  FileDropzone: ({
    desktopButtonLabel,
    desktopButtonText,
    desktopButtonVariant,
    desktopContent,
    mobileButtonLabel,
    mobileButtonText,
    mobileButtonVariant,
    mobileContent,
    mobileSubtitle,
    onDrop,
  }) => {
    return (
      <div>
        {desktopContent}
        <span data-testid="desktop-upload-button-label">
          {desktopButtonLabel}
        </span>
        <span
          data-testid="desktop-upload-button"
          data-variant={desktopButtonVariant}
        >
          {desktopButtonText}
        </span>
        {mobileContent}
        <span data-testid="mobile-upload-button-label">
          {mobileButtonLabel}
        </span>
        <span
          data-testid="mobile-upload-button"
          data-variant={mobileButtonVariant}
        >
          {mobileButtonText}
        </span>
        {mobileSubtitle}
        <button
          type="button"
          onClick={() =>
            onDrop([new File(["x"], "art.jpg", { type: "image/jpeg" })])
          }
        >
          drop
        </button>
      </div>
    )
  },
}))

const mockPush = jest.fn()
const mockSendToast = jest.fn()
const mockUpload = uploadImageToS3 as jest.Mock
let mockMatch

describe("SearchByImageModal", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: jest.fn(() => "blob:search-image"),
    })
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: jest.fn(),
    })
    mockMatch = {
      location: { pathname: "/" },
      elements: [],
    }
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: mockMatch,
      router: { push: mockPush },
    }))
    ;(useSystemContext as jest.Mock).mockReturnValue({ relayEnvironment: {} })
  })

  it("shows the uploaded image while searching for matches", () => {
    mockUpload.mockReturnValue(new Promise(() => {}))

    render(<SearchByImageModal onClose={jest.fn()} />)

    fireEvent.click(screen.getByText("drop"))

    expect(screen.getByAltText("Your search image")).toHaveAttribute(
      "src",
      "blob:search-image",
    )
    expect(screen.getByTestId("image-search-scan-line")).toBeInTheDocument()
    expect(screen.getByText("Searching for matches…")).toBeInTheDocument()
  })

  it("uses the full screen on mWeb", () => {
    render(<SearchByImageModal onClose={jest.fn()} />)

    expect(screen.getByTestId("search-by-image-modal")).toHaveAttribute(
      "data-dialog-props",
      JSON.stringify({
        width: ["100%", 650],
        height: ["100%", "auto"],
      }),
    )
    expect(screen.getByTestId("search-by-image-modal")).toHaveAttribute(
      "data-height",
      JSON.stringify(["100%", "auto"]),
    )
    expect(screen.getByText("Find Art with Artsy Lens")).toBeInTheDocument()
    expect(
      screen.queryByText("Find art that looks like what you love"),
    ).not.toBeInTheDocument()
    expect(screen.getByTestId("mobile-upload-button")).toHaveTextContent(
      "Upload a Photo",
    )
    expect(screen.getByTestId("mobile-upload-button")).toHaveAttribute(
      "data-variant",
      "primaryBlack",
    )
    expect(screen.getByTestId("desktop-upload-button")).toHaveTextContent(
      "Upload a Photo",
    )
    expect(screen.getByTestId("desktop-upload-button")).toHaveAttribute(
      "data-variant",
      "primaryBlack",
    )
    expect(screen.getByTestId("desktop-upload-button-label")).toHaveTextContent(
      "or",
    )
    expect(screen.getByTestId("mobile-upload-button-label")).toHaveTextContent(
      "or",
    )
    const descriptions = screen.getAllByTestId(
      "image-search-upload-description",
    )

    expect(descriptions[0]).toHaveTextContent(
      "Drag a photo here or choose one from your files.We’ll find similar artworks.",
    )
    descriptions.forEach(description => {
      expect(description.querySelector("br")).toBeInTheDocument()
    })
    expect(
      screen.queryByText("We’ll use it to search for similar artworks."),
    ).not.toBeInTheDocument()
  })

  it("uploads to S3 and navigates to /image-search with the s3 params", async () => {
    mockUpload.mockResolvedValue({
      s3Key: "gemini/art.jpg",
      s3Bucket: "my-bucket",
    })

    render(<SearchByImageModal onClose={jest.fn()} />)

    fireEvent.click(screen.getByText("drop"))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        "/image-search?s3Key=gemini%2Fart.jpg&s3Bucket=my-bucket",
      )
    })
  })

  it("keeps the modal open until the image search route resolves", async () => {
    mockUpload.mockResolvedValue({ s3Key: "k", s3Bucket: "b" })
    const onClose = jest.fn()

    const { rerender } = render(<SearchByImageModal onClose={onClose} />)

    fireEvent.click(screen.getByText("drop"))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled()
    })

    expect(onClose).not.toHaveBeenCalled()

    mockMatch = { location: { pathname: "/image-search" } }
    rerender(<SearchByImageModal onClose={onClose} />)

    expect(onClose).not.toHaveBeenCalled()

    mockMatch = {
      location: { pathname: "/image-search" },
      elements: [],
    }
    rerender(<SearchByImageModal onClose={onClose} />)

    expect(onClose).toHaveBeenCalled()
  })

  it("shows an error toast and does not navigate when the upload fails", async () => {
    mockUpload.mockResolvedValue(null)

    render(<SearchByImageModal onClose={jest.fn()} />)

    fireEvent.click(screen.getByText("drop"))

    await waitFor(() => {
      expect(mockSendToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: "error" }),
      )
    })
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:search-image")
    expect(mockPush).not.toHaveBeenCalled()
  })
})
