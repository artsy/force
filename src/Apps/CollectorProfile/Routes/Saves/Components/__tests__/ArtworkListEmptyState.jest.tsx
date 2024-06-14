import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { ArtworkListEmptyState_Test_Query } from "__generated__/ArtworkListEmptyState_Test_Query.graphql"
import { ArtworkListEmptyStateFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListEmptyState"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: {
      location: {
        query: "",
      },
    },
  })),
}))

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkListEmptyState_Test_Query
>({
  Component: props => {
    if (!props.me) {
      return null
    }

    return <ArtworkListEmptyStateFragmentContainer me={props.me} />
  },
  query: graphql`
    query ArtworkListEmptyState_Test_Query @relay_test_operation {
      me {
        ...ArtworkListEmptyState_me @arguments(listID: "listID")
      }
    }
  `,
})

describe("ArtworkListEmptyState", () => {
  it("should render correct texts for default artwork list", () => {
    renderWithRelay({
      Me: () => ({
        artworkList: {
          default: true,
          artworks: {
            edges: [],
          },
        },
        savedArtworksArtworkList: {
          artworksCount: 0,
        },
      }),
    })

    const title = "Keep track of artworks you love"
    const description =
      "Select the heart on an artwork to save it or add it to a list."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it("should render correct texts for non-default artwork list when user has saved artworks", () => {
    renderWithRelay({
      Me: () => ({
        artworkList: {
          default: false,
          artworks: {
            edges: [],
          },
        },
        savedArtworksArtworkList: {
          artworksCount: 2,
        },
      }),
    })

    const title = "Start curating your list of works"
    const description =
      "Add works from Saved Artworks or add new artworks as you browse."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it("should render correct texts for non-default artwork list when user doesn't have any saved artworks", () => {
    renderWithRelay({
      Me: () => ({
        artworkList: {
          default: false,
          artworks: {
            edges: [],
          },
        },
        savedArtworksArtworkList: {
          artworksCount: 0,
        },
      }),
    })

    const title = "Keep track of artworks you love"
    const description =
      "Select the heart on an artwork to save it or add it to a list."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })
})
