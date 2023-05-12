import { render, screen } from "@testing-library/react"
import {
  PROGRESSIVE_ONBOARDING_FOLLOW_FIND,
  ProgressiveOnboardingProvider,
  reset,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingCountsQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { ProgressiveOnboardingFollowArtistQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { ProgressiveOnboardingFollowFindQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
import { ProgressiveOnboardingFollowHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowHighlight"
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

jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "/artist/example/about",
      },
    },
  }),
}))

const Example: FC = () => {
  return (
    <ProgressiveOnboardingProvider>
      <ProgressiveOnboardingFollowFindQueryRenderer>
        <button>Profile</button>
      </ProgressiveOnboardingFollowFindQueryRenderer>

      <ProgressiveOnboardingFollowHighlight position="center">
        <button>Follows</button>
      </ProgressiveOnboardingFollowHighlight>

      <ProgressiveOnboardingFollowArtistQueryRenderer>
        <button>Follow</button>
      </ProgressiveOnboardingFollowArtistQueryRenderer>
    </ProgressiveOnboardingProvider>
  )
}

describe("ProgressiveOnboarding: Follows", () => {
  const MockProgressiveOnboardingCountsQueryRenderer = ProgressiveOnboardingCountsQueryRenderer as jest.Mock

  const followArtistText = "Interested in this artist?"
  const followFindText = "Find and edit all your Follows here."
  const followHiglightedText = "Highlighted"

  beforeEach(() => {
    reset("user")
  })

  it("renders the chain of tips correctly", async () => {
    MockProgressiveOnboardingCountsQueryRenderer.mockImplementation(
      ({ Component, children }) => {
        return <Component counts={{ followedArtists: 0 }}>{children}</Component>
      }
    )

    const wrapper = render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(followArtistText)).toBeInTheDocument()
    expect(screen.queryByText(followFindText)).not.toBeInTheDocument()
    expect(screen.queryByText(followHiglightedText)).not.toBeInTheDocument()

    // Simulate following the artist
    MockProgressiveOnboardingCountsQueryRenderer.mockImplementation(
      ({ Component, children }) => {
        return <Component counts={{ followedArtists: 1 }}>{children}</Component>
      }
    )
    wrapper.rerender(<Example />)

    // See the second tip
    expect(screen.queryByText(followArtistText)).not.toBeInTheDocument()
    expect(screen.getByText(followFindText)).toBeInTheDocument()
    expect(screen.queryByText(followHiglightedText)).not.toBeInTheDocument()

    // Simulate clicking the Follows button
    screen.getByText("Profile").click()
    await flushPromiseQueue()

    // TODO:
    // See the third tip
    // expect(screen.queryByText(followArtistText)).not.toBeInTheDocument()
    // expect(screen.queryByText(followFindText)).not.toBeInTheDocument()
    // expect(screen.getByText(followHiglightedText)).toBeInTheDocument()
  })

  it("does not render any tips if user has followed more than 1 artist", async () => {
    MockProgressiveOnboardingCountsQueryRenderer.mockImplementation(
      ({ Component, children }) => {
        return <Component counts={{ followedArtists: 2 }}>{children}</Component>
      }
    )

    render(<Example />)

    expect(screen.queryByText(followArtistText)).not.toBeInTheDocument()
    expect(screen.queryByText(followFindText)).not.toBeInTheDocument()
    expect(screen.queryByText(followHiglightedText)).not.toBeInTheDocument()
  })
})

const DismissFollowFind = () => {
  const { dismiss } = useProgressiveOnboarding()

  useEffect(() => {
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_FIND)
  }, [dismiss])

  return null
}

describe("ProgressiveOnboardingFollowHighlight", () => {
  it("renders the highlight", () => {
    render(
      <ProgressiveOnboardingProvider>
        <DismissFollowFind />
        <ProgressiveOnboardingFollowHighlight position="center">
          <div>Example</div>
        </ProgressiveOnboardingFollowHighlight>
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
          <DismissFollowFind />

          {display && (
            <ProgressiveOnboardingFollowHighlight position="center">
              <div>Example</div>
            </ProgressiveOnboardingFollowHighlight>
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
