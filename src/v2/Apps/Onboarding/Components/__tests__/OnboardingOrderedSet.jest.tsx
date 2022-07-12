import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { OnboardingOrderedSetFragmentContainer } from "../OnboardingOrderedSet"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("v2/Components/EntityHeaders/EntityHeaderArtist", () => {
  return {
    EntityHeaderArtistFragmentContainer: () => <div>Test Artist</div>,
  }
})
jest.mock("v2/Components/EntityHeaders/EntityHeaderPartner", () => {
  return {
    EntityHeaderPartnerFragmentContainer: () => <div>Test Gallery</div>,
  }
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: OnboardingOrderedSetFragmentContainer,
  query: graphql`
    query OnboardingOrderedSet_Test_Query @relay_test_operation {
      orderedSet(id: "onboarding:test-ordered-set") {
        ...OnboardingOrderedSet_orderedSet
      }
    }
  `,
})

describe("OnboardingOrderedSet", () => {
  it("renders artists correctly", () => {
    renderWithRelay({
      OrderedSet: () => ({
        orderedItemsConnection: {
          edges: [{ node: { __typename: "Artist" } }],
        },
      }),
    })

    expect(screen.getByText("Test Artist")).toBeInTheDocument()
  })

  it("renders galleries correctly", () => {
    renderWithRelay({
      OrderedSet: () => ({
        orderedItemsConnection: {
          edges: [{ node: { __typename: "Profile" } }],
        },
      }),
    })

    expect(screen.getByText("Test Gallery")).toBeInTheDocument()
  })
})
