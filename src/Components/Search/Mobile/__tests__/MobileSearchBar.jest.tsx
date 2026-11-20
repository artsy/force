import { fireEvent, render, screen } from "@testing-library/react"
import { MobileSearchBar } from "Components/Search/Mobile/MobileSearchBar"
import { useRouter } from "System/Hooks/useRouter"
import type { MobileSearchBarSuggestQuery$data } from "__generated__/MobileSearchBarSuggestQuery.graphql"

jest.mock("System/Hooks/useRouter", () => ({ useRouter: jest.fn() }))

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => true),
}))

jest.mock("Components/Search/Mobile/Overlay", () => ({
  OverlayRefetchContainer: ({
    onClose,
    onNavigate,
    shouldAutoFocus,
  }: {
    onClose: () => void
    onNavigate: () => void
    shouldAutoFocus: boolean
  }) => {
    return (
      <div data-testid="overlay" data-autofocus={String(shouldAutoFocus)}>
        <button type="button" onClick={onClose}>
          Close
        </button>
        <button type="button" onClick={onNavigate}>
          Navigate
        </button>
      </div>
    )
  },
}))

const mockUseRouter = useRouter as jest.Mock

const setLocation = (location: {
  key?: string
  pathname?: string
  search?: string
}) => {
  mockUseRouter.mockReturnValue({
    match: { location: { pathname: "/", search: "", ...location } },
  })
}

describe("MobileSearchBar", () => {
  const onClose = jest.fn()

  const renderSearchBar = () => {
    return render(
      <MobileSearchBar
        viewer={{} as NonNullable<MobileSearchBarSuggestQuery$data["viewer"]>}
        onClose={onClose}
      />,
    )
  }

  const rerenderSearchBar = (
    rerender: ReturnType<typeof render>["rerender"],
  ) => {
    rerender(
      <MobileSearchBar
        viewer={{} as NonNullable<MobileSearchBarSuggestQuery$data["viewer"]>}
        onClose={onClose}
      />,
    )
  }

  const openOverlay = () => {
    fireEvent.click(screen.getByPlaceholderText("Search Artsy"))
  }

  beforeEach(() => {
    setLocation({ key: "home" })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("shows the overlay with autofocus when the search input is tapped", () => {
    renderSearchBar()

    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument()

    openOverlay()

    expect(screen.getByTestId("overlay")).toHaveAttribute(
      "data-autofocus",
      "true",
    )
  })

  it("hides the overlay when navigating away and re-shows it without autofocus on back", () => {
    const { rerender } = renderSearchBar()
    openOverlay()

    // Result click keeps the session; the route change hides the overlay
    fireEvent.click(screen.getByRole("button", { name: "Navigate" }))
    setLocation({ key: "artist", pathname: "/artist/banksy" })
    rerenderSearchBar(rerender)

    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument()

    // Browser back restores the opening entry's key
    setLocation({ key: "home" })
    rerenderSearchBar(rerender)

    expect(screen.getByTestId("overlay")).toHaveAttribute(
      "data-autofocus",
      "false",
    )
  })

  it("keeps the overlay closed after an explicit close, including across back", () => {
    const { rerender } = renderSearchBar()
    openOverlay()

    fireEvent.click(screen.getByRole("button", { name: "Close" }))

    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalled()

    setLocation({ key: "artist", pathname: "/artist/banksy" })
    rerenderSearchBar(rerender)
    setLocation({ key: "home" })
    rerenderSearchBar(rerender)

    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument()
  })

  it("re-shows the overlay on back to the keyless initial page-load entry", () => {
    // A fresh page load has no farce key until farce stamps history.state;
    // the entry is identified by its URL instead
    setLocation({ key: undefined })
    const { rerender } = renderSearchBar()
    openOverlay()

    fireEvent.click(screen.getByRole("button", { name: "Navigate" }))
    setLocation({ key: "artist", pathname: "/artist/banksy" })
    rerenderSearchBar(rerender)

    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument()

    // Back restores the initial entry, still keyless
    setLocation({ key: undefined })
    rerenderSearchBar(rerender)

    expect(screen.getByTestId("overlay")).toHaveAttribute(
      "data-autofocus",
      "false",
    )
  })
})
