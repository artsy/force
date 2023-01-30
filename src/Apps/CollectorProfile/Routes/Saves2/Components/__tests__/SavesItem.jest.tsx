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
      return (
        <SavesItemFragmentContainer
          item={item}
          imagesLayout="grid"
          onClick={jest.fn()}
        />
      )
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

    expect(screen.getByText("5 Artworks")).toBeInTheDocument()
  })

  // TODO: Check images
  // TODO: Check onClick handler
})

const collectionNode = {
  name: "Collection Name",
  artworksCount: 5,
  default: false,
}

const collectionsConnection = {
  edges: [
    {
      node: collectionNode,
    },
  ],
}
