import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import {
  SelectArtworkListsModal_Test_Query,
  SelectArtworkListsModal_Test_Query$data,
} from "__generated__/SelectArtworkListsModal_Test_Query.graphql"
import { SelectArtworkListsModalFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/Components/SelectArtworkListsModal/SelectArtworkListsModal"
import {
  ManageArtworkForSavesProvider,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { useTracking } from "react-tracking"
import { useMutation } from "Utils/Hooks/useMutation"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { FC } from "react"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/useMutation")

const TestComponent: FC<SelectArtworkListsModal_Test_Query$data> = props => {
  const { state } = useManageArtworkForSavesContext()

  // Modal is not displayed in the ManageArtworkForSaves component if artwork is null
  if (!state.artwork) {
    return null
  }

  return <SelectArtworkListsModalFragmentContainer {...props} />
}

const { renderWithRelay } = setupTestWrapperTL<
  SelectArtworkListsModal_Test_Query
>({
  Component: props => {
    return (
      <MockBoot>
        <AnalyticsCombinedContextProvider
          contextPageOwnerId="page-owner-id"
          path="/artist/page-owner-slug"
        >
          <ManageArtworkForSavesProvider artwork={artwork}>
            <TestComponent {...props} />
          </ManageArtworkForSavesProvider>
        </AnalyticsCombinedContextProvider>
      </MockBoot>
    )
  },
  query: graphql`
    query SelectArtworkListsModal_Test_Query @relay_test_operation {
      me {
        ...SelectArtworkListsModal_me @arguments(artworkID: "artworkID")
      }
    }
  `,
})

describe("SelectArtworkListsModal", () => {
  const mockUseMutation = useMutation as jest.Mock
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()
  const submitMutation = jest.fn()

  beforeEach(() => {
    mockUseMutation.mockImplementation(() => ({ submitMutation }))
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("should render artwork data", async () => {
    renderWithRelay()

    await waitForModalToBePresented()

    expect(screen.getByText(/Banksy/)).toBeInTheDocument()
    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  it("should render collections", async () => {
    renderWithRelay({
      CollectionsConnection: () => collectionsConnection,
    })

    await waitForModalToBePresented()

    const collectionEntityOne = screen.getByText("Collection 1")
    const collectionEntityTwo = screen.getByText("Collection 2")
    const collectionEntityThree = screen.getByText("Collection 3")

    expect(collectionEntityOne).toBeInTheDocument()
    expect(collectionEntityTwo).toBeInTheDocument()
    expect(collectionEntityThree).toBeInTheDocument()
  })

  describe("without selected collections by default", () => {
    it("default state", async () => {
      renderWithRelay({
        CollectionsConnection: () => unselectedCollectionsConnection,
      })

      await waitForModalToBePresented()

      const entity = screen.getByText("0 lists selected")
      expect(entity).toBeInTheDocument()
    })

    it("select one collection", async () => {
      renderWithRelay({
        CollectionsConnection: () => unselectedCollectionsConnection,
      })

      await waitForModalToBePresented()

      // Select flow
      fireEvent.click(screen.getByText("Collection 1"))

      const selectedOptionsBefore = screen.queryAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("1 list selected")).toBeInTheDocument()
      expect(selectedOptionsBefore.length).toBe(1)
      expect(selectedOptionsBefore[0]).toHaveTextContent("Collection 1")

      // Unselect flow
      fireEvent.click(screen.getByText("Collection 1"))

      const selectedOptionsAfter = screen.queryAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("0 lists selected")).toBeInTheDocument()
      expect(selectedOptionsAfter.length).toBe(0)
    })

    it("select multiple collections", async () => {
      renderWithRelay({
        CollectionsConnection: () => unselectedCollectionsConnection,
      })

      await waitForModalToBePresented()

      // Select flow
      fireEvent.click(screen.getByText("Collection 1"))
      fireEvent.click(screen.getByText("Collection 2"))

      const selectedOptionsBefore = screen.queryAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("2 lists selected")).toBeInTheDocument()
      expect(selectedOptionsBefore.length).toBe(2)
      expect(selectedOptionsBefore[0]).toHaveTextContent("Collection 1")
      expect(selectedOptionsBefore[1]).toHaveTextContent("Collection 2")

      // Unselect flow
      fireEvent.click(screen.getByText("Collection 1"))
      fireEvent.click(screen.getByText("Collection 2"))

      const selectedOptionsAfter = screen.queryAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("0 lists selected")).toBeInTheDocument()
      expect(selectedOptionsAfter.length).toBe(0)
    })
  })

  describe("with selected collections by default", () => {
    it("default state", async () => {
      renderWithRelay({
        CollectionsConnection: () => collectionsConnection,
      })

      await waitForModalToBePresented()

      const selectedOptions = screen.getAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("1 list selected")).toBeInTheDocument()
      expect(selectedOptions.length).toBe(1)
      expect(selectedOptions[0]).toHaveTextContent("Collection 1")
    })

    it("unselect the default selected collection", async () => {
      renderWithRelay({
        CollectionsConnection: () => collectionsConnection,
      })

      await waitForModalToBePresented()

      fireEvent.click(screen.getByText("Collection 1"))

      const selectedOptionsAfter = screen.queryAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("0 lists selected")).toBeInTheDocument()
      expect(selectedOptionsAfter.length).toBe(0)
    })

    it("select some other collection", async () => {
      renderWithRelay({
        CollectionsConnection: () => collectionsConnection,
      })

      await waitForModalToBePresented()

      fireEvent.click(screen.getByText("Collection 2"))

      const selectedOptions = screen.getAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("2 lists selected")).toBeInTheDocument()
      expect(selectedOptions.length).toBe(2)
      expect(selectedOptions[0]).toHaveTextContent("Collection 1")
      expect(selectedOptions[1]).toHaveTextContent("Collection 2")
    })

    it("unselect the default selected collection, select some other collection", async () => {
      renderWithRelay({
        CollectionsConnection: () => collectionsConnection,
      })

      await waitForModalToBePresented()

      fireEvent.click(screen.getByText("Collection 1"))
      fireEvent.click(screen.getByText("Collection 2"))

      const selectedOptions = screen.getAllByRole("option", {
        selected: true,
      })

      expect(screen.getByText("1 list selected")).toBeInTheDocument()
      expect(selectedOptions.length).toBe(1)
      expect(selectedOptions[0]).toHaveTextContent("Collection 2")
    })
  })

  describe("Analytics", () => {
    it("doesn't track event when no new collections are selected", async () => {
      renderWithRelay({
        CollectionsConnection: () => collectionsConnection,
      })

      await waitForModalToBePresented()

      // Make some changes (in our case we unselect previously selected collection)
      // Otherwise, the "Save" button will be disabled
      // and the mutation will not be performed when the button is clicked
      fireEvent.click(screen.getByText("Collection 1"))
      fireEvent.click(screen.getByText("Save"))

      await flushPromiseQueue()
      expect(trackEvent).not.toHaveBeenCalled()
    })

    it("track event when one new collection is selected", async () => {
      renderWithRelay({
        CollectionsConnection: () => unselectedCollectionsConnection,
      })

      await waitForModalToBePresented()

      fireEvent.click(screen.getByText("Collection 1"))
      fireEvent.click(screen.getByText("Save"))

      await waitFor(() =>
        expect(trackEvent).toHaveBeenLastCalledWith({
          action: "addedArtworkToArtworkList",
          context_owner_id: "page-owner-id",
          context_owner_slug: "page-owner-slug",
          context_owner_type: "artist",
          artwork_ids: [artwork.internalID],
          owner_ids: ["collection-one"],
        })
      )
    })

    it("track event when multiple new collections are selected", async () => {
      renderWithRelay({
        CollectionsConnection: () => unselectedCollectionsConnection,
      })

      await waitForModalToBePresented()

      fireEvent.click(screen.getByText("Collection 1"))
      fireEvent.click(screen.getByText("Collection 2"))
      fireEvent.click(screen.getByText("Save"))

      await waitFor(() =>
        expect(trackEvent).toHaveBeenLastCalledWith({
          action: "addedArtworkToArtworkList",
          context_owner_id: "page-owner-id",
          context_owner_slug: "page-owner-slug",
          context_owner_type: "artist",
          artwork_ids: [artwork.internalID],
          owner_ids: ["collection-one", "collection-two"],
        })
      )
    })
  })
})

const waitForModalToBePresented = () => {
  return waitFor(() => screen.getByText("Select lists for this artwork"))
}

const artwork = {
  id: "artwork-id",
  internalID: "artwork-internal-id",
  title: "Artwork Title",
  year: "2023",
  artistNames: "Banksy",
  imageURL: null,
}

const collectionOne = {
  internalID: "collection-one",
  name: "Collection 1",
  isSavedArtwork: true,
}

const collectionTwo = {
  internalID: "collection-two",
  name: "Collection 2",
  isSavedArtwork: false,
}

const collectionThree = {
  internalID: "collection-three",
  name: "Collection 3",
  isSavedArtwork: false,
}

const collectionsConnection = {
  edges: [
    { node: collectionOne },
    { node: collectionTwo },
    { node: collectionThree },
  ],
}

const unselectedCollectionsConnection = {
  edges: [
    {
      node: {
        ...collectionOne,
        isSavedArtwork: false,
      },
    },
    { node: collectionTwo },
    { node: collectionThree },
  ],
}
