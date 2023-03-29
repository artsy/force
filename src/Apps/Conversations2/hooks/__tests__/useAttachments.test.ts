import { act, renderHook, waitFor } from "@testing-library/react"
import { useAttachments } from "../useAttachments"
import * as upload from "utils/hooks/uploadFileToS3"

jest.mock("utils/hooks/uploadFileToS3", () => ({
  __esModule: true, //    <----- this __esModule: true is important
  ...jest.requireActual("utils/hooks/uploadFileToS3"),
}))

const sendToastMock = jest.fn()
jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: () => ({
    sendToast: sendToastMock,
  }),
}))

describe("useAttachments", () => {
  it("clear the attachments", () => {
    const { result } = renderHook(() => useAttachments())

    act(() => result.current.addAttachments([files[0]]))

    expect(result.current.isLoadingAttachments).toBe(false)
    expect(result.current.attachments.length).toBe(1)

    act(() => result.current.clearAttachments())
    expect(result.current.attachments.length).toBe(0)
  })

  it("keeps loading given attachments without URL", () => {
    const { result } = renderHook(() => useAttachments())

    act(() => result.current.addAttachments([files[1]]))

    expect(result.current.isLoadingAttachments).toBe(true)
  })

  it("sets error state given files bigger than the limit and wipes out files not loaded", () => {
    const { result } = renderHook(() => useAttachments())

    act(() => result.current.addAttachments([files[2], files[3]]))

    expect(result.current.error).toBe("size")
    expect(result.current.attachments.length).toBe(1)
    expect(result.current.attachments[0]).toBe(files[3])
  })

  it("clears error state", () => {
    const { result } = renderHook(() => useAttachments())

    act(() => result.current.addAttachments([files[2], files[3]]))

    expect(result.current.error).toBe("size")

    act(() => result.current.clearError())

    expect(result.current.error).toBe(null)
  })

  it("sets URL to attachments given completed upload", async () => {
    const promisesCb: ((value: unknown) => void)[] = []
    const uploadMock = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        promisesCb.push(resolve)
      })
    })
    jest
      .spyOn(upload, "uploadFileToS3")
      .mockImplementationOnce(uploadMock)
      .mockImplementationOnce(uploadMock)
    const { result } = renderHook(() => useAttachments("inquiry-id"))

    act(() => result.current.addAttachments([files[1], files[4]]))

    await waitFor(() => expect(uploadMock).toHaveBeenCalledTimes(2))

    act(() => promisesCb[0]("first-url"))
    await waitFor(() =>
      expect(result.current.attachments[0].url).toBe("first-url")
    )

    expect(result.current.isLoadingAttachments).toBe(true)

    act(() => promisesCb[1]("second-url"))
    await waitFor(() =>
      expect(result.current.attachments[1].url).toBe("second-url")
    )

    await waitFor(() => expect(result.current.isLoadingAttachments).toBe(false))
  })

  it("keeps the loading status given upload error", async () => {
    let promiseCb: (value: unknown) => void
    let rejectCb: (value: unknown) => void
    const uploadMock = jest
      .fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          promiseCb = resolve
        })
      })
      .mockImplementationOnce(() => {
        return new Promise((_, reject) => {
          rejectCb = reject
        })
      })
    jest
      .spyOn(upload, "uploadFileToS3")
      .mockImplementationOnce(uploadMock)
      .mockImplementationOnce(uploadMock)
    const { result } = renderHook(() => useAttachments("inquiry-id"))

    act(() => result.current.addAttachments([files[1], files[4]]))

    act(() => promiseCb("first-url"))
    await waitFor(() =>
      expect(result.current.attachments[0].url).toBe("first-url")
    )

    expect(result.current.isLoadingAttachments).toBe(true)

    act(() => rejectCb("Something went wrong"))

    expect(result.current.isLoadingAttachments).toBe(true)
    await waitFor(() =>
      expect(sendToastMock).toHaveBeenCalledWith({
        variant: "error",
        message: "Attachment failed to upload. Please try again.",
      })
    )
  })

  it("handles correctly attachments when the promise resolves of a removed attachment", async () => {
    const promisesCb: ((value: unknown) => void)[] = []
    const uploadMock = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        promisesCb.push(resolve)
      })
    })
    jest
      .spyOn(upload, "uploadFileToS3")
      .mockImplementationOnce(uploadMock)
      .mockImplementationOnce(uploadMock)
    const { result } = renderHook(() => useAttachments("inquiry-id"))

    act(() => result.current.addAttachments([files[1], files[4]]))

    await waitFor(() => expect(uploadMock).toHaveBeenCalledTimes(2))

    act(() => result.current.removeAttachment(files[4].id))

    act(() => promisesCb[0]("first-url"))
    await waitFor(() =>
      expect(result.current.attachments[0].url).toBe("first-url")
    )

    act(() => promisesCb[1]("second-url"))
    let error
    try {
      await waitFor(() => expect(result.current.attachments.length).toBe(2))
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })
})

const files = [
  {
    id: "1",
    name: "1.png",
    type: "image/png",
    url: "url",
    numericSize: 1,
    file: {} as File,
  },
  {
    id: "2",
    name: "2.png",
    type: "image/png",
    numericSize: 1,
    file: {} as File,
  },
  {
    id: "3",
    name: "3.png",
    type: "image/png",
    numericSize: 20_000_001,
    file: {} as File,
  },
  {
    id: "4",
    name: "4.png",
    type: "png",
    numericSize: 100,
    url: "url",
    file: {} as File,
  },
  {
    id: "5",
    name: "5.png",
    type: "image/png",
    numericSize: 1,
    file: {} as File,
  },
]
