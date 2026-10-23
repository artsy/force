import { render, screen } from "@testing-library/react"
import { useArtAssistantViewport } from "Apps/ArtAssistant/hooks/useArtAssistantViewport"

const Viewport = () => {
  const ref = useArtAssistantViewport()
  return <div ref={ref} data-testid="viewport" />
}

it("keeps the composer area within the visual viewport when a keyboard opens", () => {
  const descriptor = Object.getOwnPropertyDescriptor(window, "visualViewport")
  const viewport = Object.assign(new EventTarget(), {
    height: 700,
    offsetTop: 0,
  })
  Object.defineProperty(window, "visualViewport", {
    configurable: true,
    value: viewport,
  })
  const bounds = jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockReturnValue({ top: 100 } as DOMRect)
  try {
    const { unmount } = render(<Viewport />)
    expect(screen.getByTestId("viewport").style.height).toBe("600px")
    viewport.height = 400
    viewport.dispatchEvent(new Event("resize"))
    expect(screen.getByTestId("viewport").style.height).toBe("300px")
    viewport.offsetTop = 50
    viewport.dispatchEvent(new Event("scroll"))
    expect(screen.getByTestId("viewport").style.height).toBe("350px")
    unmount()
    expect(() => viewport.dispatchEvent(new Event("resize"))).not.toThrow()
  } finally {
    bounds.mockRestore()
    if (descriptor) Object.defineProperty(window, "visualViewport", descriptor)
    else Reflect.deleteProperty(window, "visualViewport")
  }
})
