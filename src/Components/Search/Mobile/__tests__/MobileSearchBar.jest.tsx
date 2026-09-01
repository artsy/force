import { render, screen } from "@testing-library/react"
import { MobileSearchBar } from "Components/Search/Mobile/MobileSearchBar"
import { MockBoot } from "DevTools/MockBoot"
import type { MobileSearchBarSuggestQuery$data } from "__generated__/MobileSearchBarSuggestQuery.graphql"

jest.mock("@artsy/icons/SearchIcon", () => {
  return () => {
    return <span>Search icon</span>
  }
})

const viewer = {} as NonNullable<MobileSearchBarSuggestQuery$data["viewer"]>

const renderMobileSearchBar = (isArtsyLensEnabled: boolean) => {
  return render(
    <MockBoot
      breakpoint="xs"
      context={{
        featureFlags: {
          isEnabled: jest.fn(() => isArtsyLensEnabled),
          getVariant: jest.fn(),
        },
      }}
    >
      <MobileSearchBar viewer={viewer} onClose={jest.fn()} />
    </MockBoot>,
  )
}

describe("MobileSearchBar", () => {
  it("replaces the search icon with Artsy Lens when enabled", () => {
    renderMobileSearchBar(true)

    expect(
      screen.getByLabelText("Search by image with Artsy Lens"),
    ).toBeInTheDocument()
    expect(screen.queryByText("Search icon")).not.toBeInTheDocument()
  })

  it("keeps the search icon when Artsy Lens is disabled", () => {
    renderMobileSearchBar(false)

    expect(screen.getByText("Search icon")).toBeInTheDocument()
    expect(
      screen.queryByLabelText("Search by image with Artsy Lens"),
    ).not.toBeInTheDocument()
  })
})
