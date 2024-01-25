import { ArtworkTopContextBar_Test_Query } from "__generated__/ArtworkTopContextBar_Test_Query.graphql"
import { ArtworkTopContextBarFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBar"
import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { DateTime } from "luxon"

jest.unmock("react-relay")

describe("ArtworkTopContextBar", () => {
  const { getWrapper } = setupTestWrapper<ArtworkTopContextBar_Test_Query>({
    Component: ArtworkTopContextBarFragmentContainer,
    query: graphql`
      query ArtworkTopContextBar_Test_Query @relay_test_operation {
        artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
          ...ArtworkTopContextBar_artwork
        }
      }
    `,
  })

  it("if no in show or auction or fair, render nothing", () => {
    const { wrapper } = getWrapper({
      Artwork: () => ({
        context: null,
      }),
    })

    expect(wrapper.html()).toEqual("")
  })

  describe("sale", () => {
    it("does not render if sale is invalid", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          sale: null,
        }),
      })
      expect(wrapper.html()).toEqual("")
    })

    it("renders a sale banner", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Sale",
            name: "saleName",
            href: "saleHref",
          },
          sale: {
            isBenefit: false,
            isGalleryAuction: false,
            isAuction: true,
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

    it("has correct meta text if auction", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          sale: {
            isAuction: true,
          },
        }),
      })
      expect(wrapper.html()).toContain("In auction")
    })

    it("has correct meta text if not an auction", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          sale: {
            isAuction: false,
          },
        }),
      })
      expect(wrapper.html()).toContain("In sale")
    })

    it("does not render partnerName if benefit or gallery auction", () => {
      const { wrapper } = getWrapper({
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

    it("does not render partnerName if not an auction", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          context: {
            __typename: "Sale",
          },
          sale: {
            isAuction: false,
          },
        }),
        Partner: () => ({
          name: "partnerName",
        }),
      })

      const html = wrapper.html()
      expect(html).not.toContain("partnerHref")
    })

    describe("the auction registration countdown", () => {
      it("does not render by default", () => {
        const { wrapper } = getWrapper({
          Artwork: () => ({
            context: {
              __typename: "Sale",
              name: "saleName",
              href: "saleHref",
            },
            sale: {
              registrationEndsAt: null,
              isRegistrationClosed: false,
            },
          }),
          Partner: () => ({
            name: "partnerName",
          }),
        })

        const text = wrapper.text()

        expect(text).not.toContain("Registration for this auction ends:")
        expect(wrapper.find("Timer").length).toBe(0)
      })

      it("does not render if registration is closed", () => {
        const registrationEndsAt = DateTime.local()
          .plus({ hours: 1 })
          .toString()
        const { wrapper } = getWrapper({
          Artwork: () => ({
            context: {
              __typename: "Sale",
              name: "saleName",
              href: "saleHref",
            },
            sale: {
              registrationEndsAt,
              isRegistrationClosed: true,
            },
          }),
          Partner: () => ({
            name: "partnerName",
          }),
        })

        const text = wrapper.text()

        expect(text).not.toContain("Registration for this auction ends:")
        expect(wrapper.find("Timer").length).toBe(0)
      })

      it("render when sale registration is not closed", () => {
        const registrationEndsAt = DateTime.local()
          .plus({ hours: 1 })
          .toString()
        const { wrapper } = getWrapper({
          Artwork: () => ({
            context: {
              __typename: "Sale",
              name: "saleName",
              href: "saleHref",
            },
            sale: {
              registrationEndsAt,
              isRegistrationClosed: false,
            },
          }),
          Partner: () => ({
            name: "partnerName",
          }),
        })

        const text = wrapper.text()

        expect(text).toContain("Registration for this auction ends:")
        expect(wrapper.find("Timer").length).toBe(1)
      })
    })
  })

  describe("fair", () => {
    it("renders a fair banner", () => {
      const { wrapper } = getWrapper({
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
      const { wrapper } = getWrapper({
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
      expect(wrapper.find("ChevronLeftIcon").length).toBe(1)
      expect(text).toContain("showName")
      expect(html).toContain("showHref")
      expect(text).toContain("In current show")
    })

    it("renders upcoming status", () => {
      const { wrapper } = getWrapper({
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
      const { wrapper } = getWrapper({
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
