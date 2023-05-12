import { render, screen } from "@testing-library/react"
import {
  PROGRESSIVE_ONBOARDING_SAVE_FIND,
  ProgressiveOnboardingProvider,
  reset,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingCountsQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { ProgressiveOnboardingSaveArtworkQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { ProgressiveOnboardingSaveFindQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind"
import { ProgressiveOnboardingSaveHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveHighlight"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { FC, useEffect } from "react"

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

const DismissSaveFind = () => {
  const { dismiss } = useProgressiveOnboarding()

  useEffect(() => {
    dismiss(PROGRESSIVE_ONBOARDING_SAVE_FIND)
  }, [dismiss])

  return null
}

describe("ProgressiveOnboardingSaveHighlight", () => {
  it("renders the highlight", () => {
    render(
      <ProgressiveOnboardingProvider>
        <DismissSaveFind />
        <ProgressiveOnboardingSaveHighlight position="center">
          <div>Example</div>
        </ProgressiveOnboardingSaveHighlight>
      </ProgressiveOnboardingProvider>
    )

    expect(screen.getByText("Example")).toBeInTheDocument()
    expect(screen.getByText("Highlighted")).toBeInTheDocument()
  })

  it("does not render the highlight if 20 seconds have passed since the last dismissal", () => {
    jest.useFakeTimers()

    const Example = ({ display }) => {
      return (
        <ProgressiveOnboardingProvider>
          <DismissSaveFind />

          {display && (
            <ProgressiveOnboardingSaveHighlight position="center">
              <div>Example</div>
            </ProgressiveOnboardingSaveHighlight>
          )}
        </ProgressiveOnboardingProvider>
      )
    }

    const { rerender } = render(<Example display={false} />)

    expect(screen.queryByText("Example")).not.toBeInTheDocument()
    expect(screen.queryByText("Highlighted")).not.toBeInTheDocument()

    jest.advanceTimersByTime(20 * 1000)

    rerender(<Example display />)

    expect(screen.getByText("Example")).toBeInTheDocument()
    expect(screen.queryByText("Highlighted")).not.toBeInTheDocument()

    jest.useRealTimers()
  })
})
