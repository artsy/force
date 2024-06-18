import { render, screen } from "@testing-library/react"
import { withProgressiveOnboardingCounts } from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { __ProgressiveOnboardingFollowArtist__ } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { __ProgressiveOnboardingFollowFind__ } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
import { ProgressiveOnboardingFollowHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowHighlight"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { FC, useEffect } from "react"
import { DismissibleProvider, useDismissibleContext } from "@artsy/dismissible"
import {
  PROGRESSIVE_ONBOARDING_KEYS,
  PROGRESSIVE_ONBOARDING,
} from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

jest.mock("System/Hooks/useSystemContext", () => ({
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

jest.mock("System/Hooks/useRouter", () => ({
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
    <DismissibleProvider keys={PROGRESSIVE_ONBOARDING_KEYS}>
      <ProgressiveOnboardingFollowFind>
        <button>Profile</button>
      </ProgressiveOnboardingFollowFind>

      <ProgressiveOnboardingFollowHighlight position="center">
        <button>Follows</button>
      </ProgressiveOnboardingFollowHighlight>

      <ProgressiveOnboardingFollowArtist>
        <button>Follow</button>
      </ProgressiveOnboardingFollowArtist>
    </DismissibleProvider>
  )
}

describe("ProgressiveOnboarding: Follows", () => {
  const mockWithProgressiveOnboardingCounts = withProgressiveOnboardingCounts as jest.Mock

  const followArtistText = "Interested in this artist?"
  const followFindText = "Find and edit all your Follows here."
  const followHiglightedText = "Highlighted"

  const reset = () => {
    localStorage.clear()
  }

  beforeEach(() => {
    reset()
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
  const { dismiss } = useDismissibleContext()

  useEffect(() => {
    dismiss(PROGRESSIVE_ONBOARDING.followFind)
  }, [dismiss])

  return null
}

describe("ProgressiveOnboardingFollowHighlight", () => {
  it("renders the highlight", () => {
    render(
      <DismissibleProvider keys={PROGRESSIVE_ONBOARDING_KEYS}>
        <DismissFollowFind />
        <ProgressiveOnboardingFollowHighlight position="center">
          <div>Example</div>
        </ProgressiveOnboardingFollowHighlight>
      </DismissibleProvider>
    )

    expect(screen.getByText("Example")).toBeInTheDocument()
    expect(screen.getByText("Highlighted")).toBeInTheDocument()
  })

  it("does not render the highlight if 20 seconds have passed since the last dismissal", () => {
    jest.useFakeTimers()

    const Example = ({ display }) => {
      return (
        <DismissibleProvider keys={PROGRESSIVE_ONBOARDING_KEYS}>
          <DismissFollowFind />

          {display && (
            <ProgressiveOnboardingFollowHighlight position="center">
              <div>Example</div>
            </ProgressiveOnboardingFollowHighlight>
          )}
        </DismissibleProvider>
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
