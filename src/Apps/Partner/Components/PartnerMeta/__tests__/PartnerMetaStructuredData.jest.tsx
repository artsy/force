import { PartnerMetaStructuredData } from "Apps/Partner/Components/PartnerMeta/PartnerMetaStructuredData"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Utils/getENV", () => ({
  getENV: (key: string) => {
    if (key === "APP_URL") return "https://www.artsy.net"
    return undefined
  },
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ partner }: any) => {
    return (
      <HeadProvider>
        <PartnerMetaStructuredData partner={partner} />
      </HeadProvider>
    )
  },
  query: graphql`
    query PartnerMetaStructuredData_Test_Query @relay_test_operation {
      partner(id: "example") {
        ...PartnerMetaStructuredData_partner
      }
    }
  `,
})

const getStructuredData = () => {
  const tag = document.querySelector("script[type='application/ld+json']")
  return tag ? JSON.parse(tag.textContent || "{}") : null
}

describe("PartnerMetaStructuredData", () => {
  describe("makesOffer", () => {
    it("includes makesOffer with artwork node references", () => {
      renderWithRelay({
        Partner: () => ({
          href: "/partner/cerbera-gallery",
          filterArtworksConnection: {
            edges: [
              { node: { href: "/artwork/banksy-gangsta-rat" } },
              { node: { href: "/artwork/shepard-fairey-future-is-equal" } },
            ],
          },
        }),
      })

      const data = getStructuredData()
      expect(data.makesOffer).toEqual([
        {
          "@type": "Offer",
          itemOffered: {
            "@id":
              "https://www.artsy.net/artwork/banksy-gangsta-rat#visual-artwork",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@id":
              "https://www.artsy.net/artwork/shepard-fairey-future-is-equal#visual-artwork",
          },
        },
      ])
    })

    it("omits makesOffer when there are no artworks", () => {
      renderWithRelay({
        Partner: () => ({
          href: "/partner/cerbera-gallery",
          filterArtworksConnection: {
            edges: [],
          },
        }),
      })

      const data = getStructuredData()
      expect(data.makesOffer).toBeUndefined()
    })
  })
})
