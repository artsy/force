import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { useCollectorSignals } from "Utils/Hooks/useCollectorSignals"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag" // Adjust the import path
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

describe("useCollectorSignals", () => {
  beforeEach(() => {
    mockUseFeatureFlag.mockReturnValue(true)
  })

  const mockUseFeatureFlag = useFeatureFlag as jest.Mock

  // We are testing a hook, but because we are using a Relay fragment we must
  // create masked fragments with our mocked environment and resolvers
  const TestApp = props => {
    const result = useCollectorSignals(props)
    return <div data-testid="result">{JSON.stringify(result)}</div>
  }

  const getResult = () => JSON.parse(screen.getByTestId("result").textContent!)

  describe("artworksConnection", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: TestApp,
      query: graphql`
        query useCollectorSignalsArtworksConnectionTestQuery {
          artworksConnection(first: 3) {
            ...useCollectorSignals_artworksConnection
          }
          me {
            ...useCollectorSignals_me
          }
        }
      `,
    })

    it("can handle empty arguments", async () => {
      await renderWithRelay({
        FilterArtworksConnection: () => null,
        Me: () => null,
      })

      const result = getResult()

      expect(result).toEqual({})
    })

    it("should process signals for multiple artworks", async () => {
      await renderWithRelay({
        FilterArtworksConnection: () => ({
          edges: [
            {
              node: {
                internalID: "acquireable-with-partner-offer",
                isAcquireable: true,
              },
            },
            { node: { internalID: "not-acquireable", isAcquireable: false } },
            { node: { internalID: "no-partner-offer", isAcquireable: true } },
          ],
        }),
        Me: () => ({
          partnerOffersConnection: {
            edges: [
              {
                node: {
                  artworkId: "acquireable-with-partner-offer",
                  endAt: "2042-01-01",
                },
              },
              { node: { artworkId: "not-acquireable", endAt: "2042-01-01" } },
            ],
          },
        }),
      })

      const result = getResult()

      expect(result["acquireable-with-partner-offer"]).toEqual({
        partnerOffer: {
          artworkId: "acquireable-with-partner-offer",
          endAt: "2042-01-01",
        },
      })
      expect(result["not-acquireable"]).toBeUndefined()
      expect(result["no-partner-offer"]).toBeUndefined()
    })
  })

  describe("single artwork", () => {
    const { renderWithRelay: renderWithSingleArtwork } = setupTestWrapperTL({
      Component: TestApp,
      query: graphql`
        query useCollectorSignalsSingleArtworkTestQuery {
          artwork(id: "artwork-id") {
            ...useCollectorSignals_artwork
          }
          me {
            ...useCollectorSignals_me
          }
        }
      `,
    })

    it("should process signals for a single artwork", async () => {
      await renderWithSingleArtwork({
        Artwork: () => ({
          internalID: "acquireable-with-partner-offer",
          isAcquireable: true,
        }),
        Me: () => ({
          partnerOffersConnection: {
            edges: [
              {
                node: {
                  artworkId: "acquireable-with-partner-offer",
                  endAt: "2042-01-01",
                },
              },
            ],
          },
        }),
      })

      const result = getResult()

      expect(result).toEqual({
        partnerOffer: {
          artworkId: "acquireable-with-partner-offer",
          endAt: "2042-01-01",
        },
      })
    })
  })
})
