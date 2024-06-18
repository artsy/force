import { FairExhibitors_Test_Query } from "__generated__/FairExhibitors_Test_Query.graphql"
import { graphql } from "react-relay"
import { FairExhibitorsFragmentContainer } from "Apps/Fair/Routes/FairExhibitors"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: "",
      },
    },
  }),
}))

describe("FairExhibitors", () => {
  const { renderWithRelay } = setupTestWrapperTL<FairExhibitors_Test_Query>({
    Component: FairExhibitorsFragmentContainer,
    query: graphql`
      query FairExhibitors_Test_Query($id: String!) @relay_test_operation {
        fair(id: $id) @principalField {
          ...FairExhibitors_fair
        }
      }
    `,
    variables: { id: "fair" },
  })

  it("renders the exhibitors group", () => {
    renderWithRelay(FAIR_FIXTURE)

    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
    expect(screen.getByText("D")).toBeInTheDocument()
  })

  it("renders partners", () => {
    renderWithRelay(FAIR_FIXTURE)

    expect(screen.getByText("Partner 1")).toBeInTheDocument()
    expect(screen.getByText("Partner 3")).toBeInTheDocument()
    expect(screen.getByText("Partner 4")).toBeInTheDocument()
  })
})

const FAIR_FIXTURE = {
  Fair: () => ({
    exhibitorsGroupedByName: [
      {
        letter: "A",
        exhibitors: [
          {
            partner: {
              internalID: "551db9a6726169422f4d0600",
              name: "Partner 1",
              cities: [],
            },
          },
          {
            partner: {
              internalID: "5a2025c78b0c144e0bba965e",
              name: "Partner 2",
              cities: [],
            },
          },
        ],
      },
      {
        letter: "C",
        exhibitors: [
          {
            partner: {
              internalID: "5266d825a09a67eac50001f1",
              name: "Partner 3",
              cities: [],
            },
          },
        ],
      },
      {
        letter: "D",
        exhibitors: [
          {
            partner: {
              internalID: "5694406501925b322c00010b",
              name: "Partner 4",
              cities: [],
            },
          },
        ],
      },
    ],
  }),
}
