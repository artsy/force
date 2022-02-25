import { fireEvent, screen, waitFor } from "@testing-library/react"
import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SavedSearchAlertEditForm_Test_Query } from "v2/__generated__/SavedSearchAlertEditForm_Test_Query.graphql"
import { EditAlertEntity } from "../../types"
import { SavedSearchAlertEditFormFragmentContainer } from "../SavedSearchAlertEditForm"
import { useTracking } from "react-tracking"

const mockEditSavedSearchAlert = jest.fn()

jest.unmock("react-relay")
jest.mock("../../useEditSavedSearchAlert", () => ({
  useEditSavedSearchAlert: () => ({
    submitMutation: mockEditSavedSearchAlert,
  }),
}))

const defaultEditAlertEntity: EditAlertEntity = {
  id: "alert-id",
  name: "Alert Name",
  artistId: "artist-id",
}

describe("SavedSearchAlertEditForm", () => {
  const mockOnCompleted = jest.fn()
  const mockOnDeleteClick = jest.fn()
  const trackEvent = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const { renderWithRelay } = setupTestWrapperTL<
    SavedSearchAlertEditForm_Test_Query
  >({
    Component: props => {
      return (
        <MockBoot breakpoint="lg">
          <SavedSearchAlertEditFormFragmentContainer
            savedSearch={props.me?.savedSearch!}
            artist={props.artist!}
            artworksConnection={props.artworksConnection!}
            editAlertEntity={defaultEditAlertEntity}
            onCompleted={mockOnCompleted}
            onDeleteClick={mockOnDeleteClick}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query SavedSearchAlertEditForm_Test_Query @raw_response_type {
        me {
          savedSearch(id: "id") {
            ...SavedSearchAlertEditForm_savedSearch
          }
        }
        artist(id: "artistId") {
          ...SavedSearchAlertEditForm_artist
        }
        artworksConnection(
          first: 0
          artistID: "artistId"
          aggregations: [
            ARTIST
            LOCATION_CITY
            MATERIALS_TERMS
            MEDIUM
            PARTNER
            COLOR
          ]
        ) {
          ...SavedSearchAlertEditForm_artworksConnection
        }
      }
    `,
  })

  it("renders pills", () => {
    renderWithRelay({
      Artist: () => artistMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      SearchCriteria: () => savedSearchAlertMocked,
    })

    expect(screen.getByText("Buy Now")).toBeInTheDocument()
    expect(screen.getByText("Bid")).toBeInTheDocument()
    expect(screen.getByText("Inquire")).toBeInTheDocument()
    expect(screen.getByText("Make Offer")).toBeInTheDocument()
    expect(screen.getByText("Small (under 40cm)")).toBeInTheDocument()
  })

  it('should call delete alert handler when "Delete Alert" button is pressed', () => {
    renderWithRelay({
      Artist: () => artistMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      SearchCriteria: () => savedSearchAlertMocked,
    })

    fireEvent.click(screen.getByText("Delete Alert"))

    expect(mockOnDeleteClick).toBeCalled()
  })

  it("should call complete handler when alert info is successfully updated", async () => {
    renderWithRelay({
      Artist: () => artistMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      SearchCriteria: () => savedSearchAlertMocked,
    })

    fireEvent.change(screen.getByDisplayValue("Alert #1"), {
      target: { value: "Updated Name" },
    })

    const saveAlertButton = screen.getByRole("button", {
      name: "Save Alert",
    })

    fireEvent.click(saveAlertButton)

    await waitFor(() => expect(mockOnCompleted).toBeCalled())
  })

  it("should track editedSavedSearch event when alert info is successfully updated", async () => {
    renderWithRelay({
      Artist: () => artistMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      SearchCriteria: () => savedSearchAlertMocked,
    })

    fireEvent.change(screen.getByDisplayValue("Alert #1"), {
      target: { value: "Updated Name" },
    })

    const saveAlertButton = screen.getByRole("button", {
      name: "Save Alert",
    })

    fireEvent.click(saveAlertButton)

    await waitFor(() => expect(mockOnCompleted).toBeCalled())

    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "editedSavedSearch",
          "changed": "{\\"name\\":\\"Updated Name\\",\\"push\\":false,\\"email\\":true}",
          "current": "{\\"name\\":\\"Alert #1\\",\\"email\\":true,\\"push\\":false}",
          "saved_search_id": "alert-id",
        },
      ]
    `)
  })

  describe("Save Alert button", () => {
    it("should be disabled by default", () => {
      renderWithRelay({
        Artist: () => artistMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        SearchCriteria: () => savedSearchAlertMocked,
      })
      const saveAlertButton = screen.getByRole("button", {
        name: "Save Alert",
      })

      expect(saveAlertButton).toBeDisabled()
    })

    it("should be enabled if alert name is changed", () => {
      renderWithRelay({
        Artist: () => artistMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        SearchCriteria: () => savedSearchAlertMocked,
      })

      fireEvent.change(screen.getByDisplayValue("Alert #1"), {
        target: { value: "Updated Name" },
      })

      const saveAlertButton = screen.getByRole("button", {
        name: "Save Alert",
      })

      expect(saveAlertButton).toBeEnabled()
    })

    it("should be disabled if all notification checkboxes are disabled", () => {
      renderWithRelay({
        Artist: () => artistMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        SearchCriteria: () => savedSearchAlertMocked,
      })
      const checkbox = screen.getByRole("checkbox", {
        name: "Email Alerts",
      })

      fireEvent.click(checkbox)

      const saveAlertButton = screen.getByRole("button", {
        name: "Save Alert",
      })

      expect(saveAlertButton).toBeDisabled()
    })

    it("should be enabled if pills are changed", () => {
      renderWithRelay({
        Artist: () => artistMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        SearchCriteria: () => savedSearchAlertMocked,
      })

      fireEvent.click(screen.getByText("Buy Now"))

      const saveAlertButton = screen.getByRole("button", {
        name: "Save Alert",
      })

      expect(saveAlertButton).toBeEnabled()
    })

    it("should be enabled if notification checkboxes are changed", () => {
      renderWithRelay({
        Artist: () => artistMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        SearchCriteria: () => savedSearchAlertMocked,
      })
      const checkbox = screen.getByRole("checkbox", {
        name: "Mobile Alerts",
      })

      fireEvent.click(checkbox)

      const saveAlertButton = screen.getByRole("button", {
        name: "Save Alert",
      })

      expect(saveAlertButton).toBeEnabled()
    })
  })
})

const artistMocked = {
  internalID: "artistId",
  name: "Banksy",
  slug: "banksy",
}

const savedSearchAlertMocked = {
  internalID: "alert-id",
  acquireable: true,
  additionalGeneIDs: [],
  artistIDs: ["artistId"],
  atAuction: true,
  attributionClass: [],
  colors: [],
  dimensionRange: null,
  sizes: ["SMALL"],
  height: null,
  inquireableOnly: true,
  locationCities: [],
  majorPeriods: [],
  materialsTerms: ["screen print", "paper"],
  offerable: true,
  partnerIDs: [],
  priceRange: null,
  userAlertSettings: {
    name: "Alert #1",
    email: true,
    push: false,
  },
  width: null,
}

const filterArtworksConnectionMocked = {
  aggregations: [],
}
