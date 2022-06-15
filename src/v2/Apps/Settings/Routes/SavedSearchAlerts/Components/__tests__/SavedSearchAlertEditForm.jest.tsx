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

const artistIDs = ["artist-one-id", "artist-two-id", "artist-three-id"]

const defaultEditAlertEntity: EditAlertEntity = {
  id: "alert-id",
  name: "Alert Name",
  artistIds: artistIDs,
}

describe("SavedSearchAlertEditForm", () => {
  const mockOnCompleted = jest.fn()
  const mockOnDeleteClick = jest.fn()
  const trackEvent = jest.fn()

  beforeAll(() => {
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
            me={props.me!}
            artistsConnection={props.artistsConnection!}
            artworksConnection={props.artworksConnection!}
            editAlertEntity={defaultEditAlertEntity}
            onCompleted={mockOnCompleted}
            onDeleteClick={mockOnDeleteClick}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query SavedSearchAlertEditForm_Test_Query($artistIDs: [String!])
        @raw_response_type {
        me {
          ...SavedSearchAlertEditForm_me
            @arguments(savedSearchId: "id", withAggregations: true)
        }
        artistsConnection(slugs: $artistIDs) {
          ...SavedSearchAlertEditForm_artistsConnection
        }
        artworksConnection(
          first: 0
          artistIDs: $artistIDs
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
    variables: {
      artistIDs,
    },
  })

  it("renders pills", () => {
    renderWithRelay({
      ArtistConnection: () => artistsConnectionMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      Me: () => meMocked,
    })

    expect(screen.getByText("Buy Now")).toBeInTheDocument()
    expect(screen.getByText("Bid")).toBeInTheDocument()
    expect(screen.getByText("Inquire")).toBeInTheDocument()
    expect(screen.getByText("Make Offer")).toBeInTheDocument()
    expect(screen.getByText("Small (under 40cm)")).toBeInTheDocument()
  })

  it("should render multiple artist pills", () => {
    renderWithRelay({
      ArtistConnection: () => artistsConnectionMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      Me: () => meMocked,
    })

    expect(screen.getByText("Banksy")).toBeInTheDocument()
    expect(screen.getByText("KAWS")).toBeInTheDocument()
    expect(screen.getByText("David Shrigley")).toBeInTheDocument()
  })

  it('should call delete alert handler when "Delete Alert" button is pressed', () => {
    renderWithRelay({
      ArtistConnection: () => artistsConnectionMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      Me: () => meMocked,
    })

    fireEvent.click(screen.getByText("Delete Alert"))

    expect(mockOnDeleteClick).toBeCalled()
  })

  it("should call complete handler when alert info is successfully updated", async () => {
    renderWithRelay({
      ArtistConnection: () => artistsConnectionMocked,
      FilterArtworksConnection: () => filterArtworksConnectionMocked,
      Me: () => meMocked,
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
      ArtistConnection: () => artistsConnectionMocked,
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
        ArtistConnection: () => artistsConnectionMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        Me: () => meMocked,
      })
      const saveAlertButton = screen.getByRole("button", {
        name: "Save Alert",
      })

      expect(saveAlertButton).toBeDisabled()
    })

    it("should be enabled if alert name is changed", () => {
      renderWithRelay({
        ArtistConnection: () => artistsConnectionMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        Me: () => meMocked,
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
        ArtistConnection: () => artistsConnectionMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        Me: () => meMocked,
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
        ArtistConnection: () => artistsConnectionMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        Me: () => meMocked,
      })

      fireEvent.click(screen.getByText("Buy Now"))

      const saveAlertButton = screen.getByRole("button", {
        name: "Save Alert",
      })

      expect(saveAlertButton).toBeEnabled()
    })

    it("should be enabled if notification checkboxes are changed", () => {
      renderWithRelay({
        ArtistConnection: () => artistsConnectionMocked,
        FilterArtworksConnection: () => filterArtworksConnectionMocked,
        Me: () => meMocked,
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

const artistsConnectionMocked = {
  edges: [
    {
      node: {
        internalID: "artist-one-id",
        name: "Banksy",
        slug: "banksy",
      },
    },
    {
      node: {
        internalID: "artist-two-id",
        name: "KAWS",
        slug: "kaws",
      },
    },
    {
      node: {
        internalID: "artist-three-id",
        name: "David Shrigley",
        slug: "david-shrigley",
      },
    },
  ],
}

const savedSearchAlertLabelsMocked = [
  {
    field: "artistIDs",
    value: "artist-id",
    displayValue: "Banksy",
  },
  {
    field: "artistIDs",
    value: "artist-two-id",
    displayValue: "KAWS",
  },
  {
    field: "artistIDs",
    value: "artist-three-id",
    displayValue: "David Shrigley",
  },
  {
    field: "sizes",
    value: "SMALL",
    displayValue: "Small (under 40cm)",
  },
  {
    field: "acquireable",
    value: "true",
    displayValue: "Buy Now",
  },
  {
    field: "atAuction",
    value: "true",
    displayValue: "Bid",
  },
  {
    field: "inquireableOnly",
    value: "true",
    displayValue: "Inquire",
  },
  {
    field: "offerable",
    value: "true",
    displayValue: "Make Offer",
  },
]

const savedSearchAlertMocked = {
  internalID: "alert-id",
  acquireable: true,
  additionalGeneIDs: [],
  artistIDs,
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
  labels: savedSearchAlertLabelsMocked,
}

const filterArtworksConnectionMocked = {
  aggregations: [],
}

const meMocked = {
  lengthUnitPreference: "CM",
  savedSearch: savedSearchAlertMocked,
}
