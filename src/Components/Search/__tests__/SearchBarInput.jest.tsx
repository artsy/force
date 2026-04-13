import { ActionType, ContextModule } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useRouter } from "System/Hooks/useRouter"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useTracking } from "react-tracking"
import { SearchBarInput } from "../SearchBarInput"

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  AutocompleteInput: ({
    value,
    placeholder,
    options,
    onChange,
    onFocus,
    onPaste,
    renderOption,
  }) => (
    <div>
      <input
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onPaste={onPaste}
      />
      <div>
        {options.map((option, i) => (
          <div key={`${option.typename}-${option.value}-${i}`}>
            {renderOption(option)}
          </div>
        ))}
      </div>
    </div>
  ),
  useDidMount: () => true,
}))

jest.mock("System/Hooks/useRouter", () => ({ useRouter: jest.fn() }))

jest.mock("Utils/Hooks/useClientQuery", () => ({ useClientQuery: jest.fn() }))
jest.mock("react-tracking")

jest.mock("../SuggestionItem/SuggestionItem", () => ({
  SuggestionItem: ({ option, onClick }) => (
    <a href={option.href} onClick={event => onClick(option, event)}>
      {option.text}
    </a>
  ),
}))

const mockPush = jest.fn()
const mockTrackEvent = jest.fn()

describe("SearchBarInput", () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      match: { location: { pathname: "/search" } },
      router: { push: mockPush },
    })
    ;(useTracking as jest.Mock).mockReturnValue({ trackEvent: mockTrackEvent })
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: {
        viewer: {
          searchConnection: {
            edges: [
              {
                highlights: null,
                node: {
                  __typename: "Artist",
                  coverArtwork: null,
                  displayLabel: "Andy Warhol",
                  displayType: "Artist",
                  href: "/artist/andy-warhol",
                  imageUrl: null,
                  internalID: "andy-warhol",
                  statuses: { auctionLots: false },
                },
              },
            ],
          },
        },
      },
      refetch: jest.fn(() => ({
        promise: Promise.resolve({
          viewer: { searchConnection: { edges: [] } },
        }),
      })),
    })
  })

  afterEach(() => jest.clearAllMocks())

  it("redirects on a normal suggestion click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }))
    expect(mockPush).toHaveBeenCalledWith("/artist/andy-warhol")
  })

  it("tracks selectedItemFromSearch on suggestion click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }))
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
  })

  it("tracks selection but does not redirect on cmd+click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }), {
      metaKey: true,
    })
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("tracks focusedOnSearchInput on focus", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("textbox"))
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action_type: ActionType.focusedOnSearchInput,
      context_module: ContextModule.topTab,
    })
  })

  it("tracks pastedIntoSearchInput on paste", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    fireEvent.paste(screen.getByRole("textbox"))
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action_type: ActionType.pastedIntoSearchInput,
      context_module: ContextModule.topTab,
      query: "andy",
    })
  })
})
