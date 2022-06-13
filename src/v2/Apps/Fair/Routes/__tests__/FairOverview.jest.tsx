import { FairOverviewFragmentContainer } from "../../Routes/FairOverview"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { useRouter } from "v2/System/Router/useRouter"
import { FairOverview_Test_Query } from "v2/__generated__/FairOverview_Test_Query.graphql"
import { waitFor } from "@testing-library/react"

const mockScrollTo = jest.fn()

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter")
jest.mock("v2/Utils/Hooks/useScrollTo", () => ({
  useScrollToElement: () => ({ scrollTo: mockScrollTo }),
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
    mockScrollTo.mockClear()
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
    const wrapper = getWrapper({
      Fair: () => ({
        about: "This is the about.",
      }),
    })

    expect(wrapper.text()).toContain("This is the about.")
  })

  it("displays Read more if about section contains more than 480 symbols", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum nulla sit amet erat vehicula, ut scelerisque purus interdum. Quisque vel pretium arcu. Phasellus nunc tellus, laoreet eget cursus a, vehicula sit amet erat. Integer porttitor mollis tellus, ultrices euismod dolor aliquet et. Integer placerat turpis vitae ligula dignissim commodo. Vivamus id sapien eros. Vestibulum consequat, lacus eu facilisis auctor, dui odio dignissim arcu, nec tincidunt erat eros sed libero.",
      }),
    })

    expect(wrapper.text()).toContain("Read more")
  })

  it("renders articles if they are present", () => {
    const wrapper = getWrapper({
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
    const wrapper = getWrapper({
      Fair: () => ({ marketingCollections: [] }),
    })

    expect(wrapper.text()).not.toContain("Curated Highlights")
    expect(wrapper.text()).not.toContain("Big Artists, Small Sculptures")
  })

  it("does not render articles when they are missing", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        href: "/fair/example",
      }),
      ArticleConnection: () => ({
        totalCount: 0,
      }),
    })

    expect(wrapper.html()).not.toContain("/fair/example/articles")
  })

  it("renders the collection when it is present", () => {
    const wrapper = getWrapper({
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
    const wrapper = getWrapper({
      Fair: () => ({
        endAt: "2023-09-19T08:00:00+00:00",
      }),
    })

    expect(wrapper.text()).toContain("Closes in:")
  })

  it("don't render the timer if fair closed", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        endAt: "2020-09-19T08:00:00+00:00",
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

    await waitFor(() => expect(mockScrollTo).toBeCalled())
  })
})
