import React, { ReactElement } from "react"
import {
  render as originalRender,
  RenderOptions,
  screen,
  fireEvent,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"

import { KeywordFilter } from "../KeywordFilter"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("lodash/debounce", () => jest.fn(e => e))

const render = (ui: ReactElement, options: RenderOptions = {}) =>
  originalRender(ui, { wrapper: Wrapper, ...options })

const Wrapper: React.FC = ({ children }) => {
  return (
    <ArtworkFilterContextProvider>
      <ClearAllButton />
      {children}
      <ArtworkFilterContextInspector />
    </ArtworkFilterContextProvider>
  )
}

const ClearAllButton: React.FC = () => {
  const artworkFilterContext = useArtworkFilterContext()

  return (
    <button onClick={() => artworkFilterContext.resetFilters()}>
      Clear all
    </button>
  )
}

const ArtworkFilterContextInspector: React.FC = () => {
  const artworkFilterContext = useArtworkFilterContext()

  return (
    <aside data-testid="artwork-filter-context-inspector">
      {JSON.stringify(artworkFilterContext, null, 2)}
    </aside>
  )
}

const currentContext = (): ArtworkFilterContextProps => {
  let contextInspector: HTMLElement
  try {
    contextInspector = screen.getByTestId("artwork-filter-context-inspector")
  } catch (error) {
    if (error.name === "TestingLibraryElementError")
      throw new Error(
        `The currentContext() helper function requires an <ArtworkFilterContextInspector /> to be mounted in the current DOM.`
      )
  }
  return JSON.parse(contextInspector!.textContent!)
}

describe("KeywordFilter", () => {
  it("updates context on filter change", () => {
    render(<KeywordFilter />)
    expect(screen.getByText("Keyword Search")).toBeInTheDocument()

    userEvent.type(screen.getByTestId("keywordSearchInput"), "Chopper")
    expect(currentContext().filters?.keyword).toEqual("Chopper")

    fireEvent.change(screen.getByTestId("keywordSearchInput"), {
      target: { value: "" },
    })
    expect(currentContext().filters?.keyword).toEqual(undefined)
  })

  it("clears local input state after Clear All", () => {
    render(<KeywordFilter />)

    userEvent.type(screen.getByTestId("keywordSearchInput"), "Chopper")
    expect(currentContext().filters?.keyword).toEqual("Chopper")
    expect(
      (screen.getByTestId("keywordSearchInput") as HTMLInputElement).value
    ).toEqual("Chopper")

    userEvent.click(screen.getByText("Clear all"))

    expect(currentContext().filters?.keyword).toEqual(undefined)
    expect(
      (screen.getByTestId("keywordSearchInput") as HTMLInputElement).value
    ).toEqual("")
  })
})
