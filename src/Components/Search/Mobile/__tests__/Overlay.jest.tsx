import { fireEvent, render, screen } from "@testing-library/react"
import { Overlay } from "Components/Search/Mobile/Overlay"
import { OVERLAY_CONTENT_ID } from "Components/Search/Mobile/OverlayBase"
import type { Overlay_viewer$data } from "__generated__/Overlay_viewer.graphql"
import type { RelayRefetchProp } from "react-relay"
import { useTracking } from "react-tracking"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => false),
}))

jest.mock("react-tracking")

const mockTrackEvent = jest.fn()

describe("Overlay", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent: mockTrackEvent }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderOverlay = (props?: { shouldAutoFocus?: boolean }) => {
    return render(
      <Overlay
        viewer={{} as Overlay_viewer$data}
        relay={{ refetch: jest.fn() } as unknown as RelayRefetchProp}
        onClose={jest.fn()}
        {...props}
      />,
    )
  }

  // ModalBase's scroll lock (react-remove-scroll) reads touch coordinates
  // from document-level listeners, so the synthetic event needs touch data
  const dragContent = (content: HTMLElement) => {
    const touch = { clientX: 0, clientY: 10 }

    fireEvent.touchMove(content, {
      touches: [touch],
      changedTouches: [touch],
    })
  }

  const getContent = () => {
    const content = document.getElementById(OVERLAY_CONTENT_ID)

    if (!content) {
      throw new Error("Overlay content element not found")
    }

    return content
  }

  it("focuses the search input on mount", () => {
    renderOverlay()

    expect(screen.getByPlaceholderText("Search Artsy")).toHaveFocus()
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ action_type: "focusedOnSearchInput" }),
    )
  })

  it("skips the autofocus and its tracking when shouldAutoFocus is false", () => {
    renderOverlay({ shouldAutoFocus: false })

    expect(screen.getByPlaceholderText("Search Artsy")).not.toHaveFocus()
    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action_type: "focusedOnSearchInput" }),
    )
  })

  it("blurs the search input when the user drags the overlay content", () => {
    renderOverlay()

    const input = screen.getByPlaceholderText("Search Artsy")
    expect(input).toHaveFocus()

    dragContent(getContent())

    expect(input).not.toHaveFocus()
  })

  it("leaves focus alone when dragging while the input is not focused", () => {
    renderOverlay()

    const close = screen.getByRole("button", { name: "Close" })
    close.focus()

    dragContent(getContent())

    expect(close).toHaveFocus()
  })
})
