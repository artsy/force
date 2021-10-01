import { renderHook, act } from "@testing-library/react-hooks"
import { render } from "@testing-library/react"
import { useLazyLoadComponent } from "../useLazyLoadComponent"

describe("useLazyLoadComponent", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it("renders the component lazily after 1s", () => {
    const { result } = renderHook(() =>
      useLazyLoadComponent({ threshold: 500 })
    )
    expect(result.current.isEnteredView).toBeFalsy()

    act(() => {
      render(result.current.Waypoint())
      jest.advanceTimersByTime(500)
    })

    expect(result.current.isEnteredView).toBeTruthy()
  })
})
