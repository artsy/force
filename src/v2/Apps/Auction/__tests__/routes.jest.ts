import { routes_ConfirmBidQueryRawResponse } from "v2/__generated__/routes_ConfirmBidQuery.graphql"
import { routes_RegisterQueryRawResponse } from "v2/__generated__/routes_RegisterQuery.graphql"
import { ConfirmBidQueryResponseFixture } from "v2/Apps/Auction/__fixtures__/routes_ConfirmBidQuery"
import { RegisterQueryResponseFixture } from "v2/Apps/Auction/__fixtures__/routes_RegisterQuery"
import { routes } from "v2/Apps/Auction/routes"
import deepMerge from "deepmerge"
import { createMockNetworkLayer2 } from "v2/DevTools/createMockNetworkLayer"
import { createRender } from "found"
import { Resolver } from "found-relay"
import { FarceElementResult, FarceRedirectResult } from "found/server"
import { getFarceResult } from "found/server"
import { Environment, RecordSource, Store } from "relay-runtime"
import { DeepPartial } from "v2/Utils/typeSupport"

describe("Auction/routes", () => {
  async function render(
    url,
    mockData:
      | routes_ConfirmBidQueryRawResponse
      | routes_RegisterQueryRawResponse
  ) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return (await getFarceResult({
      url,
      routeConfig: routes,
      resolver: new Resolver(environment),
      render: createRender({}),
    })) as Partial<FarceRedirectResult & FarceElementResult>
  }

  const mockRegisterResolver = (
    data: routes_RegisterQueryRawResponse
  ): routes_RegisterQueryRawResponse => ({
    sale: data.sale,
    me: data.me,
  })

  const mockConfirmBidResolver = (
    data: DeepPartial<routes_ConfirmBidQueryRawResponse> = {}
  ): routes_ConfirmBidQueryRawResponse =>
    deepMerge<
      routes_ConfirmBidQueryRawResponse,
      DeepPartial<routes_ConfirmBidQueryRawResponse>
    >(ConfirmBidQueryResponseFixture, data)

  it("renders the Auction FAQ view", async () => {
    const { status } = await render("/auction-faq", {} as any)

    expect(status).toBe(200)
  })

  describe("Confirm Bid: /:saleId/bid/:artworkId", () => {
    it("does not redirect if the user is qualified to bid in the sale, the sale is open, and the artwork is biddable", async () => {
      const fixture = mockConfirmBidResolver()
      const { redirect, status } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined
    })

    it("redirects to confirm registration page if user is registered but not qualified to bid (to remind them)", async () => {
      const fixture = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: { registrationStatus: { qualifiedForBidding: false } },
          },
        },
      })
      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )

      expect(redirect.url).toBe(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/confirm-registration`
      )
    })

    it("redirects to sale artwork page if the sale is closed", async () => {
      const fixture = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              isClosed: true,
            },
          },
        },
      })
      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )
      expect(redirect.url).toBe(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/artwork/${fixture.artwork.slug}`
      )
    })

    it("redirects to the login (plus redirect_uri of sale artwork bid page) if user is not signed in", async () => {
      const fixture = mockConfirmBidResolver({
        me: null,
      })

      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )
      expect(redirect.url).toBe(
        "/log_in?redirect_uri=%2Fauction%2Fsaleslug%2Fbid%2Fartworkslug"
      )
    })

    it("redirects to the sale artwork page if user is not registered and registration is closed", async () => {
      const fixture = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              registrationStatus: null,
              isRegistrationClosed: true,
            },
          },
        },
      })
      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )
      expect(redirect.url).toBe(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/artwork/${fixture.artwork.slug}`
      )
    })

    it("does not redirect if user is not registered but registration is open", async () => {
      const fixture = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              registrationStatus: null,
              isRegistrationClosed: false,
            },
          },
        },
      })
      const { redirect, status } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined
    })
  })

  describe("Register: /auction-registration/:saleId", () => {
    it("does not redirect if a sale is found", async () => {
      const { redirect, status } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver(RegisterQueryResponseFixture)
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined
    })

    it("also responds to auction-registration2 route", async () => {
      const { status } = await render(
        `/auction-registration2/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver(RegisterQueryResponseFixture)
      )

      expect(status).toBe(200)
    })

    it("redirects to the auction registration modal if the user has a qualified credit card", async () => {
      const { redirect } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          me: {
            ...RegisterQueryResponseFixture.me,
            hasQualifiedCreditCards: true,
          },
        })
      )

      expect(redirect.url).toBe(
        `/auction/${RegisterQueryResponseFixture.sale.slug}/registration-flow`
      )
    })

    it("redirects back to the auction if the registration window has closed", async () => {
      const { redirect } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          sale: {
            ...RegisterQueryResponseFixture.sale,
            isRegistrationClosed: true,
          },
        })
      )

      expect(redirect.url).toBe(
        `/auction/${RegisterQueryResponseFixture.sale.slug}`
      )
    })

    it("redirects to the auction confirm registration route if bidder has already registered", async () => {
      const { redirect } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          sale: {
            ...RegisterQueryResponseFixture.sale,
            registrationStatus: {
              ...RegisterQueryResponseFixture.sale.registrationStatus,
              qualifiedForBidding: true,
            },
          },
        })
      )

      expect(redirect.url).toBe(
        `/auction/${RegisterQueryResponseFixture.sale.slug}/confirm-registration`
      )
    })
  })
})
