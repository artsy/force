import { auctionRoutes_ConfirmBidQuery$rawResponse } from "v2/__generated__/auctionRoutes_ConfirmBidQuery.graphql"
import { auctionRoutes_RegisterQuery$rawResponse } from "v2/__generated__/auctionRoutes_RegisterQuery.graphql"
import { ConfirmBidQueryResponseFixture } from "v2/Apps/Auction/__fixtures__/routes_ConfirmBidQuery"
import { RegisterQueryResponseFixture } from "v2/Apps/Auction/__fixtures__/routes_RegisterQuery"
import { auctionRoutes } from "v2/Apps/Auction/auctionRoutes"
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
      | auctionRoutes_ConfirmBidQuery$rawResponse
      | auctionRoutes_RegisterQuery$rawResponse
  ) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return (await getFarceResult({
      render: createRender({}),
      resolver: new Resolver(environment),
      routeConfig: auctionRoutes,
      url,
    })) as Partial<FarceRedirectResult & FarceElementResult>
  }

  const mockRegisterResolver = (
    data: auctionRoutes_RegisterQuery$rawResponse
  ): auctionRoutes_RegisterQuery$rawResponse => ({
    me: data.me,
    sale: data.sale,
  })

  const mockConfirmBidResolver = (
    data: DeepPartial<auctionRoutes_ConfirmBidQuery$rawResponse> = {}
  ): auctionRoutes_ConfirmBidQuery$rawResponse =>
    deepMerge<
      auctionRoutes_ConfirmBidQuery$rawResponse,
      DeepPartial<auctionRoutes_ConfirmBidQuery$rawResponse>
    >(ConfirmBidQueryResponseFixture, data)

  it("renders the Auction FAQ view", async () => {
    const { status } = await render("/auction-faq", {} as any)

    expect(status).toBe(200)
  })

  describe("Confirm Bid: /:saleId/bid/:artworkId", () => {
    it("does not redirect if the user is qualified to bid in the sale, the sale is open, and the artwork is biddable", async () => {
      const fixture = mockConfirmBidResolver()
      const { redirect, status } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined()
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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(redirect.url).toBe(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(redirect.url).toBe(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/artwork/${fixture.artwork.slug}`
      )
    })

    it("redirects to the login (plus redirectTo of sale artwork bid page) if user is not signed in", async () => {
      const fixture = mockConfirmBidResolver({
        me: null,
      })

      const { redirect } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(redirect.url).toBe(
        "/login?redirectTo=%2Fauction%2Fsaleslug%2Fbid%2Fartworkslug"
      )
    })

    it("redirects to the sale artwork page if user is not registered and registration is closed", async () => {
      const fixture = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              isRegistrationClosed: true,
              registrationStatus: null,
            },
          },
        },
      })
      const { redirect } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(redirect.url).toBe(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/artwork/${fixture.artwork.slug}`
      )
    })

    it("does not redirect if user is not registered but registration is open", async () => {
      const fixture = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              isRegistrationClosed: false,
              registrationStatus: null,
            },
          },
        },
      })
      const { redirect, status } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${fixture.artwork.saleArtwork.sale.slug}/bid/${fixture.artwork.slug}`,
        fixture
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined()
    })
  })

  describe("Register: /auction-registration/:saleId", () => {
    it("does not redirect if a sale is found", async () => {
      const { redirect, status } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver(RegisterQueryResponseFixture)
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined()
    })

    it("also responds to auction-registration2 route", async () => {
      const { status } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction-registration2/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver(RegisterQueryResponseFixture)
      )

      expect(status).toBe(200)
    })

    it("redirects to the auction registration modal if the user has a qualified credit card", async () => {
      const { redirect } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          me: {
            ...RegisterQueryResponseFixture.me,
            hasQualifiedCreditCards: true,
          },
        })
      )

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(redirect.url).toBe(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${RegisterQueryResponseFixture.sale.slug}/registration-flow`
      )
    })

    it("redirects back to the auction if the registration window has closed", async () => {
      const { redirect } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          sale: {
            ...RegisterQueryResponseFixture.sale,
            isRegistrationClosed: true,
          },
        })
      )

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(redirect.url).toBe(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${RegisterQueryResponseFixture.sale.slug}`
      )
    })

    it("redirects to the auction confirm registration route if bidder has already registered", async () => {
      const { redirect } = await render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction-registration/${RegisterQueryResponseFixture.sale.slug}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          sale: {
            ...RegisterQueryResponseFixture.sale,
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            registrationStatus: {
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              ...RegisterQueryResponseFixture.sale.registrationStatus,
              qualifiedForBidding: true,
            },
          },
        })
      )

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(redirect.url).toBe(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        `/auction/${RegisterQueryResponseFixture.sale.slug}/confirm-registration`
      )
    })
  })
})
