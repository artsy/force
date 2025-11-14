import type { default as Arta } from "@artaio/arta-browser"
import type ArtaEstimate from "@artaio/arta-browser/dist/estimate"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  ArtsyShippingEstimate,
  estimateRequestBodyForArtwork,
} from "Components/ArtsyShippingEstimate"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtsyShippingEstimate_Test_Query } from "__generated__/ArtsyShippingEstimate_Test_Query.graphql"
import type { ArtsyShippingEstimate_artwork$data } from "__generated__/ArtsyShippingEstimate_artwork.graphql"
import { useEffect, useState } from "react"

import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn((() => "mock-api-key") as any),
}))

let mockArtaEstimate: ArtaEstimate

beforeEach(() => {
  mockArtaEstimate = {
    open: jest.fn(),
    close: jest.fn(),
    isReady: true,
    isOpen: false,
    validate: jest.fn(() => Promise.resolve(undefined)),
  } as unknown as ArtaEstimate
})

const mockArtaModule: typeof Arta = {
  init: jest.fn(),
  estimate: jest.fn(() => mockArtaEstimate),
} as unknown as typeof Arta

jest.mock("Utils/Hooks/useLoadScript", () => {
  return {
    useLoadScript: jest.fn(({ onReady }) => {
      useEffect(() => {
        ;(window as any).Arta = mockArtaModule
        onReady()
      }, [onReady])
    }),
  }
})

const validArtworkData = {
  depthCm: null,
  diameterCm: null,
  framedHeight: null,
  framedWidth: null,
  framedDepth: null,
  framedDiameter: null,
  framedMetric: "cm",
  widthCm: 100,
  heightCm: 100,
  isFramed: false,
  listPrice: {
    major: 1000,
  },
  mediumType: {
    name: "Painting",
  },
  priceCurrency: "USD",
  shippingOrigin: "New York, USA",
  shippingWeight: 20,
  shippingWeightMetric: "lb",
} as ArtsyShippingEstimate_artwork$data

const TestWrapper = ({ artwork }) => {
  const [show, setShow] = useState(true)

  return (
    <div>
      {show ? (
        <ArtsyShippingEstimate artwork={artwork} />
      ) : (
        <div>Unmounted</div>
      )}
      <div>
        <button type="button" onClick={() => setShow(!show)}>
          Toggle
        </button>
      </div>
    </div>
  )
}

const { renderWithRelay } =
  setupTestWrapperTL<ArtsyShippingEstimate_Test_Query>({
    Component: TestWrapper,
    query: graphql`
      query ArtsyShippingEstimate_Test_Query @relay_test_operation {
        artwork(id: "example") {
          ...ArtsyShippingEstimate_artwork
        }
      }
    `,
  })

describe("ArtsyShippingEstimate", () => {
  describe("feature flag disabled", () => {
    it("does not render the widget", async () => {
      renderWithRelay({
        Artwork: () => ({
          ...validArtworkData,
        }),
      })

      await waitFor(() => {
        expect(screen.queryByText("Unmounted")).not.toBeInTheDocument()
        expect(screen.queryByTestId("loaded-no-widget")).not.toBeInTheDocument()
        expect(
          screen.queryByText("Estimate Shipping Cost"),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("with an artwork that cannot be estimated", () => {
    it("does not render the widget if the shippingOrigin is missing a city", async () => {
      renderWithRelay({
        Artwork: () => ({
          ...validArtworkData,
          shippingOrigin: "USA",
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("loaded-no-widget")).toBeInTheDocument()
      })
    })

    it("does not render the widget if the artwork is missing enough dimensions info", async () => {
      renderWithRelay({
        Artwork: () => ({
          ...validArtworkData,
          widthCm: null,
          diameterCm: null,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("loaded-no-widget")).toBeInTheDocument()
      })
    })
  })

  describe("with a valid artwork", () => {
    const mockArtworkData = { ...validArtworkData }

    it("renders the widget as a link to open an estimate", async () => {
      renderWithRelay({
        Artwork: () => mockArtworkData,
      })

      await waitFor(() => {
        expect(screen.getByText("Estimate Shipping Cost")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByText("Estimate Shipping Cost"))
      expect(mockArtaEstimate.open).toHaveBeenCalledTimes(1)
    })

    it("closes the widget when unmounted", async () => {
      renderWithRelay({
        Artwork: () => mockArtworkData,
      })

      await waitFor(async () => {
        await userEvent.click(screen.getByText("Estimate Shipping Cost"))
      })

      expect(mockArtaEstimate.open).toHaveBeenCalledTimes(1)

      // This would be set by the library
      mockArtaEstimate.isOpen = true

      await userEvent.click(screen.getByText("Toggle"))
      await waitFor(() => {
        expect(mockArtaEstimate.close).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("estimateRequestBodyForArtwork()", () => {
    it("sends the correct basic request params", async () => {
      expect(
        estimateRequestBodyForArtwork({
          ...validArtworkData,
          priceCurrency: "GBP",
        }),
      ).toEqual(
        expect.objectContaining({
          additional_services: ["signature_delivery"],
          currency: "GBP",
          insurance: "arta_transit_insurance",
          preferred_quote_types: ["self_ship", "parcel", "select", "premium"],
          origin: {
            city: "New York",
            country: "USA",
            region: "",
          },
        }),
      )
    })

    describe("with an artwork with a state", () => {
      it("sends the correct request params", () => {
        expect(
          estimateRequestBodyForArtwork({
            ...validArtworkData,
            shippingOrigin: "New York, NY, USA",
          }),
        ).toEqual(
          expect.objectContaining({
            origin: {
              city: "New York",
              country: "USA",
              region: "NY",
            },
          }),
        )
      })
    })

    it("returns null if artwork is missing required dimensions", () => {
      expect(
        estimateRequestBodyForArtwork({
          ...validArtworkData,
          isFramed: false,
          widthCm: null,
          diameterCm: null,
        }),
      ).toBeNull()
    })

    it("returns null if artwork is missing required price info", () => {
      expect(
        estimateRequestBodyForArtwork({
          ...validArtworkData,
          listPrice: {
            minPrice: null,
          },
        }),
      ).toBeNull()

      expect(
        estimateRequestBodyForArtwork({
          ...validArtworkData,
          priceCurrency: null,
        }),
      ).toBeNull()
    })
  })
})
