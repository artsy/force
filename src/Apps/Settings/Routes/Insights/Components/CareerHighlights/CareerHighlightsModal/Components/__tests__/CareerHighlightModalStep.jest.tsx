import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { CareerHighlightModalStep } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Components/CareerHighlightModalStep"
import { CareerHighlightModalStepTestQuery } from "__generated__/CareerHighlightModalStepTestQuery.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("CareerHighlightModalStep", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    CareerHighlightModalStepTestQuery
  >({
    Component: ({ me }) => {
      if (me?.myCollectionInfo?.BIENNIAL)
        return (
          <CareerHighlightModalStep
            careerHighlight={me.myCollectionInfo.BIENNIAL}
            kind="BIENNIAL"
          />
        )

      return null
    },
    query: graphql`
      query CareerHighlightModalStepTestQuery @relay_test_operation {
        me {
          myCollectionInfo {
            BIENNIAL: artistInsights(kind: BIENNIAL) {
              ...CareerHighlightModalStep_careerHighlight
            }
          }
        }
      }
    `,
  })

  it("renders the career highlights data", () => {
    renderWithRelay(mockResolver)

    expect(screen.getByText("3")).toBeInTheDocument()
    expect(
      screen.getByText("Artists were included in major biennials.")
    ).toBeInTheDocument()

    expect(screen.getByText("Yayoi Kusama")).toBeInTheDocument()
    expect(screen.getByText("Japanese, b. 1929")).toBeInTheDocument()

    expect(screen.getByText("Takashi Murakami")).toBeInTheDocument()
    expect(screen.getByText("Japanese, b. 1962")).toBeInTheDocument()

    expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
    expect(screen.getByText("American, 1928–1987")).toBeInTheDocument()
  })
})

const mockResolver = {
  Me: () => ({
    myCollectionInfo: {
      BIENNIAL: [
        {
          artist: {
            internalID: "artist-id1",
            name: "Yayoi Kusama",
            formattedNationalityAndBirthday: "Japanese, b. 1929",
          },
        },
        {
          artist: {
            internalID: "artist-id2",
            name: "Takashi Murakami",
            formattedNationalityAndBirthday: "Japanese, b. 1962",
          },
        },
        {
          artist: {
            internalID: "artist-id3",
            name: "Andy Warhol",
            formattedNationalityAndBirthday: "American, 1928–1987",
          },
        },
      ],
    },
  }),
}
