import { renderHook } from "@testing-library/react-hooks"
import { useWebsocketContext } from "System/Hooks/useWebsocketContext"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"

jest.mock("System/Hooks/useWebsocketContext", () => ({
  useWebsocketContext: jest.fn(),
}))

describe("useAuctionWebsocket", () => {
  const mockUseWebsocketContext = useWebsocketContext as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("invokes `onChange` with the new data when the lot id matches", () => {
    mockUseWebsocketContext.mockReturnValue({
      data: {
        lot_id: "catty-lot-id",
        extended_bidding_end_at: "2 minutes from now",
      },
      enabled: true,
    })

    const onChange = jest.fn()

    renderHook(() =>
      useAuctionWebsocket({
        lotID: "catty-lot-id",
        onChange,
      }),
    )

    expect(onChange).toBeCalledWith({
      lot_id: "catty-lot-id",
      extended_bidding_end_at: "2 minutes from now",
    })
  })

  it("does not call `onChange` when the id does not match", () => {
    const onChange = jest.fn()

    renderHook(() =>
      useAuctionWebsocket({
        lotID: "doggy-lot-id",
        onChange,
      }),
    )

    expect(onChange).not.toBeCalled()
  })

  it("does not call `onChange` when the websocket is disabled", () => {
    mockUseWebsocketContext.mockReturnValue({
      data: {
        lot_id: "catty-lot-id",
        extended_bidding_end_at: "2 minutes from now",
      },
      enabled: false,
    })

    const onChange = jest.fn()

    renderHook(() =>
      useAuctionWebsocket({
        lotID: "catty-lot-id",
        onChange,
      }),
    )

    expect(onChange).not.toBeCalled()
  })
})
