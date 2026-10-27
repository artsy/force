import { act, renderHook } from "@testing-library/react"
import { useArtAssistantImageAttachment } from "Apps/ArtAssistant/hooks/useArtAssistantImageAttachment"
import { createImageThumbnail } from "Apps/ArtAssistant/utils/createImageThumbnail"
import { uploadImageToS3 } from "Components/Search/ImageSearch/uploadImageToS3"
import { useSystemContext } from "System/Hooks/useSystemContext"

const mockSendToast = jest.fn()

jest.mock("System/Hooks/useSystemContext")
jest.mock("Components/Search/ImageSearch/uploadImageToS3")
jest.mock("Apps/ArtAssistant/utils/createImageThumbnail")
jest.mock("@artsy/palette", () => ({
  useToasts: () => ({ sendToast: mockSendToast }),
}))

describe("useArtAssistantImageAttachment", () => {
  const file = new File(["image"], "cat.jpg", { type: "image/jpeg" })

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSystemContext as jest.Mock).mockReturnValue({ relayEnvironment: {} })
    ;(createImageThumbnail as jest.Mock).mockResolvedValue(
      "data:image/jpeg;thumb",
    )
    URL.createObjectURL = jest.fn(() => "blob:preview")
    URL.revokeObjectURL = jest.fn()
  })

  it("shows the preview while uploading, then exposes the uploaded image", async () => {
    let resolveUpload: (value: unknown) => void = () => {}
    ;(uploadImageToS3 as jest.Mock).mockReturnValue(
      new Promise(resolve => {
        resolveUpload = resolve
      }),
    )
    const { result } = renderHook(useArtAssistantImageAttachment)
    let pending: Promise<void> = Promise.resolve()
    act(() => {
      pending = result.current.attach(file)
    })
    expect(result.current.attachment).toEqual({
      status: "uploading",
      previewURL: "blob:preview",
    })
    await act(async () => {
      resolveUpload({ s3Key: "gemini/cat.jpg", s3Bucket: "uploads" })
      await pending
    })
    expect(result.current.attachment).toEqual({
      status: "ready",
      previewURL: "blob:preview",
      image: {
        s3Key: "gemini/cat.jpg",
        s3Bucket: "uploads",
        thumbnailURL: "data:image/jpeg;thumb",
      },
    })
  })

  it("clears the attachment and shows a toast when the upload fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {})
    ;(uploadImageToS3 as jest.Mock).mockResolvedValue(null)
    const { result } = renderHook(useArtAssistantImageAttachment)
    await act(() => result.current.attach(file))
    expect(result.current.attachment).toBeNull()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview")
    expect(mockSendToast).toHaveBeenCalledWith({
      message: "Something went wrong. Please try another image.",
      variant: "error",
    })
  })

  it("ignores an upload that finishes after the image was removed", async () => {
    let resolveUpload: (value: unknown) => void = () => {}
    ;(uploadImageToS3 as jest.Mock).mockReturnValue(
      new Promise(resolve => {
        resolveUpload = resolve
      }),
    )
    const { result } = renderHook(useArtAssistantImageAttachment)
    let pending: Promise<void> = Promise.resolve()
    act(() => {
      pending = result.current.attach(file)
    })
    act(() => result.current.remove())
    await act(async () => {
      resolveUpload({ s3Key: "gemini/cat.jpg", s3Bucket: "uploads" })
      await pending
    })
    expect(result.current.attachment).toBeNull()
    expect(mockSendToast).not.toHaveBeenCalled()
  })
})
