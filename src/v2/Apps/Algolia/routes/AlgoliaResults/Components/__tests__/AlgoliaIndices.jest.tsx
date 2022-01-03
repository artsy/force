import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { AlgoliaIndicesFragmentContainer } from "../AlgoliaIndices"
import {
  AlgoliaIndices_Test_Query,
  AlgoliaIndices_Test_QueryRawResponse,
} from "v2/__generated__/AlgoliaIndices_Test_Query.graphql"

jest.unmock("react-relay")

const onClickMock = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<AlgoliaIndices_Test_Query>({
  Component: ({ system }) => {
    if (system?.algolia) {
      return (
        <AlgoliaIndicesFragmentContainer
          algolia={system.algolia}
          selectedIndiceName="indice_one"
          onClick={onClickMock}
        />
      )
    }

    return null
  },
  query: graphql`
    query AlgoliaIndices_Test_Query @raw_response_type {
      system {
        algolia {
          ...AlgoliaIndices_algolia
        }
      }
    }
  `,
})

describe("AlgoliaIndices", () => {
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
  AlgoliaIndices_Test_QueryRawResponse["system"]
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
