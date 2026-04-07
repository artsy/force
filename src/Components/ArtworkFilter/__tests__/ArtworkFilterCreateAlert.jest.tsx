import { render } from "@testing-library/react"
import { ArtworkFilterCreateAlert } from "Components/ArtworkFilter/ArtworkFilterCreateAlert"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

jest.mock("Components/SavedSearchAlert/SavedSearchAlertContext", () => ({
  useSavedSearchAlertContext: jest.fn(),
}))

const mockUseSavedSearchAlertContext = useSavedSearchAlertContext as jest.Mock

jest.mock("Components/Alert/Components/CreateAlertButton", () => ({
  CreateAlertButton: ({ renderButton }) => {
    const button = renderButton({ onClick: jest.fn() })
    return <div>{button}</div>
  },
}))

jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate",
  () => ({
    ProgressiveOnboardingAlertCreate: ({ children }) =>
      children({ onSkip: jest.fn() }),
  }),
)

describe("ArtworkFilterCreateAlert", () => {
  const mockEntity = {
    defaultCriteria: {
      artistIDs: ["artist-1"],
    },
    owner: {
      type: "Artist" as const,
      id: "artist-1",
      slug: "artist-slug",
      name: "Artist Name",
    },
  }

  beforeEach(() => {
    // Default: entity exists
    mockUseSavedSearchAlertContext.mockReturnValue({
      entity: mockEntity,
      criteria: {},
      aggregations: [],
    })
  })

  it("returns null when entity is empty", () => {
    mockUseSavedSearchAlertContext.mockReturnValue({
      entity: {},
      criteria: {},
      aggregations: [],
    })

    const { container } = render(
      <ArtworkFilterCreateAlert
        renderButton={props => (
          <button type="button" onClick={props.onClick}>
            Create Alert
          </button>
        )}
      />,
    )

    expect(container.firstChild).toBeNull()
  })
})
