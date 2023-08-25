import { act, fireEvent, screen } from "@testing-library/react"
import { CreateArtworkAlertSectionFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/CreateArtworkAlertSection"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useSystemContext } from "System/useSystemContext"
import { CreateArtworkAlertSection_Test_Query } from "__generated__/CreateArtworkAlertSection_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { MockPayloadGenerator } from "relay-test-utils"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/useSystemContext")

const { renderWithRelay } = setupTestWrapperTL<
  CreateArtworkAlertSection_Test_Query
>({
  Component: CreateArtworkAlertSectionFragmentContainer,
  query: graphql`
    query CreateArtworkAlertSection_Test_Query @relay_test_operation {
      artwork(id: "test-artwork-id") {
        ...CreateArtworkAlertSection_artwork
      }
    }
  `,
})

describe("CreateArtworkAlertSection", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()
  const mockuseSystemContext = useSystemContext as jest.Mock

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent,
    }))

    mockuseSystemContext.mockImplementation(() => {
      return {
        isLoggedIn: true,
      }
    })
  })

  it("should correctly render placeholder", () => {
    const placeholder = "Banana"

    const { env } = renderWithRelay({
      Artwork: () => Artwork,
      Viewer: () => ({
        previewSavedSearch: {
          displayName: placeholder,
        },
      }),
    })

    mockuseSystemContext.mockImplementation(() => {
      return {
        isLoggedIn: true,
        relayEnvironment: env,
      }
    })

    act(() => {
      fireEvent.click(screen.getByText("Create Alert"))
    })

    act(() => {
      env.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, {
          PreviewSavedSearch: () => ({
            displayName: "Banana",
          }),
        })
      })
    })

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it("should correctly render pills", () => {
    renderWithRelay({
      Artwork: () => Artwork,
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(screen.getByText("Banksy")).toBeInTheDocument()
    expect(screen.getByText("Limited Edition")).toBeInTheDocument()
    expect(screen.getByText("Prints")).toBeInTheDocument()
  })

  it("should not render `Rarity` pill if needed data is missing", () => {
    renderWithRelay({
      Artwork: () => ({
        ...Artwork,
        attributionClass: null,
      }),
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(screen.queryByText("Limited Edition")).not.toBeInTheDocument()
  })

  it("should not render `Medium` pill if needed data is missing", () => {
    renderWithRelay({
      Artwork: () => ({
        ...Artwork,
        mediumType: null,
      }),
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(screen.queryByText("Prints")).not.toBeInTheDocument()
  })

  it("should correctly track event when `Create Alert` button is pressed", () => {
    renderWithRelay({
      Artwork: () => Artwork,
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedCreateAlert",
      context_page_owner_type: "artwork",
      context_page_owner_id: "artwork-id",
      context_page_owner_slug: "artwork-slug",
    })
  })
})

const Artwork = {
  title: "Some artwork title",
  slug: "artwork-slug",
  internalID: "artwork-id",
  artists: [
    {
      internalID: "4dd1584de0091e000100207c",
      name: "Banksy",
      slug: "banksy",
    },
  ],
  attributionClass: {
    internalID: "limited edition",
  },
  mediumType: {
    filterGene: {
      slug: "prints",
      name: "Prints",
    },
  },
}
