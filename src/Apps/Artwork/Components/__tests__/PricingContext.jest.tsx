import { screen, fireEvent, waitFor } from "@testing-library/react"
import HelpIcon from "@artsy/icons/HelpIcon"
import { Link } from "@artsy/palette"
import { BarChart } from "@artsy/palette-charts"
import {
  PricingContext,
  PricingContextFragmentContainer,
} from "Apps/Artwork/Components/PricingContext"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type {
  PricingContextTestQuery$data,
  PricingContextQuery$rawResponse,
} from "__generated__/PricingContextTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
// eslint-disable-next-line no-restricted-imports
import Waypoint from "react-waypoint"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ children }) => children,
  }
})

// Mock Waypoint to capture onEnter callback
jest.mock("react-waypoint", () => ({
  __esModule: true,
  default: ({ onEnter, children }: any) => {
    // Expose onEnter callback via data attribute
    return (
      <div data-testid="waypoint" onClick={onEnter}>
        {children}
      </div>
    )
  },
}))

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
const mockPricingContext: PricingContextQuery$rawResponse["artwork"]["pricingContext"] =
  {
    appliedFiltersDisplay: "Price ranges of small mocks by David Sheldrick",
    appliedFilters: {
      category: "PAINTING",
      dimension: "SMALL",
    },
    bins: [
      {
        maxPrice: "$88",
        maxPriceCents: 8855,
        minPrice: "$9",
        minPriceCents: 900,
        numArtworks: 67,
      },
      {
        maxPrice: "$168",
        maxPriceCents: 16810,
        minPrice: "$88",
        minPriceCents: 8855,
        numArtworks: 1,
      },
      {
        maxPrice: "$247",
        maxPriceCents: 24765,
        minPrice: "$168",
        minPriceCents: 16810,
        numArtworks: 0,
      },
      {
        maxPrice: "$327",
        maxPriceCents: 32720,
        minPrice: "$247",
        minPriceCents: 24765,
        numArtworks: 17,
      },
    ],
  }

const mockArtwork: PricingContextQuery$rawResponse["artwork"] = {
  artists: [{ id: "asfwef", slug: "andy-warhol" }],
  category: "Photography",
  id: "abc124",
  listPrice: {
    __typename: "Money",
    minor: 23455,
  },
  pricingContext: mockPricingContext,
}

