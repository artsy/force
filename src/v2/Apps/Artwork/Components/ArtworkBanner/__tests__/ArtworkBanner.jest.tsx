import { ArtworkBanner_Test_Query } from "v2/__generated__/ArtworkBanner_Test_Query.graphql"
import { ArtworkBannerFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkBanner/ArtworkBanner"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

describe("ArtworkBanner", () => {
  const { getWrapper } = setupTestWrapper<ArtworkBanner_Test_Query>({
    Component: ArtworkBannerFragmentContainer,
    query: graphql`
      query ArtworkBanner_Test_Query @relay_test_operation {
        artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
          ...ArtworkBanner_artwork
        }
      }
    `,
  })

  it("if no in show or auction or fair, render nothing", () => {
    const wrapper = getWrapper({
      Artwork: () => ({
        context: null,
      }),
    })

    expect(wrapper.html()).toEqual("")
  })

  describe("sale", () => {
    it("does not render if sale is invalid", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          sale: null,
        }),
      })
      expect(wrapper.html()).toEqual("")
    })

    it("renders a sale banner", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Sale",
            name: "saleName",
            href: "saleHref",
          },
          sale: {
            isBenefit: false,
            isGalleryAuction: false,
          },
        }),
        Partner: () => ({
          name: "partnerName",
        }),
      })

      const html = wrapper.html()
      const text = wrapper.text()
      expect(html).toContain("src")
      expect(html).toContain("saleName")
      expect(html).toContain("saleHref")
      expect(text).toContain("partnerName")
      expect(text).toContain("In auction")
    })

    it("does not render partnerName if benefit or gallery auction", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Sale",
          },
          sale: {
            isBenefit: true,
            isGalleryAuction: true,
          },
        }),
        Partner: () => ({
          name: "partnerName",
        }),
      })

      const html = wrapper.html()
      expect(html).not.toContain("partnerHref")
    })
  })

  describe("fair", () => {
    it("renders a fair banner", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Fair",
            name: "fairName",
            href: "fairHref",
          },
        }),
        Partner: () => ({
          name: "partnerName",
        }),
      })

      const html = wrapper.html()
      const text = wrapper.text()
      expect(html).toContain("src")
      expect(text).toContain("fairName")
      expect(html).toContain("fairHref")
      expect(text).toContain("At fair")
    })
  })

  describe("show", () => {
    it("renders a show banner with default status", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Show",
            name: "showName",
            href: "showHref",
            status: "null",
          },
        }),
        Partner: () => ({
          name: "partnerName",
        }),
      })

      const html = wrapper.html()
      const text = wrapper.text()
      expect(wrapper.find("ChevronIcon").length).toBe(1)
      expect(text).toContain("showName")
      expect(html).toContain("showHref")
      expect(text).toContain("In current show")
    })

    it("renders upcoming status", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Show",
            status: "upcoming",
          },
        }),
      })

      expect(wrapper.text()).toContain("In upcoming show")
    })

    it("renders closed status", () => {
      const wrapper = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Show",
            status: "closed",
          },
        }),
      })

      expect(wrapper.text()).toContain("In past show")
    })
  })
})
