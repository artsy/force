import { act, render, screen } from "@testing-library/react"
import {
  getObserverOf,
  intersect,
} from "Utils/Hooks/__tests__/mockIntersectionObserver"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"

interface TargetProps {
  isReplaced?: boolean
  once?: boolean
  onIntersection: () => void
}

// Changing the element type at the same position makes React replace the DOM
// node while the hook instance (and its observer) stays the same
const Target = ({ isReplaced, once, onIntersection }: TargetProps) => {
  const { ref } = useIntersectionObserver({ once, onIntersection })

  if (isReplaced) {
    return <span data-testid="replacement" ref={ref} />
  }

  return <div data-testid="original" ref={ref} />
}

describe("useIntersectionObserver", () => {
  it("calls onIntersection when the observed node intersects", () => {
    const onIntersection = jest.fn()
    render(<Target onIntersection={onIntersection} />)

    act(() => intersect(screen.getByTestId("original"), true))

    expect(onIntersection).toHaveBeenCalledTimes(1)
  })

  it("observes a node that replaces the original after mount", () => {
    const onIntersection = jest.fn()
    const { rerender } = render(<Target onIntersection={onIntersection} />)

    const original = screen.getByTestId("original")
    const observer = getObserverOf(original)

    rerender(<Target isReplaced onIntersection={onIntersection} />)

    const replacement = screen.getByTestId("replacement")

    expect(observer.unobserve).toHaveBeenCalledWith(original)
    expect(observer.observe).toHaveBeenCalledWith(replacement)

    act(() => intersect(replacement, true))

    expect(onIntersection).toHaveBeenCalledTimes(1)
  })

  it("doesn't observe a replacement node once it has already intersected", () => {
    const onIntersection = jest.fn()
    const { rerender } = render(<Target onIntersection={onIntersection} />)

    const original = screen.getByTestId("original")
    const observer = getObserverOf(original)

    act(() => intersect(original, true))

    rerender(<Target isReplaced onIntersection={onIntersection} />)

    expect(observer.observe).not.toHaveBeenCalledWith(
      screen.getByTestId("replacement"),
    )
    expect(onIntersection).toHaveBeenCalledTimes(1)
  })

  it("keeps observing a replacement node when once is false", () => {
    const onIntersection = jest.fn()
    const { rerender } = render(
      <Target once={false} onIntersection={onIntersection} />,
    )

    act(() => intersect(screen.getByTestId("original"), true))

    rerender(<Target once={false} isReplaced onIntersection={onIntersection} />)

    act(() => intersect(screen.getByTestId("replacement"), true))

    expect(onIntersection).toHaveBeenCalledTimes(2)
  })
})