describe("PricingContext", () => {
  const { renderWithRelay } = setupTestWrapperTL<PricingContextTestQuery$data>({
    Component: (props: PricingContextTestQuery$data) => (
      <div>
        <MockBoot>
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          <PricingContextFragmentContainer {...props} />
        </MockBoot>
      </div>
    ),
    query: graphql`
      query PricingContextJestQuery @raw_response_type @relay_test_operation {
        artwork(id: "unused") {
          ...PricingContext_artwork
        }
      }
    `,
  })

  it("renders if there is data present", async () => {
    renderWithRelay({
      Artwork: () => mockArtwork,
    })

    await waitFor(() => {
      expect(
        screen.getByText("Browse works in this category"),
      ).toBeInTheDocument()
      expect(
        screen.getByText("Price ranges of small mocks by David Sheldrick"),
      ).toBeInTheDocument()
    })
  })

  it("renders as null if no data present", async () => {
    renderWithRelay({
      Artwork: () => ({
        ...mockArtwork,
        pricingContext: null,
      }),
    })

    await waitFor(() => {
      expect(
        screen.queryByText("Price ranges of small mocks by David Sheldrick"),
      ).not.toBeInTheDocument()
    })
  })

  it("renders pricing context question mark icon and informational modal", async () => {
    renderWithRelay({
      Artwork: () => mockArtwork,
    })

    await waitFor(() => {
      // Find the help icon button
      const helpButton = screen.getByLabelText(/Learn more about price ranges/i)
      expect(helpButton).toBeInTheDocument()
    })

    const helpButton = screen.getByLabelText(/Learn more about price ranges/i)
    fireEvent.click(helpButton)

    await flushPromiseQueue()

    expect(
      screen.getByText(
        /This feature aims to provide insight into the range of prices/,
      ),
    ).toBeInTheDocument()
  })

  it("displays $0 as the minimum price label if the minimum price is null", async () => {
    renderWithRelay({
      Artwork: () => mockArtwork,
    })

    await waitFor(() => {
      expect(screen.queryByText("null")).not.toBeInTheDocument()
      expect(screen.getByText(/\$0/)).toBeInTheDocument()
    })
  })

  it("displays '1 work' not '0 works' in highlight label if there are zero artworks for the highlighted bin", async () => {
    renderWithRelay({
      Artwork: () => mockArtwork,
    })

    await waitFor(() => {
      // Find bars by their data-testid or other attributes
      const bars = screen.getAllByTestId(/bar-/i)
      expect(bars.length).toBeGreaterThan(2)
    })

    const bars = screen.getAllByTestId(/bar-/i)
    fireEvent.mouseEnter(bars[2])

    expect(screen.queryByText("0 works")).not.toBeInTheDocument()
    expect(screen.getByText(/1 work/)).toBeInTheDocument()
  })

  it("displays 'work' singular not 'works' plural in label when there is only 1 artwork in a bin", async () => {
    renderWithRelay({
      Artwork: () => mockArtwork,
    })

    await waitFor(() => {
      const bars = screen.getAllByTestId(/bar-/i)
      expect(bars.length).toBeGreaterThan(1)
    })

    const bars = screen.getAllByTestId(/bar-/i)
    fireEvent.mouseEnter(bars[1])

    expect(screen.queryByText("1 works")).not.toBeInTheDocument()
    expect(screen.getByText(/1 work/)).toBeInTheDocument()
  })

  it("uses the max when list price is a range", async () => {
    renderWithRelay({
      Artwork: () => ({
        ...mockArtwork,
        listPrice: {
          __typename: "PriceRange",
          minPrice: {
            minor: 15500,
          },
          maxPrice: {
            minor: 25500,
          },
        },
      }),
    })

    await waitFor(() => {
      expect(screen.getByText(/\$247\+/)).toBeInTheDocument()
      expect(screen.getByText(/This work/)).toBeInTheDocument()
    })
  })

  it("Puts the artwork in the first bin when the price is smaller than the first bin's min price", async () => {
    renderWithRelay({
      Artwork: () => ({
        ...mockArtwork,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        pricingContext: {
          ...mockArtwork.pricingContext,
          bins: [
            {
              maxPrice: "$247",
              maxPriceCents: 24765,
              minPrice: "$168",
              minPriceCents: 16810,
              numArtworks: 0,
            },
            {
              maxPrice: "$327",
              maxPriceCents: 32720,
              minPrice: "$247",
              minPriceCents: 24765,
              numArtworks: 17,
            },
          ],
        },
        listPrice: {
          __typename: "PriceRange",
          minPrice: {
            minor: 15500,
          },
          maxPrice: {
            minor: 15500,
          },
        },
      }),
    })

    await waitFor(() => {
      // Check that the first bin contains the expected label
      expect(screen.getByText(/\$0–\$247/)).toBeInTheDocument()
    })
  })

  it("Puts the artwork in the last bin when the price is larger than the last bin's max price", async () => {
    renderWithRelay({
      Artwork: () => ({
        ...mockArtwork,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        pricingContext: {
          ...mockArtwork.pricingContext,
          bins: [
            {
              maxPrice: "$247",
              maxPriceCents: 24765,
              minPrice: "$168",
              minPriceCents: 16810,
              numArtworks: 17,
            },
            {
              maxPrice: "$327",
              maxPriceCents: 32720,
              minPrice: "$247",
              minPriceCents: 24765,
              numArtworks: 0,
            },
          ],
        },
        listPrice: {
          __typename: "PriceRange",
          minPrice: {
            minor: 32721,
          },
          maxPrice: {
            minor: 32721,
          },
        },
      }),
    })

    await waitFor(() => {
      // Check that the last bin contains the expected label
      expect(screen.getByText(/\$247\+/)).toBeInTheDocument()
    })
  })

  describe("Analytics", () => {
    const mockUseTracking = useTracking as jest.Mock
    const trackEvent = jest.fn()

    beforeEach(() => {
      mockUseTracking.mockImplementation(() => ({ trackEvent }))
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("Tracks impressions", async () => {
      const env = createMockEnvironment()
      const { container } = renderWithRelay(
        {
          Artwork: () => mockArtwork,
        },
        {},
        env,
      )

      await waitFor(() => {
        expect(screen.getByTestId("waypoint")).toBeInTheDocument()
      })

      // Trigger waypoint onEnter
      fireEvent.click(screen.getByTestId("waypoint"))

      expect(trackEvent).toBeCalledWith({
        action_type: "Impression",
        context_module: "Price Context",
        subject: "Histogram Bar",
        type: "Chart",
        flow: "Artwork Price Context",
      })
    })

    it("tracks hovers on histogram bars", async () => {
      renderWithRelay({
        Artwork: () => mockArtwork,
      })

      await waitFor(() => {
        const bars = screen.getAllByTestId(/bar-/i)
        expect(bars.length).toBeGreaterThan(0)
      })

      const bars = screen.getAllByTestId(/bar-/i)
      fireEvent.mouseOver(bars[0])

      expect(trackEvent).toBeCalledWith({
        context_module: "Price Context",
        action_type: "Hover",
        subject: "Histogram Bar",
        flow: "Artwork Price Context",
        type: "Chart",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    it("tracks clicks on 'Browse works in this category' link", async () => {
      renderWithRelay({
        Artwork: () => mockArtwork,
      })

      await waitFor(() => {
        expect(
          screen.getByText("Browse works in this category"),
        ).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText("Browse works in this category"))

      expect(trackEvent).toBeCalledWith({
        context_module: "Price Context",
        action_type: "Click",
        subject: "Browse works in this category",
        flow: "Artwork Price Context",
        type: "Chart",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })
  })
})
