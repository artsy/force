import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeArtworkModuleContextFragmentContainer } from "../Components/HomeArtworkModuleContext"
import { HomeArtworkModuleContext_Test_Query } from "v2/__generated__/HomeArtworkModuleContext_Test_Query.graphql"

jest.unmock("react-relay")

let title = "Example"

const { getWrapper } = setupTestWrapper<HomeArtworkModuleContext_Test_Query>({
  Component: props => {
    const context = props.homePage!.artworkModules![0]!.context!
    return (
      <HomeArtworkModuleContextFragmentContainer
        title={title}
        context={context}
      />
    )
  },
  query: graphql`
    query HomeArtworkModuleContext_Test_Query {
      homePage {
        artworkModules {
          context {
            ...HomeArtworkModuleContext_context
          }
        }
      }
    }
  `,
})

describe("HomeArtworkModuleContext", () => {
  describe("Gene", () => {
    it("renders correctly", () => {
      title = "Example Gene"

      const wrapper = getWrapper({
        HomePageArtworkModule: () => ({
          context: {
            __typename: "Gene",
            href: "/gene/example-gene",
          },
        }),
      })

      expect(wrapper.text()).toContain("Example Gene")
      expect(wrapper.text()).toContain("View All")
      expect(wrapper.html()).toContain("/gene/example-gene")
    })
  })

  describe("Fair", () => {
    it("renders correctly", () => {
      title = "Example Fair"

      const wrapper = getWrapper({
        HomePageArtworkModule: () => ({
          context: {
            __typename: "Fair",
            href: "/fair/example-fair",
            exhibitionPeriod: "June 9–12",
          },
        }),
      })

      expect(wrapper.text()).toContain("Example Fair")
      expect(wrapper.text()).toContain("June 9–12")
      expect(wrapper.text()).toContain("View All")
      expect(wrapper.html()).toContain("/fair/example-fair")
    })
  })

  describe("Sale", () => {
    it("renders correctly", () => {
      title = "Example Sale"

      const wrapper = getWrapper({
        HomePageArtworkModule: () => ({
          context: {
            __typename: "Sale",
            href: "/sale/example-sale",
          },
        }),
      })

      expect(wrapper.text()).toContain("Example Sale")
      expect(wrapper.text()).toContain("Live bidding starts")
      expect(wrapper.text()).toContain("View All")
      expect(wrapper.html()).toContain("/sale/example-sale")
    })
  })

  describe("HomePageRelatedArtistArtworkModule", () => {
    it("renders correctly", () => {
      title = "Example"

      const wrapper = getWrapper({
        HomePageArtworkModule: () => ({
          context: {
            __typename: "HomePageRelatedArtistArtworkModule",
            artist: {
              name: "New Artist",
              href: "/artist/new-artist",
            },
            basedOn: {
              name: "Familiar Artist",
              href: "/artist/familiar-artist",
            },
          },
        }),
      })

      expect(wrapper.text()).toContain("Based on Familiar Artist")
      expect(wrapper.text()).toContain("New Artist")
      expect(wrapper.html()).toContain("/artist/familiar-artist")
      expect(wrapper.html()).toContain("/artist/new-artist")
    })
  })

  describe("FollowArtists", () => {
    it("renders correctly", () => {
      title = "New Works By Artists You Follow"

      const wrapper = getWrapper({
        HomePageArtworkModule: () => ({
          context: {
            __typename: "FollowArtists",
            artists: [
              { href: "/artist/example-1", name: "First Example" },
              { href: "/artist/example-2", name: "Second Example" },
              { href: "/artist/example-3", name: "Third Example" },
            ],
          },
        }),
      })

      expect(wrapper.text()).toContain("New Works By Artists You Follow")
      expect(wrapper.text()).toContain("First Example")
      expect(wrapper.html()).toContain("/artist/example-1")
      expect(wrapper.text()).toContain("Second Example")
      expect(wrapper.html()).toContain("/artist/example-2")
      expect(wrapper.text()).toContain("Third Example")
      expect(wrapper.html()).toContain("/artist/example-3")
    })
  })
})
