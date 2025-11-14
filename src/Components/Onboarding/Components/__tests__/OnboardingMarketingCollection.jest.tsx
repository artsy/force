import { screen } from "@testing-library/react"
import { OnboardingMarketingCollectionFragmentContainer } from "Components/Onboarding/Components/OnboardingMarketingCollection"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      // @ts-ignore
      <OnboardingMarketingCollectionFragmentContainer
        {...props}
        description={<>Example description</>}
      />
    )
  },
  query: graphql`
    query OnboardingMarketingCollection_Test_Query @relay_test_operation {
      marketingCollection(slug: "example") {
        ...OnboardingMarketingCollection_marketingCollection
      }
    }
  `,
})

describe("OnboardingMarketingCollection", () => {
  it("renders correctly", () => {
    renderWithRelay({
      MarketingCollection: () => ({
        title: "Example Collection",
      }),
    })

    expect(screen.getByText("Example Collection")).toBeInTheDocument()
    expect(screen.getByText("Example description")).toBeInTheDocument()
  })

  it("shows no results if none found", () => {
    renderWithRelay({
      MarketingCollection: () => ({
        artworks: { edges: [] },
      }),
    })

    expect(screen.getByText("No results found")).toBeInTheDocument()
  })
})
