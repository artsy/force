import { DismissibleProvider } from "@artsy/dismissible"
import { render, screen } from "@testing-library/react"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { __ProgressiveOnboardingAlertCreate__ } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { PROGRESSIVE_ONBOARDING_KEYS } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import { withProgressiveOnboardingCounts } from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { FC } from "react"

jest.mock("Components/ArtworkFilter/ArtworkFilterContext", () => ({
  useArtworkFilterContext: jest.fn(),
}))

jest.mock("Components/ProgressiveOnboarding/withProgressiveOnboardingCounts")

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({ isLoggedIn: true }),
}))

const Example: FC = () => {
  const ProgressiveOnboardingAlertCreate = withProgressiveOnboardingCounts(
    __ProgressiveOnboardingAlertCreate__
  )

  return (
    <DismissibleProvider keys={PROGRESSIVE_ONBOARDING_KEYS}>
      <ProgressiveOnboardingAlertCreate>
        {({ onSkip: createOnSkip }) => (
          <button
            onClick={() => {
              createOnSkip()
            }}
          >
            Create Alert
          </button>
        )}
      </ProgressiveOnboardingAlertCreate>
    </DismissibleProvider>
  )
}

describe("ProgressiveOnboarding: Alerts", () => {
  // FIXME:

  const mockWithProgressiveOnboardingCounts = withProgressiveOnboardingCounts as jest.Mock
  const mockUseArtworkFilterContext = useArtworkFilterContext as jest.Mock

  const alertCreateText = "Hunting for a particular artwork?"

  const reset = () => {
    localStorage.clear()
  }

  beforeEach(() => {
    console.warn = jest.fn()
    reset()
    ;(withProgressiveOnboardingCounts as jest.Mock).mockClear()
  })

  it("dismisses the chain of tips correctly", async () => {
    mockWithProgressiveOnboardingCounts.mockImplementation(Component => {
      return props => (
        <Component {...props} counts={{ isReady: true, savedSearches: 0 }} />
      )
    })

    mockUseArtworkFilterContext.mockImplementation(() => ({
      currentlySelectedFilters: () => ({}),
    }))

    render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(alertCreateText)).toBeInTheDocument()

    // Click the got it button
    screen.getByText("Got It").click()
    await flushPromiseQueue()

    // No more tips
    expect(screen.queryByText(alertCreateText)).not.toBeInTheDocument()
  })

  it("gets dismissed completely when you go to create an alert", async () => {
    mockWithProgressiveOnboardingCounts.mockImplementation(Component => {
      return props => (
        <Component {...props} counts={{ isReady: true, savedSearches: 0 }} />
      )
    })

    mockUseArtworkFilterContext.mockImplementation(() => ({
      currentlySelectedFilters: () => ({}),
    }))

    render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(alertCreateText)).toBeInTheDocument()

    // Click the create alert button
    screen.getByText("Create Alert").click()
    await flushPromiseQueue()

    // No more tips
    expect(screen.queryByText(alertCreateText)).not.toBeInTheDocument()
  })

  it("does not display if you have already saved an alert", async () => {
    mockWithProgressiveOnboardingCounts.mockImplementation(Component => {
      return props => (
        <Component {...props} counts={{ isReady: true, savedSearches: 1 }} />
      )
    })

    mockUseArtworkFilterContext.mockImplementation(() => ({
      currentlySelectedFilters: () => ({}),
    }))

    render(<Example />)

    // No tips
    expect(screen.queryByText(alertCreateText)).not.toBeInTheDocument()
  })
})
