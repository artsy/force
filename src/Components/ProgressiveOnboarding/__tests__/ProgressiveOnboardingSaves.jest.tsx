import { render, screen } from "@testing-library/react"
import {
  ProgressiveOnboardingProvider,
  reset,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingCountsQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { ProgressiveOnboardingSaveArtworkQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { ProgressiveOnboardingSaveFindQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind"
import { ProgressiveOnboardingSaveHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveHighlight"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { FC } from "react"

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: () => true,
}))

jest.mock("System/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({ isLoggedIn: true }),
}))

jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight",
  () => ({
    ProgressiveOnboardingHighlight: ({ children }) => (
      <>
        <div>Highlighted</div>
        {children}
      </>
    ),
  })
)

jest.mock("Components/ProgressiveOnboarding/ProgressiveOnboardingCounts")

const Example: FC = () => {
  return (
    <ProgressiveOnboardingProvider>
      <ProgressiveOnboardingSaveFindQueryRenderer>
        <button>Profile</button>
      </ProgressiveOnboardingSaveFindQueryRenderer>

      <ProgressiveOnboardingSaveHighlight position="center">
        <button>Saves</button>
      </ProgressiveOnboardingSaveHighlight>

      <ProgressiveOnboardingSaveArtworkQueryRenderer>
        <button>Save</button>
      </ProgressiveOnboardingSaveArtworkQueryRenderer>
    </ProgressiveOnboardingProvider>
  )
}

describe("ProgressiveOnboarding: Saves", () => {
  const MockProgressiveOnboardingCountsQueryRenderer = ProgressiveOnboardingCountsQueryRenderer as jest.Mock

  const saveArtworkText = "Like what you see?"
  const saveFindText = "Find and edit all your Saves here."
  const saveHiglightedText = "Highlighted"

  beforeEach(() => {
    reset("user")
  })

  it("renders the chain of tips correctly", async () => {
    MockProgressiveOnboardingCountsQueryRenderer.mockImplementation(
      ({ Component, children }) => {
        return <Component counts={{ savedArtworks: 0 }}>{children}</Component>
      }
    )

    const wrapper = render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(saveArtworkText)).toBeInTheDocument()
    expect(screen.queryByText(saveFindText)).not.toBeInTheDocument()
    expect(screen.queryByText(saveHiglightedText)).not.toBeInTheDocument()

    // Simulate saveing the artwork
    MockProgressiveOnboardingCountsQueryRenderer.mockImplementation(
      ({ Component, children }) => {
        return <Component counts={{ savedArtworks: 1 }}>{children}</Component>
      }
    )
    wrapper.rerender(<Example />)

    // See the second tip
    expect(screen.queryByText(saveArtworkText)).not.toBeInTheDocument()
    expect(screen.getByText(saveFindText)).toBeInTheDocument()
    expect(screen.queryByText(saveHiglightedText)).not.toBeInTheDocument()

    // Simulate clicking the Saves button
    screen.getByText("Profile").click()
    await flushPromiseQueue()

    // TODO:
    // See the third tip
    // expect(screen.queryByText(saveArtworkText)).not.toBeInTheDocument()
    // expect(screen.queryByText(saveFindText)).not.toBeInTheDocument()
    // expect(screen.getByText(saveHiglightedText)).toBeInTheDocument()
  })

  it("does not render any tips if user has saved more than 1 artwork", async () => {
    MockProgressiveOnboardingCountsQueryRenderer.mockImplementation(
      ({ Component, children }) => {
        return <Component counts={{ savedArtworks: 2 }}>{children}</Component>
      }
    )

    render(<Example />)

    expect(screen.queryByText(saveArtworkText)).not.toBeInTheDocument()
    expect(screen.queryByText(saveFindText)).not.toBeInTheDocument()
    expect(screen.queryByText(saveHiglightedText)).not.toBeInTheDocument()
  })
})
