import { render, screen } from "@testing-library/react"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { ProgressiveOnboardingAlertReady } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertReady"
import { ProgressiveOnboardingAlertSelectFilter } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertSelectFilter"
import {
  ProgressiveOnboardingProvider,
  reset,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { FC, useState } from "react"

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: () => true,
}))

jest.mock("Components/ArtworkFilter/ArtworkFilterContext", () => ({
  useArtworkFilterContext: jest.fn(),
}))

const Example: FC = () => {
  const [renders, setRerender] = useState(0)
  return (
    <ProgressiveOnboardingProvider>
      <div>{renders}</div>

      <ProgressiveOnboardingAlertSelectFilter>
        <button
          onClick={() => {
            setRerender(prevRenders => prevRenders + 1)
          }}
        >
          Simulate Filter
        </button>
      </ProgressiveOnboardingAlertSelectFilter>

      <ProgressiveOnboardingAlertCreate>
        {({ onSkip: createOnSkip }) => (
          <ProgressiveOnboardingAlertReady>
            {({ onSkip: readyOnSkip }) => (
              <button
                onClick={() => {
                  createOnSkip()
                  readyOnSkip()
                }}
              >
                Create Alert
              </button>
            )}
          </ProgressiveOnboardingAlertReady>
        )}
      </ProgressiveOnboardingAlertCreate>
    </ProgressiveOnboardingProvider>
  )
}

describe("ProgressiveOnboarding: Alerts", () => {
  const mockUseArtworkFilterContext = useArtworkFilterContext as jest.Mock
  const alertCreateText = "Hunting for a particular artwork?"
  const alertSelectFilterText = "First, select the relevant filters."
  const alertReadyText = "When you’re ready, click Create Alert."

  beforeEach(() => {
    reset("user")
  })

  it("renders the chain of tips correctly", async () => {
    mockUseArtworkFilterContext.mockImplementation(() => ({
      currentlySelectedFilters: () => ({}),
    }))

    render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(alertCreateText)).toBeInTheDocument()
    expect(screen.queryByText(alertSelectFilterText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertReadyText)).not.toBeInTheDocument()

    // Click the learn more button
    screen.getByText("Learn More").click()
    await flushPromiseQueue()

    // See the second tip
    expect(screen.queryByText(alertCreateText)).not.toBeInTheDocument()
    expect(screen.getByText(alertSelectFilterText)).toBeInTheDocument()
    expect(screen.queryByText(alertReadyText)).not.toBeInTheDocument()

    // Change the filters
    mockUseArtworkFilterContext.mockImplementation(() => ({
      currentlySelectedFilters: () => ({ medium: "painting" }),
    }))
    screen.getByText("Simulate Filter").click()
    await flushPromiseQueue()

    // See the third tip
    expect(screen.queryByText(alertCreateText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertSelectFilterText)).not.toBeInTheDocument()
    expect(screen.getByText(alertReadyText)).toBeInTheDocument()
  })

  it("dismisses the chain of tips correctly", async () => {
    mockUseArtworkFilterContext.mockImplementation(() => ({
      currentlySelectedFilters: () => ({}),
    }))

    render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(alertCreateText)).toBeInTheDocument()
    expect(screen.queryByText(alertSelectFilterText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertReadyText)).not.toBeInTheDocument()

    // Click the got it button
    screen.getByText("Got It").click()
    await flushPromiseQueue()

    // No more tips
    expect(screen.queryByText(alertCreateText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertSelectFilterText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertReadyText)).not.toBeInTheDocument()
  })

  it("gets dismissed completely when you go to create an alert", async () => {
    mockUseArtworkFilterContext.mockImplementation(() => ({
      currentlySelectedFilters: () => ({}),
    }))

    render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(alertCreateText)).toBeInTheDocument()
    expect(screen.queryByText(alertSelectFilterText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertReadyText)).not.toBeInTheDocument()

    // Click the create alert button
    screen.getByText("Create Alert").click()
    await flushPromiseQueue()

    // No more tips
    expect(screen.queryByText(alertCreateText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertSelectFilterText)).not.toBeInTheDocument()
    expect(screen.queryByText(alertReadyText)).not.toBeInTheDocument()
  })
})
