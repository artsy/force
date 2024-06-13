import { graphql } from "react-relay"
import { ShowAppFragmentContainer } from "Apps/Show/ShowApp"
import { ShowViewingRoom } from "Apps/Show/Components/ShowViewingRoom"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ShowApp_Test_Query } from "__generated__/ShowApp_Test_Query.graphql"

jest.unmock("react-relay")

jest.mock("Apps/Show/Components/ShowMeta", () => ({
  ShowMetaFragmentContainer: () => null,
}))

jest.mock("Apps/Show/Components/ShowArtworks", () => ({
  ShowArtworksRefetchContainer: () => null,
}))

jest.mock("Apps/Show/Components/ShowInstallShots", () => ({
  ShowInstallShotsFragmentContainer: () => null,
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

const { getWrapper } = setupTestWrapper<ShowApp_Test_Query>({
  Component: ShowAppFragmentContainer,
  query: graphql`
    query ShowApp_Test_Query @relay_test_operation {
      show(id: "xxx") {
        ...ShowApp_show
      }
    }
  `,
})

describe("ShowApp", () => {
  it("renders the title", () => {
    const { wrapper } = getWrapper({
      Show: () => ({ name: "Example Show" }),
    })
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Show")
  })

  it("renders the appropriate info", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        name: "Example Partner",
      }),
      Show: () => ({
        href: "/show/example-href",
        metaDescription: "Information about the show",
        pressRelease: "Press Release",
      }),
    })

    expect(wrapper.text()).toContain("Information about the show")
    expect(wrapper.text()).toContain("Example Partner")

    // If a press release exists, link to the more info page
    const moreInfoLink = wrapper
      .find("a")
      .findWhere(node => node.text() === "More info")
      .first()
    expect(moreInfoLink.prop("href")).toEqual("/show/example-href/info")
  })

  it("renders a viewing room if there are any", () => {
    const { wrapper } = getWrapper({
      Show: () => ({
        viewingRoomsConnection: {
          edges: [
            {
              __typename: "ViewingRoom",
            },
          ],
        },
      }),
    })

    expect(wrapper.find(ShowViewingRoom)).toHaveLength(1)
  })

  it("does not render `Back to Fair` banner by default", () => {
    const { wrapper } = getWrapper({
      Show: () => ({
        isFairBooth: false,
        name: "Example Show",
        fair: { name: "Example Fair", href: "example", hasFullFeature: true },
      }),
    })

    expect(wrapper.find("BackToFairBanner").length).toEqual(0)
  })

  it("does not render `Back to Fair` banner without full featured fair", () => {
    const { wrapper } = getWrapper({
      Show: () => ({
        isFairBooth: true,
        name: "Example Show",
        fair: { name: "Example Fair", href: "example", hasFullFeature: false },
      }),
    })

    expect(wrapper.find("BackToFairBanner").length).toEqual(0)
  })

  it("render `Back to Fair` banner on fair booth pages", () => {
    const { wrapper } = getWrapper({
      Show: () => ({
        isFairBooth: true,
        name: "Example Show",
        fair: { name: "Example Fair", href: "example", hasFullFeature: true },
      }),
    })

    expect(wrapper.find("BackToFairBanner").text()).toContain(
      "Back to Example Fair"
    )
  })
})
