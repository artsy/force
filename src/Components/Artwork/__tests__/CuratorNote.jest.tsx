import { Theme } from "@artsy/palette"
import { fireEvent, render, screen } from "@testing-library/react"
import { CuratorNote } from "Components/Artwork/CuratorNote"
import { useFlag } from "@unleash/proxy-client-react"
import { useTracking } from "react-tracking"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(),
}))

describe("CuratorNote", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useFlag as jest.Mock).mockReturnValue(true)
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (note: string) => {
    return render(
      <Theme>
        <CuratorNote note={note} artworkInternalID="a-id" artworkSlug="a-slug" />
      </Theme>,
    )
  }

  it("renders the note text", () => {
    renderComponent("Chosen for its bold use of color")

    expect(
      screen.getByText(/Chosen for its bold use of color/),
    ).toBeInTheDocument()
  })

  it("renders nothing when the note is empty", () => {
    const { container } = renderComponent("")

    expect(container).toBeEmptyDOMElement()
  })

  it("renders nothing when the feature flag is off", () => {
    ;(useFlag as jest.Mock).mockReturnValue(false)

    const { container } = renderComponent("Chosen for its bold use of color")

    expect(container).toBeEmptyDOMElement()
  })

  it("opens a dialog and tracks a click event when clicked", () => {
    renderComponent("Chosen for its bold use of color")

    fireEvent.click(screen.getByText(/Chosen for its bold use of color/))

    // The dialog title is unique to the opened dialog.
    expect(screen.getByText("Curator’s note")).toBeInTheDocument()
    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedCuratorNote",
        artwork_id: "a-id",
        artwork_slug: "a-slug",
      }),
    )
  })

  it("shows a Read more cue for long notes but not short ones", () => {
    const { rerender } = renderComponent("A short note.")
    expect(screen.queryByText("Read more")).not.toBeInTheDocument()

    rerender(
      <Theme>
        <CuratorNote note={"A much longer curator note ".repeat(6)} />
      </Theme>,
    )
    expect(screen.getByText("Read more")).toBeInTheDocument()
  })
})
