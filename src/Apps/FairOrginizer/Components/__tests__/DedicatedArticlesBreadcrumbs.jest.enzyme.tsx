import { graphql } from "react-relay"
import { DedicatedArticlesBreadcrumbs_Test_Query } from "__generated__/DedicatedArticlesBreadcrumbs_Test_Query.graphql"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { DedicatedArticlesBreadcrumbsFragmentContainer } from "Apps/FairOrginizer/Components/DedicatedArticlesBreadcrumbs"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<
  DedicatedArticlesBreadcrumbs_Test_Query
>({
  Component: props => {
    return <DedicatedArticlesBreadcrumbsFragmentContainer {...(props as any)} />
  },
  query: graphql`
    query DedicatedArticlesBreadcrumbs_Test_Query @relay_test_operation {
      fairOrganizer(id: "example") {
        ...DedicatedArticlesBreadcrumbs_fairOrganizer
      }
    }
  `,
})

describe("DedicatedArticlesBreadcrumbs", () => {
  it("renders proper router link", () => {
    const { wrapper } = getWrapper({
      FairOrganizer: () => ({ slug: "organizer" }),
    })

    expect(wrapper.find("RouterLink").length).toBe(1)
    expect(wrapper.find("RouterLink").prop("to")).toEqual(
      "/fair-organizer/organizer"
    )
  })

  it("displays breadcrumbs item containing fair organizer name", () => {
    const { wrapper } = getWrapper({
      FairOrganizer: () => ({ name: "Organizer" }),
    })

    expect(wrapper.text()).toContain("Explore Organizer on Artsy")
  })

  it("displays arrow left icon", () => {
    const { wrapper } = getWrapper({})

    expect(wrapper.find("ChevronLeftIcon").length).toBe(1)
  })

  it("displays image", () => {
    const { wrapper } = getWrapper({
      FairOrganizer: () => ({
        profile: {
          image: { url: "some-src" },
        },
      }),
    })

    expect(wrapper.find("Image").length).toBe(1)
    expect(wrapper.find("Image").prop("src")).toContain("some-src")
  })

  it("displays title containing fair organizer name", () => {
    const { wrapper } = getWrapper({
      FairOrganizer: () => ({ name: "Organizer" }),
    })

    expect(wrapper.text()).toContain("Explore Organizer on Artsy")
  })
})
