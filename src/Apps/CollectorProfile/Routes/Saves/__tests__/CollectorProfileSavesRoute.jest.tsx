import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen, waitFor } from "@testing-library/react"
import { CollectorProfileSavesRoute_Test_Query } from "__generated__/CollectorProfileSavesRoute_Test_Query.graphql"
import { CollectorProfileSavesRouteFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/CollectorProfileSavesRoute"
import { useRouter } from "System/Hooks/useRouter"
import { useTracking } from "react-tracking"
import { HttpError } from "found"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")
jest.mock("found")

const { renderWithRelay } = setupTestWrapperTL<
  CollectorProfileSavesRoute_Test_Query
>({
  Component: CollectorProfileSavesRouteFragmentContainer,
  query: graphql`
    query CollectorProfileSavesRoute_Test_Query @relay_test_operation {
      me {
        ...CollectorProfileSavesRoute_me
      }
    }
  `,
})

describe("CollectorProfileSavesRoute", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseTracking = useTracking as jest.Mock
  const mockHttpError = HttpError as jest.Mock
  const trackEvent = jest.fn()

  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))

    mockUseRouter.mockImplementation(() => ({
      match: {
        params: {},
        location: {
          query: {},
        },
      },
    }))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("should render collections", () => {
    renderWithRelay({
      Me: () => ({
        savedArtworksArtworkList,
        customArtworkLists,
      }),
    })

    expect(screen.getByText("Saved Artworks")).toBeInTheDocument()
    expect(screen.getByText("Collection One")).toBeInTheDocument()
    expect(screen.getByText("Collection Two")).toBeInTheDocument()
    expect(screen.getByText("Collection Three")).toBeInTheDocument()
  })

  describe("Selected State", () => {
    it("should render the first collection as selected when collection id is NOT passed in url", () => {
      renderWithRelay({
        Me: () => ({
          savedArtworksArtworkList,
          customArtworkLists,
        }),
      })

      const selectedElement = getCurrentCollectionElement()
      expect(selectedElement).toHaveTextContent("Saved Artworks")
    })

    it("should render the corresponding collection as selected when collection id is passed in url", () => {
      mockUseRouter.mockImplementation(() => ({
        match: {
          params: {
            id: "collection-two-id",
          },
          location: {
            query: {},
          },
        },
      }))

      renderWithRelay({
        Me: () => ({
          savedArtworksArtworkList,
          customArtworkLists,
        }),
      })

      const selectedElement = getCurrentCollectionElement()
      expect(selectedElement).toHaveTextContent("Collection Two")
    })
  })

  it("should `lock` the initial collection in the 2nd slot when collection id is passed in url during initial mount", () => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        params: {
          id: "collection-three-id",
        },
        location: {
          query: {},
        },
      },
    }))

    renderWithRelay({
      Me: () => ({
        savedArtworksArtworkList,
        customArtworkLists,
      }),
    })

    const selectedElement = screen.getAllByRole("link")
    const lockedElement = selectedElement[2]

    // Check the second slot
    expect(lockedElement).toHaveTextContent("Collection Three")
    expect(isAriaCurrentAttributeSetToTrue(lockedElement)).toBe(true)
  })

  it("should track event on mount", async () => {
    renderWithRelay({
      Me: () => ({
        savedArtworksArtworkList,
        customArtworkLists,
      }),
    })

    await waitFor(() =>
      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "viewedArtworkList",
        context_owner_type: "saves",
        owner_id: "saved-artwork",
      })
    )
  })

  it("should set title tag", async () => {
    renderWithRelay({
      Me: () => ({
        savedArtworksArtworkList,
        customArtworkLists,
      }),
    })

    await waitFor(() => expect(document.title).toBe("Saves | Artsy"))
  })

  it("should render 404 for non-existent list", async () => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        params: {
          id: "non-existent-list-id",
        },
        location: {
          query: {},
        },
      },
    }))

    renderWithRelay({
      Me: () => ({
        savedArtworksArtworkList,
        customArtworkLists,
      }),
    })

    expect(mockHttpError).toHaveBeenCalledWith(404)
  })
})

const isAriaCurrentAttributeSetToTrue = (element: HTMLElement) => {
  const attribute = element.getAttribute("aria-current")

  return attribute === "true"
}

const getCurrentCollectionElement = () => {
  return screen.getAllByRole("link").find(element => {
    return isAriaCurrentAttributeSetToTrue(element)
  })
}

const savedArtworksArtworkList = {
  internalID: "saved-artwork",
  name: "Saved Artworks",
}

const customArtworkLists = {
  edges: [
    {
      node: {
        internalID: "collection-one-id",
        name: "Collection One",
      },
    },
    {
      node: {
        internalID: "collection-two-id",
        name: "Collection Two",
      },
    },
    {
      node: {
        internalID: "collection-three-id",
        name: "Collection Three",
      },
    },
  ],
}
