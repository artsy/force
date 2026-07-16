import { Theme } from "@artsy/palette"
import { CommandBar } from "Components/CommandBar/CommandBar"
import { fireEvent, render, screen } from "@testing-library/react"

const mockClose = jest.fn()
jest.mock("Components/CommandBar/CommandBarContext", () => {
  return {
    useCommandBar: () => {
      return { isOpen: true, close: mockClose }
    },
  }
})

const mockNavigate = jest.fn()
const mockFollow = jest.fn()
const mockSave = jest.fn()
const mockCopy = jest.fn()
jest.mock("Components/CommandBar/useCommandBarActions", () => {
  return {
    useCommandBarActions: () => {
      return {
        navigate: mockNavigate,
        followCurrentArtist: mockFollow,
        saveCurrentArtwork: mockSave,
        copyCurrentLink: mockCopy,
      }
    },
  }
})

let mockPathname = "/"
jest.mock("System/Hooks/useRouter", () => {
  return {
    useRouter: () => {
      return { match: { location: { pathname: mockPathname }, params: {} } }
    },
  }
})

let mockIsLoggedIn = true
jest.mock("System/Hooks/useSystemContext", () => {
  return {
    useSystemContext: () => {
      return { isLoggedIn: mockIsLoggedIn }
    },
  }
})

const renderBar = () => {
  return render(
    <Theme>
      <CommandBar />
    </Theme>,
  )
}

describe("CommandBar", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPathname = "/"
    mockIsLoggedIn = true
  })

  it("renders navigation destinations when open", () => {
    renderBar()

    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })

  it("filters the list as the user types", () => {
    renderBar()

    const input = screen.getByPlaceholderText(
      "Search destinations and actions…",
    )

    fireEvent.change(input, { target: { value: "settings" } })

    expect(screen.getByText("Settings")).toBeInTheDocument()
    expect(screen.queryByText("Auctions")).not.toBeInTheDocument()
  })

  it("runs the highlighted command on Enter and closes", () => {
    renderBar()

    const input = screen.getByPlaceholderText(
      "Search destinations and actions…",
    )

    fireEvent.change(input, { target: { value: "settings" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(mockClose).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith("/settings")
  })

  it("runs a command on click", () => {
    renderBar()

    fireEvent.click(screen.getByText("Copy link to this page"))

    expect(mockCopy).toHaveBeenCalled()
  })

  it("hides auth-gated destinations when logged out", () => {
    mockIsLoggedIn = false
    renderBar()

    expect(screen.queryByText("Settings")).not.toBeInTheDocument()
    expect(screen.getByText("Search")).toBeInTheDocument()
  })

  it("shows the follow action on an artist page", () => {
    mockPathname = "/artist/andy-warhol"
    renderBar()

    expect(screen.getByText("Follow this artist")).toBeInTheDocument()
  })
})
