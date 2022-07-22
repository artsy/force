import { render } from "@testing-library/react"
import { OnboardingFollowArtists } from "../../Views/OnboardingFollowArtists"
import { fireEvent, screen } from "@testing-library/react"

jest.mock("Components/Onboarding/Hooks/useOnboardingContext", () => {
  return {
    useOnboardingContext: () => ({
      state: {
        query: "",
        followedIds: [],
      },
    }),
  }
})
jest.mock("Components/Onboarding/Components/OnboardingOrderedSet", () => {
  return {
    OnboardingOrderedSetQueryRenderer: () => <div>Test Artist 1</div>,
  }
})
jest.mock("Components/Onboarding/Components/OnboardingSearchResults", () => {
  return {
    OnboardingSearchResultsQueryRenderer: () => <div>Test Artist 2</div>,
  }
})
jest.mock("Utils/Hooks/useDebounce", () => {
  return {
    useDebouncedValue: ({ value }) => ({ debouncedValue: value }),
  }
})

describe("OnboardingFollowArtists", () => {
  it("should swap backfill with search results", () => {
    render(<OnboardingFollowArtists />)
    const input = screen.queryByTestId("search-input") as HTMLInputElement

    expect(screen.getByText("Test Artist 1")).toBeInTheDocument()
    expect(input.value).toEqual("")

    fireEvent.change(input, { target: { value: "abc" } })

    expect(input.value).toEqual("abc")
    expect(screen.getByText("Test Artist 2")).toBeInTheDocument()
  })
})
