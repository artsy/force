import { FairOverviewFragmentContainer } from "../../Routes/FairOverview"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairOverviewFragmentContainer,
  query: graphql`
    query FairOverview_Test_Query {
      fair(id: "example") {
        ...FairOverview_fair
      }
    }
  `,
})

describe("FairOverview", () => {
  it("displays basic information about the fair", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        summary: "This is the summary.",
      }),
    })

    expect(wrapper.text()).toContain("This is the summary.")
  })

  it("displays both the about content and summary", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        about: "This is the about.",
        summary: "This is the summary.",
      }),
    })

    expect(wrapper.text()).toContain("This is the about.")
    expect(wrapper.text()).toContain("This is the summary.")
  })

  it("renders articles if they are present", () => {
    const wrapper = getWrapper({
      Article: () => ({
        title: "Miart 2020",
      }),
    })

    expect(wrapper.text()).toContain("Miart 2020")
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
      ArticleConnection: () => ({ edges: [] }),
    })

    expect(wrapper.text()).not.toContain("Miart 2020")
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
})
