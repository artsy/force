import { renderHook } from "@testing-library/react-hooks"
import { useScrollPagination } from "Apps/Conversations/hooks/useScrollPagination"

describe("useScrollPagination", () => {
  it("appending the 2nd ref triggers scrollIntoView of the 1st ref", () => {
    const scrollIntoView = jest.fn()
    const { result } = renderHook(() => useScrollPagination())

    result.current.appendElementRef({ scrollIntoView } as any, "key-1")
    result.current.appendElementRef(
      { scrollIntoView: jest.fn() } as any,
      "key-2"
    )

    expect(scrollIntoView).toBeCalledTimes(1)
  })

  it("appending the 3rd ref triggers scrollIntoView of the 2nd ref", () => {
    const firstScrollIntoView = jest.fn()
    const secondScrollIntoView = jest.fn()
    const { result } = renderHook(() => useScrollPagination())

    result.current.appendElementRef(
      { scrollIntoView: firstScrollIntoView } as any,
      "key-1"
    )
    result.current.appendElementRef(
      { scrollIntoView: secondScrollIntoView } as any,
      "key-2"
    )
    result.current.appendElementRef(
      { scrollIntoView: jest.fn() } as any,
      "key-3"
    )

    expect(firstScrollIntoView).toBeCalledTimes(1)
    expect(secondScrollIntoView).toBeCalledTimes(1)
  })

  it("doesn't call scrollIntoView given not enough refs stored", () => {
    const scrollIntoView = jest.fn()
    const { result } = renderHook(() => useScrollPagination())

    result.current.appendElementRef({ scrollIntoView } as any, "key-1")
    result.current.appendElementRef(undefined, "key-2")

    expect(scrollIntoView).not.toHaveBeenCalled()
  })
})
