import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { Search2IndicesFragmentContainer } from "../Search2Indices"
import {
  Search2Indices_Test_Query,
  Search2Indices_Test_QueryRawResponse,
} from "v2/__generated__/Search2Indices_Test_Query.graphql"

jest.unmock("react-relay")

const onClickMock = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<Search2Indices_Test_Query>({
  Component: ({ system }) => {
    if (system?.algolia) {
      return (
        <Search2IndicesFragmentContainer
          algolia={system.algolia}
          selectedIndiceName="indice_one"
          onClick={onClickMock}
        />
      )
    }

    return null
  },
  query: graphql`
    query Search2Indices_Test_Query @raw_response_type {
      system {
        algolia {
          ...Search2Indices_algolia
        }
      }
    }
  `,
})

describe("Search2Indices", () => {
  beforeEach(() => {
    onClickMock.mockClear()
  })

  it("should render indices correctly", () => {
    renderWithRelay({
      Algolia: () => ({
        ...AlgoliaIndicesFixture,
      }),
    })

    expect(screen.getByText("Indice 1")).toBeInTheDocument()
    expect(screen.getByText("Indice 2")).toBeInTheDocument()
  })

  it("should call handler when indice is clicked", () => {
    renderWithRelay({
      Algolia: () => ({
        ...AlgoliaIndicesFixture,
      }),
    })

    fireEvent.click(screen.getByText("Indice 1"))

    expect(onClickMock).toBeCalledWith(0)
  })
})

const AlgoliaIndicesFixture: NonNullable<
  Search2Indices_Test_QueryRawResponse["system"]
>["algolia"] = {
  indices: [
    {
      displayName: "Indice 1",
      key: "indice_one",
      name: "indice_one",
    },
    {
      displayName: "Indice 2",
      key: "indice_two",
      name: "indice_two",
    },
  ],
}
