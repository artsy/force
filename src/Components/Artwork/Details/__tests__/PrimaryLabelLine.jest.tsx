import { PrimaryLabelLineQueryRenderer } from "Components/Artwork/Details/PrimaryLabelLine"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { act, render, screen } from "@testing-library/react"
import { DateTime } from "luxon"
import { createRef } from "react"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"

jest.unmock("react-relay")

jest.mock("System/Hooks/useSystemContext")
jest.mock("Components/ArtworkGrid/ArtworkGridContext")
jest.mock("Utils/Hooks/useDidMount")
jest.mock("Utils/Hooks/useIntersectionObserver")

describe("PrimaryLabelLine", () => {
  const mockuseDidMount = useDidMount as jest.Mock
  const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  const mockUseArtworkGridContext = useArtworkGridContext as jest.Mock
  let mockEnvironment

  beforeEach(() => {
    mockuseDidMount.mockImplementation(() => true)

    let called = false
    mockUseIntersectionObserver.mockImplementation(({ onIntersection }) => {
      if (!called) {
        onIntersection()
        called = true
      }
      return { ref: createRef() }
    })

    mockEnvironment = createMockEnvironment()
    mockUseSystemContext.mockImplementation(() => {
      return {
        relayEnvironment: mockEnvironment,
      }
    })
    mockUseArtworkGridContext.mockImplementation(() => {
      return {}
    })
  })

  describe("before fetching partner offer", () => {
    it("shows increased interest when it's passed in as the label", () => {
      render(
        <PrimaryLabelLineQueryRenderer
          id="opaque-internal-id"
          label="INCREASED_INTEREST"
        />,
      )

      expect(screen.getByText("Increased Interest")).toBeInTheDocument()
    })

    it("shows curators' pick when it's passed in as the label", () => {
      render(
        <PrimaryLabelLineQueryRenderer
          id="opaque-internal-id"
          label="CURATORS_PICK"
        />,
      )

      expect(screen.getByText("Curators’ Pick")).toBeInTheDocument()
    })

    it("hides the increased interest label when under hide signals context", () => {
      mockUseArtworkGridContext.mockImplementation(() => {
        return { hideSignals: true }
      })

      const { container } = render(
        <PrimaryLabelLineQueryRenderer
          id="opaque-internal-id"
          label="INCREASED_INTEREST"
        />,
      )

      expect(container).toBeEmptyDOMElement()
    })

    it("hides the curators' pick label when under hide signals context", () => {
      mockUseArtworkGridContext.mockImplementation(() => {
        return { hideSignals: true }
      })

      const { container } = render(
        <PrimaryLabelLineQueryRenderer
          id="opaque-internal-id"
          label="CURATORS_PICK"
        />,
      )

      expect(container).toBeEmptyDOMElement()
    })
  })

  describe("after fetching null partner offer", () => {
    const renderPrimaryLabelLine = label => {
      const { container } = render(
        <PrimaryLabelLineQueryRenderer id="opaque-internal-id" label={label} />,
      )

      act(() => {
        mockEnvironment.mock.resolveMostRecentOperation(operation =>
          MockPayloadGenerator.generate(operation, {
            Artwork: () => ({
              collectorSignals: {
                partnerOffer: null,
              },
            }),
          }),
        )
      })

      return container
    }

    it("shows increased interest when it's passed in as the label", () => {
      renderPrimaryLabelLine("INCREASED_INTEREST")

      expect(screen.getByText("Increased Interest")).toBeInTheDocument()
      expect(screen.queryByText("Limited-Time Offer")).not.toBeInTheDocument()
      expect(screen.queryByText("Curators’ Pick")).not.toBeInTheDocument()
    })

    it("shows curators' pick when it's passed in as the label", () => {
      renderPrimaryLabelLine("CURATORS_PICK")

      expect(screen.getByText("Curators’ Pick")).toBeInTheDocument()
      expect(screen.queryByText("Limited-Time Offer")).not.toBeInTheDocument()
      expect(screen.queryByText("Increased Interest")).not.toBeInTheDocument()
    })

    it("hides the increased interest label when under hide signals context", () => {
      mockUseArtworkGridContext.mockImplementation(() => {
        return { hideSignals: true }
      })

      const container = renderPrimaryLabelLine("INCREASED_INTEREST")
      expect(container).toBeEmptyDOMElement()
    })

    it("hides the curators' pick label when under hide signals context", () => {
      mockUseArtworkGridContext.mockImplementation(() => {
        return { hideSignals: true }
      })

      const container = renderPrimaryLabelLine("CURATORS_PICK")
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe("after fetching an active partner offer", () => {
    const renderPrimaryLabelLine = label => {
      const { container } = render(
        <PrimaryLabelLineQueryRenderer id="opaque-internal-id" label={label} />,
      )

      act(() => {
        mockEnvironment.mock.resolveMostRecentOperation(operation =>
          MockPayloadGenerator.generate(operation, {
            Artwork: () => ({
              collectorSignals: {
                partnerOffer: {
                  endAt: DateTime.now().plus({ days: 1, seconds: -1 }).toISO(),
                  priceWithDiscount: {
                    display: "$1,999",
                  },
                },
              },
            }),
          }),
        )
      })

      return container
    }

    it("shows limited-time offer with increased interest passed in as the label", () => {
      renderPrimaryLabelLine("INCREASED_INTEREST")

      expect(screen.getByText("Limited-Time Offer")).toBeInTheDocument()
      expect(screen.queryByText("Increased Interest")).not.toBeInTheDocument()
      expect(screen.queryByText("Curators’ Pick")).not.toBeInTheDocument()
    })

    it("shows limited-time offer with curators' pick is passed in as the label", () => {
      renderPrimaryLabelLine("CURATORS_PICK")

      expect(screen.getByText("Limited-Time Offer")).toBeInTheDocument()
      expect(screen.queryByText("Increased Interest")).not.toBeInTheDocument()
      expect(screen.queryByText("Curators’ Pick")).not.toBeInTheDocument()
    })

    it("shows limited-time offer when under hide signals context", () => {
      mockUseArtworkGridContext.mockImplementation(() => {
        return { hideSignals: true }
      })

      renderPrimaryLabelLine("INCREASED_INTEREST")
      expect(screen.getByText("Limited-Time Offer")).toBeInTheDocument()
    })
  })
})
