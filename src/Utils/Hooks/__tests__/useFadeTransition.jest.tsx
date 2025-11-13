import { render } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { useFadeTransition } from "../useFadeTransition"

jest.mock("../../wait", () => ({
  wait: () => Promise.resolve(),
}))

describe("useFadeTransition", () => {
  it("sets some defaults", () => {
    const { result } = renderHook(() => useFadeTransition())

    expect(result.current.mode).toEqual("Resting")
    expect(result.current.status).toEqual("In")
  })

  it("registers elements", () => {
    const { result } = renderHook(() => useFadeTransition())

    const Example = () => {
      return (
        <div>
          <div ref={result.current.register(0)}>one</div>
          <div ref={result.current.register(2)}>three</div>
          <div ref={result.current.register(1)}>two</div>
        </div>
      )
    }

    render(<Example />)

    expect(
      result.current.refs.current.map(ref => ref.current!.innerHTML)
    ).toEqual(["one", "two", "three"])
  })

  it("transitions elements", async () => {
    const { result } = renderHook(() => useFadeTransition({ duration: 250 }))

    const Example = () => {
      return (
        <div>
          <div ref={result.current.register(0)}>one</div>
          <div ref={result.current.register(2)}>three</div>
          <div ref={result.current.register(1)}>two</div>
        </div>
      )
    }

    render(<Example />)

    await result.current.transition("Out")

    const styles = result.current.refs.current.map(ref => ref.current!.style)

    expect(styles.map(style => style.opacity)).toEqual(["0", "0", "0"])
    expect(styles.map(style => style.transition)).toEqual([
      "opacity 250ms",
      "opacity 250ms",
      "opacity 250ms",
    ])
  })
})
