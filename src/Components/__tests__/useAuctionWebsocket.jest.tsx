import { renderHook } from "@testing-library/react-hooks"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"

jest.mock("System/Hooks/useWebsocketContext", () => ({
  useWebsocketContext: () => {
    return {
      data: {
        lot_id: "catty-lot-id",
        extended_bidding_end_at: "2 minutes from now",
      },
    }
  },
}))

describe("useAuctionWebsocket", () => {
  it("invokes `onChange` with the new data when the lot id matches", () => {
    const onChange = jest.fn()

    renderHook(() =>
      useAuctionWebsocket({
        lotID: "catty-lot-id",
        onChange,
      })
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
      })
    )

    expect(onChange).not.toBeCalled()
  })
})
