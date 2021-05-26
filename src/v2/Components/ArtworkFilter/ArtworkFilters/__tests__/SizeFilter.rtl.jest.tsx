import React, { ReactElement } from "react"
import {
  render as originalRender,
  RenderOptions,
  screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SizeFilter } from "../SizeFilter"

const render = (ui: ReactElement, options: RenderOptions = {}) =>
  originalRender(ui, { wrapper: Wrapper, ...options })

const Wrapper: React.FC = ({ children }) => {
  return (
    <ArtworkFilterContextProvider>
      {children}
      <ArtworkFilterContextInspector />
    </ArtworkFilterContextProvider>
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

describe("SizeFilter", () => {
  it("toggles custom input render", () => {
    render(<SizeFilter expanded />)

    // note: an <input type="number" /> has a role of 'spinbutton'
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()

    userEvent.click(screen.getByText("Show custom size"))

    expect(screen.getByText("Hide custom size")).toBeInTheDocument()
    expect(screen.getAllByRole("spinbutton")).toHaveLength(4)
  })

  it("updates context on filter change", () => {
    render(<SizeFilter expanded />)
    expect(currentContext().filters?.sizes).toEqual([])

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentContext().filters?.sizes).toEqual(["SMALL"])

    userEvent.click(screen.getAllByRole("checkbox")[2])
    expect(currentContext().filters?.sizes).toEqual(["SMALL", "LARGE"])
  })

  it("updates the filter values", async () => {
    render(<SizeFilter expanded />)

    userEvent.click(screen.getByText("Show custom size"))
    userEvent.type(screen.getAllByRole("spinbutton")[0], "12")
    userEvent.type(screen.getAllByRole("spinbutton")[1], "16")
    userEvent.type(screen.getAllByRole("spinbutton")[2], "12")
    userEvent.type(screen.getAllByRole("spinbutton")[3], "16")
    userEvent.click(screen.getByText("Set size"))

    expect(currentContext().filters?.sizes).toEqual([])
    expect(currentContext().filters?.height).toEqual("4.72-6.3")
    expect(currentContext().filters?.width).toEqual("4.72-6.3")
  })

  it("updates the filter values when only one dimension is added", () => {
    render(<SizeFilter expanded />)
    userEvent.click(screen.getByText("Show custom size"))
    screen.getAllByRole("spinbutton").map(field => userEvent.clear(field)) // 😭
    userEvent.type(screen.getAllByRole("spinbutton")[2], "12")
    userEvent.type(screen.getAllByRole("spinbutton")[3], "24")
    userEvent.click(screen.getByText("Set size"))

    expect(currentContext().filters?.sizes).toEqual([])
    expect(currentContext().filters?.height).toEqual("4.72-9.45")
    expect(currentContext().filters?.width).toEqual("*-*")
  })

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      render(<SizeFilter />)
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()
    })

    it("hides the filter controls when `false`", () => {
      render(<SizeFilter expanded={false} />)
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()
    })

    it("shows the filter controls when `true`", () => {
      render(<SizeFilter expanded={true} />)
      expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    })
  })
})
