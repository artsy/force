import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ProgressiveOnboardingFollowArtistQuery } from "__generated__/ProgressiveOnboardingFollowArtistQuery.graphql"
import { ProgressiveOnboardingFollowArtist_me$data } from "__generated__/ProgressiveOnboardingFollowArtist_me.graphql"
import { useSystemContext } from "System/SystemContext"
import { PROGRESSIVE_ONBOARDING_FIND_FOLLOWS } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFindFollows"
import { PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowsHighlight"

export const PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST = "follow-artist"

interface ProgressiveOnboardingFollowArtistProps {
  me: ProgressiveOnboardingFollowArtist_me$data
}

export const ProgressiveOnboardingFollowArtist: FC<ProgressiveOnboardingFollowArtistProps> = ({
  me,
  children,
}) => {
  const counts = me.counts || { followedArtists: 0 }

  const { dismiss, isDismissed, enabled } = useProgressiveOnboarding()

  const isDisplayable =
    enabled &&
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST) &&
    counts.followedArtists === 0

  const handleClose = useCallback(() => {
    // If you dismiss the follow artist  onboarding,
    // we also want to dismiss any related onboarding tips.
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
    dismiss(PROGRESSIVE_ONBOARDING_FIND_FOLLOWS)
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the follow artist onboarding once you follow an artist.
    if (
      // Ignore 0 counts (which display the onboarding) and 1+ counts (which
      // already know how to follow artists).
      counts.followedArtists !== 1 ||
      // Ignore if the onboarding is already dismissed.
      isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
    ) {
      return
    }

    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
  }, [counts.followedArtists, dismiss, isDismissed])

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST}
      placement="bottom"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          <strong>Interested in this artist?</strong>
          <br />
          Follow them to get updates when new works are added.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

const ProgressiveOnboardingFollowArtistFragmentContainer = createFragmentContainer(
  ProgressiveOnboardingFollowArtist,
  {
    me: graphql`
      fragment ProgressiveOnboardingFollowArtist_me on Me {
        counts {
          followedArtists
        }
      }
    `,
  }
)

export const ProgressiveOnboardingFollowArtistQueryRenderer: FC = ({
  children,
}) => {
  const { isLoggedIn } = useSystemContext()

  if (!isLoggedIn) {
    return <>{children}</>
  }

  return (
    <SystemQueryRenderer<ProgressiveOnboardingFollowArtistQuery>
      lazyLoad
      placeholder={children}
      query={graphql`
        query ProgressiveOnboardingFollowArtistQuery {
          me {
            ...ProgressiveOnboardingFollowArtist_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return children
        }

        if (!props?.me) {
          return children
        }

        return (
          <ProgressiveOnboardingFollowArtistFragmentContainer me={props.me}>
            {children}
          </ProgressiveOnboardingFollowArtistFragmentContainer>
        )
      }}
    />
  )
}
