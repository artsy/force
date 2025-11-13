import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { ArtistNationalityFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
  aggregations: [
    {
      slice: "ARTIST_NATIONALITY",
      counts: [
        {
          name: "Cat",
          count: 10,
          value: "cat",
        },
        {
          name: "Dog",
          count: 5,
          value: "dog",
        },
      ],
    },
  ],
}

const render = createArtworkFilterTestRenderer(artworkFilterContext)

describe(ArtistNationalityFilter, () => {
  it("renders artist nationalities", () => {
    render(<ArtistNationalityFilter expanded />)
    expect(
      screen.getByText("Artist Nationality or Ethnicity")
    ).toBeInTheDocument()
    expect(screen.getByText("Cat")).toBeInTheDocument()
    expect(screen.getByText("Dog")).toBeInTheDocument()
  })

  it("renders nothing when there are no nationalities", () => {
    const contextWithEmptyAggregations: Partial<ArtworkFilterContextProps> = {
      aggregations: [
        {
          slice: "ARTIST_NATIONALITY",
          counts: [],
        },
      ],
    }
    const emptyRender = createArtworkFilterTestRenderer(
      contextWithEmptyAggregations
    )
    emptyRender(<ArtistNationalityFilter expanded />)

    expect(
      screen.queryByText("Artist Nationality or Ethnicity")
    ).not.toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<ArtistNationalityFilter expanded />)
    expect(currentArtworkFilterContext().filters?.artistNationalities).toEqual(
      []
    )

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.artistNationalities).toEqual([
      "cat",
    ])

    userEvent.click(screen.getAllByRole("checkbox")[1])
    expect(currentArtworkFilterContext().filters?.artistNationalities).toEqual([
      "cat",
      "dog",
    ])
  })

  it("clears local input state after Clear All", () => {
    render(<ArtistNationalityFilter expanded />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    userEvent.click(screen.getAllByRole("checkbox")[1])
    expect(currentArtworkFilterContext().filters?.artistNationalities).toEqual([
      "cat",
      "dog",
    ])

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.artistNationalities).toEqual(
      []
    )
  })

  it("can render in expanded or collapsed state", () => {
    render(<ArtistNationalityFilter />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<ArtistNationalityFilter expanded={false} />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<ArtistNationalityFilter expanded={true} />)
    expect(screen.getAllByRole("checkbox")).toHaveLength(2)
  })
})
