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
} from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  getPredefinedSizesByMetric,
  parseRange,
  SizeFilter,
  SIZES_IN_CENTIMETERS,
  SIZES_IN_INCHES,
  getCustomSizeRangeInInches,
  CustomSize,
} from "../SizeFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

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

describe("SizeFilter", () => {
  it("toggles custom input render", () => {
    render(<SizeFilter expanded />)

    // note: an <input type="number" /> has a role of 'spinbutton'
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()

    userEvent.click(screen.getByText("Show custom size"))

    expect(screen.getByText("Hide custom size")).toBeInTheDocument()
    expect(screen.getAllByRole("spinbutton")).toHaveLength(4)
    expect(screen.getByText("Height")).toBeInTheDocument()
    expect(screen.getByText("Width")).toBeInTheDocument()
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
    expect(currentContext().filters?.height).toEqual(
      "4.724409448818897-6.299212598425196"
    )
    expect(currentContext().filters?.width).toEqual(
      "4.724409448818897-6.299212598425196"
    )
  })

  it("updates the filter values when only one dimension is added", () => {
    render(<SizeFilter expanded />)
    userEvent.click(screen.getByText("Show custom size"))
    screen.getAllByRole("spinbutton").map(field => userEvent.clear(field)) // 😭
    userEvent.type(screen.getAllByRole("spinbutton")[2], "12")
    userEvent.type(screen.getAllByRole("spinbutton")[3], "24")
    userEvent.click(screen.getByText("Set size"))

    expect(currentContext().filters?.sizes).toEqual([])
    expect(currentContext().filters?.height).toEqual(
      "4.724409448818897-9.448818897637794"
    )
    expect(currentContext().filters?.width).toEqual("*-*")
  })

  it("clears local input state after Clear All", () => {
    render(<SizeFilter expanded />)

    // before: filter state and input state are empty
    expect(currentContext().filters?.height).toEqual("*-*")
    expect(currentContext().filters?.width).toEqual("*-*")
    expect(screen.queryByDisplayValue("1")).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue("2")).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue("4")).not.toBeInTheDocument()

    // act: enter custom height and width
    userEvent.click(screen.getByText("Show custom size"))
    screen.getAllByRole("spinbutton").map(field => userEvent.clear(field)) // 😭
    userEvent.type(screen.getAllByRole("spinbutton")[0], "1")
    userEvent.type(screen.getAllByRole("spinbutton")[1], "2")
    userEvent.type(screen.getAllByRole("spinbutton")[2], "3")
    userEvent.type(screen.getAllByRole("spinbutton")[3], "4")
    userEvent.click(screen.getByText("Set size"))

    // assert: state and ui are updated
    expect(currentContext().filters?.sizes).toEqual([])
    expect(currentContext().filters?.width).toEqual(
      "0.39370078740157477-0.7874015748031495"
    )
    expect(currentContext().filters?.height).toEqual(
      "1.1811023622047243-1.574803149606299"
    )
    expect(screen.queryByDisplayValue("1")).toBeInTheDocument()
    expect(screen.queryByDisplayValue("2")).toBeInTheDocument()
    expect(screen.queryByDisplayValue("3")).toBeInTheDocument()
    expect(screen.queryByDisplayValue("4")).toBeInTheDocument()

    // act: clear all filters
    userEvent.click(screen.getByText("Clear all"))

    // assert: state and ui are cleared
    expect(currentContext().filters?.height).toEqual("*-*")
    expect(currentContext().filters?.width).toEqual("*-*")
    expect(screen.queryByDisplayValue("1")).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue("2")).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue("4")).not.toBeInTheDocument()
  })

  describe("Metric", () => {
    it("should display predefined sizes in centimeters by default", () => {
      render(<SizeFilter expanded />)

      expect(screen.getByText("Small (under 40cm)")).toBeInTheDocument()
      expect(screen.getByText("Medium (40 – 100cm)")).toBeInTheDocument()
      expect(screen.getByText("Large (over 100cm)")).toBeInTheDocument()
    })

    it("should display predefined sizes in inches when `in` metric is selected", () => {
      render(<SizeFilter expanded />)

      userEvent.click(screen.getByText("in"))

      expect(screen.getByText("Small (under 16in)")).toBeInTheDocument()
      expect(screen.getByText("Medium (16in – 40in)")).toBeInTheDocument()
      expect(screen.getByText("Large (over 40in)")).toBeInTheDocument()
    })

    it("restore default metric when `Clear All` button is pressed", () => {
      render(<SizeFilter expanded />)

      userEvent.click(screen.getByText("in"))
      userEvent.click(screen.getByText("Clear all"))

      const element = screen.getByRole("radio", {
        name: "cm",
      })

      expect(element).toBeChecked()
    })
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

describe("getPredefinedSizesByMetric", () => {
  it("should return predefined sizes in centimeters when `cm` metric is specified", () => {
    expect(getPredefinedSizesByMetric("cm")).toEqual(SIZES_IN_CENTIMETERS)
  })

  it("should return predefined sizes in inches when `in` metric is specified", () => {
    expect(getPredefinedSizesByMetric("in")).toEqual(SIZES_IN_INCHES)
  })
})

describe("parseRange", () => {
  it("correctly parse range in inches", () => {
    expect(parseRange("10-20", "in")).toEqual([10, 20])
  })

  it("correctly parse range in inches with default value", () => {
    expect(parseRange("10-*", "in")).toEqual([10, "*"])
  })

  it("correctly parse range in inches when all values are default", () => {
    expect(parseRange("*-*", "in")).toEqual(["*", "*"])
  })

  it("correctly parse range in centimeters", () => {
    expect(parseRange("1-2", "cm")).toEqual([3, 5])
  })

  it("correctly parse range in centimeters with default value", () => {
    expect(parseRange("1-*", "cm")).toEqual([3, "*"])
  })

  it("correctly parse range in centimeters when all values are default", () => {
    expect(parseRange("*-*", "cm")).toEqual(["*", "*"])
  })
})

describe("getCustomSizeRangeInInches", () => {
  it("should return correct custom size ranges in inches", () => {
    const range: CustomSize = {
      width: [5, 10],
      height: [15, 20],
    }
    const result = {
      width: "5-10",
      height: "15-20",
    }

    expect(getCustomSizeRangeInInches(range, "in")).toEqual(result)
  })

  it("should return correct custom size ranges in inches when default values are passed", () => {
    const range: CustomSize = {
      width: [5, "*"],
      height: ["*", 20],
    }
    const result = {
      width: "5-*",
      height: "*-20",
    }

    expect(getCustomSizeRangeInInches(range, "in")).toEqual(result)
  })

  it("should return custom size ranges with default values", () => {
    const range: CustomSize = {
      width: ["*", "*"],
      height: ["*", "*"],
    }
    const result = {
      width: "*-*",
      height: "*-*",
    }

    expect(getCustomSizeRangeInInches(range, "in")).toEqual(result)
  })

  it("should return correct custom size ranges in centimeters", () => {
    const range: CustomSize = {
      width: [5, 10],
      height: [15, 20],
    }
    const result = {
      width: "1.968503937007874-3.937007874015748",
      height: "5.905511811023622-7.874015748031496",
    }

    expect(getCustomSizeRangeInInches(range, "cm")).toEqual(result)
  })

  it("should return correct custom size ranges in centimeters when default values are passed", () => {
    const range: CustomSize = {
      width: ["*", 10],
      height: [15, "*"],
    }
    const result = {
      width: "*-3.937007874015748",
      height: "5.905511811023622-*",
    }

    expect(getCustomSizeRangeInInches(range, "cm")).toEqual(result)
  })
})
