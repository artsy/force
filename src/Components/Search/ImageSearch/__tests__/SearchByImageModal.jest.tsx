import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { SearchByImageModal } from "../SearchByImageModal"
import { uploadImageToS3 } from "../uploadImageToS3"

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ModalDialog: ({ children, title }) => (
    <div>
      <span>{title}</span>
      {children}
    </div>
  ),
  useToasts: () => ({ sendToast: mockSendToast }),
}))

jest.mock("System/Hooks/useRouter", () => ({ useRouter: jest.fn() }))
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

jest.mock("../uploadImageToS3", () => ({ uploadImageToS3: jest.fn() }))

jest.mock("Components/FileUpload/FileDropzone", () => ({
  FileDropzone: ({ onDrop }) => (
    <button
      type="button"
      onClick={() =>
        onDrop([new File(["x"], "art.jpg", { type: "image/jpeg" })])
      }
    >
      drop
    </button>
  ),
}))

const mockPush = jest.fn()
const mockSendToast = jest.fn()
const mockUpload = uploadImageToS3 as jest.Mock

describe("SearchByImageModal", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ router: { push: mockPush } })
    ;(useSystemContext as jest.Mock).mockReturnValue({ relayEnvironment: {} })
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

  it("calls onClose after a successful upload", async () => {
    mockUpload.mockResolvedValue({ s3Key: "k", s3Bucket: "b" })
    const onClose = jest.fn()

    render(<SearchByImageModal onClose={onClose} />)

    fireEvent.click(screen.getByText("drop"))

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
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
    expect(mockPush).not.toHaveBeenCalled()
  })
})
