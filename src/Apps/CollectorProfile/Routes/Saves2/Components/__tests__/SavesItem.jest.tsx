import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SavesItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesItem"
import { SavesItem_test_Query } from "__generated__/SavesItem_test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<SavesItem_test_Query>({
  Component: props => {
    const item = props.me?.collectionsConnection?.edges?.[0]?.node

    if (item) {
      return <SavesItemFragmentContainer item={item} imagesLayout="grid" />
    }

    return null
  },
  query: graphql`
    query SavesItem_test_Query @relay_test_operation {
      me {
        collectionsConnection(first: 1) {
          edges {
            node {
              ...SavesItem_item
            }
          }
        }
      }
    }
  `,
})

describe("SavesItem", () => {
  it("should render the title", () => {
    renderWithRelay({
      CollectionsConnection: () => collectionsConnection,
    })

    expect(screen.getByText("Collection Name")).toBeInTheDocument()
  })

  it("should render the artworks count", () => {
    renderWithRelay({
      CollectionsConnection: () => collectionsConnection,
    })

    expect(screen.getByText("4 Artworks")).toBeInTheDocument()
  })

  it("should render all artwork images", () => {
    renderWithRelay({
      CollectionsConnection: () => collectionsConnection,
    })

    expect(screen.getAllByAltText("")).toHaveLength(4)
  })

  it("should render the correct link", () => {
    renderWithRelay({
      CollectionsConnection: () => collectionsConnection,
    })

    const link = screen.getByRole("link")
    const href = "/collector-profile/saves2/collection-id"

    expect(link).toHaveAttribute("href", href)
  })

  it("should render the correct link for default collection", () => {
    renderWithRelay({
      CollectionsConnection: () => ({
        edges: [
          {
            node: {
              ...collectionNode,
              default: true,
            },
          },
        ],
      }),
    })

    const link = screen.getByRole("link")
    const href = "/collector-profile/saves2"

    expect(link).toHaveAttribute("href", href)
  })
})

const artworksConnection = {
  edges: [
    {
      node: {
        image: {
          url: "artwork-image-url-1",
        },
      },
    },
    {
      node: {
        image: {
          url: "artwork-image-url-2",
        },
      },
    },
    {
      node: {
        image: {
          url: "artwork-image-url-3",
        },
      },
    },
    {
      node: {
        image: {
          url: "artwork-image-url-4",
        },
      },
    },
  ],
}

const collectionNode = {
  internalID: "collection-id",
  name: "Collection Name",
  artworksCount: 4,
  artworksConnection,
  default: false,
}

const collectionsConnection = {
  edges: [
    {
      node: collectionNode,
    },
  ],
}
