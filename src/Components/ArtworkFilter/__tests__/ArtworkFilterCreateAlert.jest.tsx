import { render, screen } from "@testing-library/react"
import { useVariant } from "System/FeatureFlags/useFeatureFlag"
import { ArtworkFilterCreateAlert } from "Components/ArtworkFilter/ArtworkFilterCreateAlert"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

jest.mock("System/FeatureFlags/useFeatureFlag", () => ({
  useVariant: jest.fn(() => ({
    enabled: true,
    name: "control",
  })),
}))

const mockUseVariant = useVariant as jest.Mock

jest.mock("System/Hooks/useTrackFeatureVariant", () => ({
  useTrackFeatureVariantOnMount: jest.fn(),
}))

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

  describe("diamond_remove_tooltip_experiment", () => {
    it("renders with tooltip wrapper in control variant", () => {
      mockUseVariant.mockReturnValue({
        enabled: true,
        name: "control",
      })

      render(
        <ArtworkFilterCreateAlert
          renderButton={props => (
            <button
              type="button"
              data-testid="alert-button"
              onClick={props.onClick}
            >
              Create Alert
            </button>
          )}
        />,
      )

      expect(
        screen.getByTestId("create-alert-with-tooltip"),
      ).toBeInTheDocument()
      expect(screen.getByTestId("alert-button")).toBeInTheDocument()
    })

    it("renders without tooltip wrapper in experiment variant", () => {
      mockUseVariant.mockReturnValue({
        enabled: true,
        name: "experiment",
      })

      render(
        <ArtworkFilterCreateAlert
          renderButton={props => (
            <button
              type="button"
              data-testid="alert-button"
              onClick={props.onClick}
            >
              Create Alert
            </button>
          )}
        />,
      )

      expect(
        screen.getByTestId("create-alert-without-tooltip"),
      ).toBeInTheDocument()
      expect(screen.getByTestId("alert-button")).toBeInTheDocument()
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
