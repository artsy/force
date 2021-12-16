import { FairExhibitors_Test_Query } from "v2/__generated__/FairExhibitors_Test_Query.graphql"
import { graphql } from "react-relay"
import { FairExhibitorsFragmentContainer } from "../FairExhibitors"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: "",
      },
    },
  }),
}))

describe("FairExhibitors", () => {
  const { getWrapper } = setupTestWrapper<FairExhibitors_Test_Query>({
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the exhibitors group", () => {
    const wrapper = getWrapper(FAIR_FIXTURE)

    const exhibitorsGroups = wrapper.find("FairExhibitorsGroup")

    expect(exhibitorsGroups.length).toBe(3)
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
              cities: [],
            },
          },
          {
            partner: {
              internalID: "5a2025c78b0c144e0bba965e",
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
              cities: [],
            },
          },
        ],
      },
    ],
  }),
}
