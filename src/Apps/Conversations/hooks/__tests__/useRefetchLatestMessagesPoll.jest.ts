import { renderHook } from "@testing-library/react-hooks"
import { useRefetchLatestMessagesPoll } from "Apps/Conversations/hooks/useRefetchLatestMessagesPoll"
import { usePoll } from "Utils/Hooks/usePoll"
import { useTabVisible } from "Utils/Hooks/useTabVisible"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockReturnValue(true),
}))

jest.mock("Utils/Hooks/usePoll", () => ({
  usePoll: jest.fn(),
}))

jest.mock("Utils/Hooks/useTabVisible", () => ({
  useTabVisible: jest.fn(),
}))

describe("useRefetchLatestMessagesPoll", () => {
  const mockUseTabVisible = useTabVisible as jest.MockedFunction<
    typeof useTabVisible
  >
  const mockUsePoll = usePoll as jest.MockedFunction<typeof usePoll>

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should call usePoll with the correct arguments", () => {
    const intervalTime = 10000
    const onRefetch = jest.fn()

    renderHook(() => useRefetchLatestMessagesPoll({ intervalTime, onRefetch }))

    expect(mockUsePoll).toHaveBeenCalledWith({
      callback: expect.any(Function),
      intervalTime,
      key: "MessageRefetcher",
    })
  })

  it("should call onRefetch when usePoll callback is executed and tab is visible", () => {
    const intervalTime = 10000
    const onRefetch = jest.fn()

    mockUseTabVisible.mockReturnValueOnce(true)

    renderHook(() => useRefetchLatestMessagesPoll({ intervalTime, onRefetch }))

    const usePollCallback = mockUsePoll.mock.calls[0][0].callback
    usePollCallback()

    expect(onRefetch).toHaveBeenCalled()
  })

  it("should not call onRefetch when tab is not visible", () => {
    const intervalTime = 10000
    const onRefetch = jest.fn()

    mockUseTabVisible.mockReturnValueOnce(false)

    renderHook(() => useRefetchLatestMessagesPoll({ intervalTime, onRefetch }))

    const usePollCallback = mockUsePoll.mock.calls[0][0].callback
    usePollCallback()

    expect(onRefetch).not.toHaveBeenCalled()
  })

  it("should not call onRefetch when auto refresh is disabled", () => {
    const intervalTime = 10000
    const onRefetch = jest.fn()

    process.env.NEXT_PUBLIC_ENABLE_MESSAGE_AUTO_REFRESH = "false"

    renderHook(() => useRefetchLatestMessagesPoll({ intervalTime, onRefetch }))

    const usePollCallback = mockUsePoll.mock.calls[0][0].callback
    usePollCallback()

    expect(onRefetch).not.toHaveBeenCalled()

    delete process.env.NEXT_PUBLIC_ENABLE_MESSAGE_AUTO_REFRESH
  })
})
