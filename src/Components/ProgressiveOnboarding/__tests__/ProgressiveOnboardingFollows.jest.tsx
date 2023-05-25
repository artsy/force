import { render, screen } from "@testing-library/react"
import {
  PROGRESSIVE_ONBOARDING_FOLLOW_FIND,
  ProgressiveOnboardingProvider,
  reset,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { withProgressiveOnboardingCounts } from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { __ProgressiveOnboardingFollowArtist__ } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { __ProgressiveOnboardingFollowFind__ } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
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

jest.mock("Components/ProgressiveOnboarding/withProgressiveOnboardingCounts")

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
  const ProgressiveOnboardingFollowFind = withProgressiveOnboardingCounts(
    __ProgressiveOnboardingFollowFind__
  )
  const ProgressiveOnboardingFollowArtist = withProgressiveOnboardingCounts(
    __ProgressiveOnboardingFollowArtist__
  )

  return (
    <ProgressiveOnboardingProvider>
      <ProgressiveOnboardingFollowFind>
        <button>Profile</button>
      </ProgressiveOnboardingFollowFind>

      <ProgressiveOnboardingFollowHighlight position="center">
        <button>Follows</button>
      </ProgressiveOnboardingFollowHighlight>

      <ProgressiveOnboardingFollowArtist>
        <button>Follow</button>
      </ProgressiveOnboardingFollowArtist>
    </ProgressiveOnboardingProvider>
  )
}

describe("ProgressiveOnboarding: Follows", () => {
  const mockWithProgressiveOnboardingCounts = withProgressiveOnboardingCounts as jest.Mock

  const followArtistText = "Interested in this artist?"
  const followFindText = "Find and edit all your Follows here."
  const followHiglightedText = "Highlighted"

  beforeEach(() => {
    reset("user")
  })

  it("renders the chain of tips correctly", async () => {
    mockWithProgressiveOnboardingCounts.mockImplementation(Component => {
      return props => {
        return (
          <Component
            counts={{ isReady: true, followedArtists: 0 }}
            {...props}
          />
        )
      }
    })

    const wrapper = render(<Example />)

    // Initially see the first tip
    expect(screen.getByText(followArtistText)).toBeInTheDocument()
    expect(screen.queryByText(followFindText)).not.toBeInTheDocument()
    expect(screen.queryByText(followHiglightedText)).not.toBeInTheDocument()

    // Simulate following the artist
    mockWithProgressiveOnboardingCounts.mockImplementation(Component => {
      return props => {
        return (
          <Component
            counts={{ isReady: true, followedArtists: 1 }}
            {...props}
          />
        )
      }
    })
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
    mockWithProgressiveOnboardingCounts.mockImplementation(Component => {
      return props => {
        return (
          <Component
            counts={{ isReady: true, followedArtists: 2 }}
            {...props}
          />
        )
      }
    })

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
