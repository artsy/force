import { graphql, RelayEnvironmentProvider } from "react-relay"
import { renderHook } from "@testing-library/react-hooks"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { useCollectorSignals } from "Utils/Hooks/useCollectorSignals"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag" // Adjust the import path
import { createOperationDescriptor } from "relay-runtime"
import useCollectorSignalsArtworksConnectionTestQuery from "__generated__/useCollectorSignalsArtworksConnectionTestQuery.graphql"
import useCollectorSignalsSingleArtworkTestQuery from "__generated__/useCollectorSignalsSingleArtworkTestQuery.graphql"

jest.unmock("react-relay")
jest.mock("react-relay", () => {
  const originalModule = jest.requireActual("react-relay")
  return {
    ...originalModule,
    useFragment: jest.fn((fradmentDefinition, fragmentData) => fragmentData),
  }
})
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))
const mockUseFeatureFlag = useFeatureFlag as jest.Mock

// @ts-expect-error
const ARTWORKS_CONNECTION_QUERY = graphql`
  query useCollectorSignalsArtworksConnectionTestQuery {
    artworksConnection(first: 3) {
      __typename
      ...useCollectorSignals_artworksConnection
    }
    me {
      ...useCollectorSignals_me
    }
  }
`

// @ts-expect-error
const SINGLE_ARTWORK_QUERY = graphql`
  query useCollectorSignalsSingleArtworkTestQuery {
    artwork(id: "artwork-id") {
      ...useCollectorSignals_artwork
    }
    me {
      ...useCollectorSignals_me
    }
  }
`
let mockEnvironment: ReturnType<typeof createMockEnvironment>

const wrapper = ({ children }) => (
  <RelayEnvironmentProvider environment={mockEnvironment}>
    {children}
  </RelayEnvironmentProvider>
)

describe("useCollectorSignals", () => {
  beforeEach(() => {
    mockUseFeatureFlag.mockReturnValue(true)
    mockEnvironment = createMockEnvironment()
  })

  it("should process signals for multiple artworks", () => {
    const operationDescriptor = createOperationDescriptor(
      useCollectorSignalsArtworksConnectionTestQuery,
      {}
    )
    const hookProps = MockPayloadGenerator.generate(operationDescriptor, {
      FilterArtworksConnection: () => ({
        __typename: "FilterArtworksConnection",
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

    const { result } = renderHook(
      () =>
        useCollectorSignals({
          artworksConnection: hookProps.data?.artworksConnection,
          me: hookProps.data?.me,
        }),
      { wrapper }
    )

    expect(result.current["acquireable-with-partner-offer"]).toEqual({
      partnerOffer: expect.objectContaining({
        artworkId: "acquireable-with-partner-offer",
        endAt: "2042-01-01",
      }),
    })
    expect(result.current["not-acquireable"]).toBeUndefined()
    expect(result.current["no-partner-offer"]).toBeUndefined()
  })

  it("should process signals for a single artwork", () => {
    const operationDescriptor = createOperationDescriptor(
      useCollectorSignalsSingleArtworkTestQuery,
      {}
    )
    const hookProps = MockPayloadGenerator.generate(operationDescriptor, {
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

    const { result } = renderHook(
      () =>
        useCollectorSignals({
          artwork: hookProps.data?.artwork,
          me: hookProps.data?.me,
        }),
      { wrapper }
    )

    expect(result.current).toEqual({
      partnerOffer: expect.objectContaining({
        artworkId: "acquireable-with-partner-offer",
        endAt: "2042-01-01",
      }),
    })
  })
})
