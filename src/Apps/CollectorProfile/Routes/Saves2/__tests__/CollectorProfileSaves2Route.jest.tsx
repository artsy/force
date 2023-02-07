import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { CollectorProfileSaves2Route_Test_Query } from "__generated__/CollectorProfileSaves2Route_Test_Query.graphql"
import { CollectorProfileSaves2RouteFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/CollectorProfileSaves2Route"

jest.unmock("react-relay")
jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {},
    },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL<
  CollectorProfileSaves2Route_Test_Query
>({
  Component: CollectorProfileSaves2RouteFragmentContainer,
  query: graphql`
    query CollectorProfileSaves2Route_Test_Query @relay_test_operation {
      me {
        ...CollectorProfileSaves2Route_me
      }
    }
  `,
})

describe("CollectorProfileSaves2Route", () => {
  it("should render collections", () => {
    renderWithRelay({
      CollectionsConnection: () => collectionsConnection,
    })

    expect(screen.getByText("Collection One")).toBeInTheDocument()
    expect(screen.getByText("Collection Two")).toBeInTheDocument()
  })
})

const collectionsConnection = {
  edges: [
    {
      node: {
        name: "Collection One",
      },
    },
    {
      node: {
        name: "Collection Two",
      },
    },
  ],
}
