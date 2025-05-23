import { fireEvent, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"

import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const render = createArtworkFilterTestRenderer()

describe("KeywordFilter", () => {
  it("updates context on filter change", async () => {
    render(<KeywordFilter />)
    expect(screen.getByText(/Keyword Search/)).toBeInTheDocument()

    userEvent.type(screen.getByTestId("keywordSearchInput"), "Chopper")

    await waitFor(() => {
      expect(currentArtworkFilterContext().filters?.keyword).toEqual("Chopper")
    })

    fireEvent.change(screen.getByTestId("keywordSearchInput"), {
      target: { value: "" },
    })

    await waitFor(() => {
      expect(currentArtworkFilterContext().filters?.keyword).toEqual(undefined)
    })
  })

  it("clears local input state after Clear All", async () => {
    render(<KeywordFilter />)

    userEvent.type(screen.getByTestId("keywordSearchInput"), "Chopper")

    await waitFor(() => {
      expect(currentArtworkFilterContext().filters?.keyword).toEqual("Chopper")
    })

    expect(
      (screen.getByTestId("keywordSearchInput") as HTMLInputElement).value,
    ).toEqual("Chopper")

    userEvent.click(screen.getByText("Clear all"))

    await waitFor(() => {
      expect(currentArtworkFilterContext().filters?.keyword).toEqual(undefined)
      expect(
        (screen.getByTestId("keywordSearchInput") as HTMLInputElement).value,
      ).toEqual("")
    })
  })
})
