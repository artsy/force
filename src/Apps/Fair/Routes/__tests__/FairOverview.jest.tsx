import { FairOverviewFragmentContainer } from "Apps/Fair/Routes/FairOverview"
import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { FairOverview_Test_Query } from "__generated__/FairOverview_Test_Query.graphql"
import { waitFor } from "@testing-library/react"

const mockJumpTo = jest.fn()

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: mockJumpTo }),
  Jump: () => null,
}))

const { getWrapper } = setupTestWrapper<FairOverview_Test_Query>({
  Component: FairOverviewFragmentContainer,
  query: graphql`
    query FairOverview_Test_Query @relay_test_operation {
      fair(id: "example") {
        ...FairOverview_fair
      }
    }
  `,
})

describe("FairOverview", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    mockJumpTo.mockClear()
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/slug",
          query: {},
        },
      },
    }))
  })

  it("displays the about information", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        about: "This is the about.",
      }),
    })

    expect(wrapper.text()).toContain("This is the about.")
  })

  it("displays Read more if about section contains more than 480 symbols", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum nulla sit amet erat vehicula, ut scelerisque purus interdum. Quisque vel pretium arcu. Phasellus nunc tellus, laoreet eget cursus a, vehicula sit amet erat. Integer porttitor mollis tellus, ultrices euismod dolor aliquet et. Integer placerat turpis vitae ligula dignissim commodo. Vivamus id sapien eros. Vestibulum consequat, lacus eu facilisis auctor, dui odio dignissim arcu, nec tincidunt erat eros sed libero.",
      }),
    })

    expect(wrapper.text()).toContain("Read more")
  })

  it("renders articles if they are present", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        href: "/fair/example",
      }),
      ArticleConnection: () => ({
        totalCount: 7,
      }),
    })

    expect(wrapper.html()).toContain("/fair/example/articles")
  })

  it("does not render the collection when it is missing", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({ marketingCollections: [] }),
    })

    expect(wrapper.text()).not.toContain("Curated Highlights")
    expect(wrapper.text()).not.toContain("Big Artists, Small Sculptures")
  })

  it("does not render articles when they are missing", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        href: "/fair/example",
        articlesConnection: {
          edges: [],
        },
      }),
    })

    expect(wrapper.html()).not.toContain("/fair/example/articles")
  })

  it("renders the collection when it is present", () => {
    const { wrapper } = getWrapper({
      MarketingCollection: () => ({
        title: "Big Artists, Small Sculptures",
      }),
      FilterArtworksConnection: () => ({
        counts: { total: 10 },
      }),
    })

    expect(wrapper.text()).toContain("Curated Highlights")
    expect(wrapper.text()).toContain("Big Artists, Small Sculptures")
    expect(wrapper.text()).toContain("10 works")
  })

  it("displays the timer if fair is open", () => {
    const openTime = new Date()
    openTime.setDate(openTime.getDate() + 1)

    const { wrapper } = getWrapper({
      Fair: () => ({
        endAt: openTime.toISOString(),
      }),
    })

    expect(wrapper.text()).toContain("Closes in:")
  })

  it("don't render the timer if fair closed", () => {
    const closeTime = new Date()
    closeTime.setDate(closeTime.getDate() - 1)

    const { wrapper } = getWrapper({
      Fair: () => ({
        endAt: closeTime.toISOString(),
      }),
    })

    expect(wrapper.text()).not.toContain("Closes in:")
  })

  it("scrollTo should be called if url contains `focused_boots` query param", async () => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/slug",
          query: {
            focused_booths: true,
          },
        },
      },
    }))

    getWrapper()

    await waitFor(() => expect(mockJumpTo).toBeCalled())
  })
})
