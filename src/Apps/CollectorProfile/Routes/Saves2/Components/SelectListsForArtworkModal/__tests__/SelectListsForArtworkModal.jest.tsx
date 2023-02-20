import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { SelectListsForArtworkModal_Test_Query } from "__generated__/SelectListsForArtworkModal_Test_Query.graphql"
import { SelectListsForArtworkModalFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkModal"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  SelectListsForArtworkModal_Test_Query
>({
  Component: SelectListsForArtworkModalFragmentContainer,
  query: graphql`
    query SelectListsForArtworkModal_Test_Query @relay_test_operation {
      me {
        ...SelectListsForArtworkModal_me
      }
      artwork(id: "artworkID") {
        ...SelectListsForArtworkModal_artwork
      }
    }
  `,
})

describe("SelectListsForArtworkModal", () => {
  it("should render artwork data", async () => {
    renderWithRelay({
      Artwork: () => artwork,
    })

    const entity = await screen.findByText("Artwork Title, 2023")
    expect(entity).toBeInTheDocument()
  })

  it("should render collections", async () => {
    renderWithRelay({
      CollectionsConnection: () => collectionsConnection,
    })

    const collectionEntityOne = await screen.findByText("Collection 1")
    const collectionEntityTwo = await screen.findByText("Collection 2")
    const collectionEntityThree = await screen.findByText("Collection 3")

    expect(collectionEntityOne).toBeInTheDocument()
    expect(collectionEntityTwo).toBeInTheDocument()
    expect(collectionEntityThree).toBeInTheDocument()
  })

  describe("where no selected collections by default", () => {
    it("default state", async () => {
      renderWithRelay({
        CollectionsConnection: () => unselectedCollectionsConnection,
      })

      const entity = await screen.findByText("0 lists selected")
      expect(entity).toBeInTheDocument()
    })

    describe("when user selected collections", () => {
      it("one collection", async () => {
        renderWithRelay({
          CollectionsConnection: () => unselectedCollectionsConnection,
        })

        // Select flow
        fireEvent.click(await screen.findByText("Collection 1"))

        const selectedOptionsBefore = screen.queryAllByRole("option", {
          selected: true,
        })

        expect(screen.getByText("1 list selected")).toBeInTheDocument()
        expect(selectedOptionsBefore.length).toBe(1)
        expect(selectedOptionsBefore[0]).toHaveTextContent("Collection 1")

        // Unselect flow
        fireEvent.click(await screen.findByText("Collection 1"))

        const selectedOptionsAfter = screen.queryAllByRole("option", {
          selected: true,
        })

        expect(screen.getByText("0 lists selected")).toBeInTheDocument()
        expect(selectedOptionsAfter.length).toBe(0)
      })

      it("multiple collections", async () => {
        renderWithRelay({
          CollectionsConnection: () => unselectedCollectionsConnection,
        })

        // Select flow
        fireEvent.click(await screen.findByText("Collection 1"))
        fireEvent.click(await screen.findByText("Collection 2"))

        const selectedOptionsBefore = screen.queryAllByRole("option", {
          selected: true,
        })

        expect(screen.getByText("2 lists selected")).toBeInTheDocument()
        expect(selectedOptionsBefore.length).toBe(2)
        expect(selectedOptionsBefore[0]).toHaveTextContent("Collection 1")
        expect(selectedOptionsBefore[1]).toHaveTextContent("Collection 2")

        // Unselect flow
        fireEvent.click(await screen.findByText("Collection 1"))
        fireEvent.click(await screen.findByText("Collection 2"))

        const selectedOptionsAfter = screen.queryAllByRole("option", {
          selected: true,
        })

        expect(screen.getByText("0 lists selected")).toBeInTheDocument()
        expect(selectedOptionsAfter.length).toBe(0)
      })
    })
  })
})

const artwork = {
  title: "Artwork Title",
  date: "2023",
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
