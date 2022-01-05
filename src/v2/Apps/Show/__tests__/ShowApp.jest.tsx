import { graphql } from "react-relay"
import { ShowAppFragmentContainer } from "../ShowApp"
import { ShowViewingRoom } from "../Components/ShowViewingRoom"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ShowApp_Test_Query } from "v2/__generated__/ShowApp_Test_Query.graphql"

jest.unmock("react-relay")

jest.mock("v2/Apps/Show/Components/ShowMeta", () => ({
  ShowMetaFragmentContainer: () => null,
}))

jest.mock("v2/Apps/Show/Components/ShowArtworks", () => ({
  ShowArtworksRefetchContainer: () => null,
}))

jest.mock("v2/Apps/Show/Components/ShowInstallShots", () => ({
  ShowInstallShotsFragmentContainer: () => null,
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

const useRouter = jest.spyOn(require("v2/System/Router/useRouter"), "useRouter")

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
    const wrapper = getWrapper({
      Show: () => ({ name: "Example Show" }),
    })
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Show")
  })

  it("renders the appropriate info", () => {
    const wrapper = getWrapper({
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
    const wrapper = getWrapper({
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

  it("do not render navigation banner if have not param", () => {
    const wrapper = getWrapper({
      Show: () => ({
        name: "Example Show",
        fair: { name: "Example Fair", href: "example" },
      }),
    })

    expect(wrapper.find("ShowNavigationBanner").length).toEqual(0)
  })

  it("render navigation baner when redirect from fair page", () => {
    useRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            from_fair: true,
          },
        },
      },
    }))

    const wrapper = getWrapper({
      Show: () => ({
        name: "Example Show",
        fair: { name: "Example Fair", href: "example" },
      }),
    })

    expect(wrapper.find("ShowNavigationBanner").text()).toContain(
      "Back to Example Fair"
    )
  })
})
