import { FairExhibitorsGroup_Test_Query } from "v2/__generated__/FairExhibitorsGroup_Test_Query.graphql"
import { graphql } from "react-relay"
import { FairExhibitorsGroupFragmentContainer } from "../FairExhibitors"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

describe("FairExhibitorsGroup", () => {
  const { getWrapper } = setupTestWrapper<FairExhibitorsGroup_Test_Query>({
    Component: FairExhibitorsGroupFragmentContainer,
    query: graphql`
      query FairExhibitorsGroup_Test_Query($ids: [String!]) {
        partnersConnection(ids: $ids) {
          ...FairExhibitorsGroup_partnersConnection
        }
      }
    `,
    variables: {
      ids: ["partner"],
    },
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders the exhibitors group", async () => {
    const wrapper = getWrapper({
      PartnerConnection: () => ({
        edges: [
          {
            node: {
              internalID: "internalID Assembly",
              name: "Assembly",
              href: "/assembly",
              locations: {
                edges: [],
              },
              profile: {
                icon: {
                  resized: {
                    src:
                      "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=50&height=50&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FW7rDh0zqgqa2Z08z315WEA%2Flarge.jpg",
                    srcSet:
                      "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=50&height=50&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FW7rDh0zqgqa2Z08z315WEA%2Flarge.jpg 1x, https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=100&height=100&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FW7rDh0zqgqa2Z08z315WEA%2Flarge.jpg 2x",
                  },
                },
                image: {
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/DzsorilVkKFF1daUKUygzA/wide.jpg",
                },
              },
            },
          },
          {
            node: {
              internalID:
                "internalID Mocktion Demo Partner Shared Live Mocktion",
              name: "Mocktion Demo Partner Shared Live Mocktion",
              href: "/auction/mocktion-demo-partner-shared-live-mocktion",
              locations: {
                edges: [],
              },
              profile: {
                icon: null,
                image: null,
              },
            },
          },
        ],
      }),
    })

    const exhibitorsGroups = wrapper.find("FairExhibitorCard")

    expect(exhibitorsGroups.length).toBe(2)
  })
})
