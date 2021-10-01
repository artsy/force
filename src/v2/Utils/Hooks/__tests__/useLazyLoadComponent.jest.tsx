import { renderHook, act } from "@testing-library/react-hooks"
import { render } from "@testing-library/react"
import { useLazyLoadComponent } from "../useLazyLoadComponent"

describe("useLazyLoadComponent", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it("renders the component lazily after 1s", () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLazyLoadComponent({ threshold: 500 })
    )
    expect(result.current.isEnteredView).toBeFalsy()

    let wrapper
    act(() => {
      wrapper = render(result.current.Waypoint())
      jest.advanceTimersByTime(5000)
    })
    waitForNextUpdate()

    expect(result.current.isEnteredView).toBeTruthy()
  })
})
