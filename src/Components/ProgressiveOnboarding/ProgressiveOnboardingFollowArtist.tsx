import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ProgressiveOnboardingFollowArtistQuery } from "__generated__/ProgressiveOnboardingFollowArtistQuery.graphql"
import { ProgressiveOnboardingFollowArtist_me$data } from "__generated__/ProgressiveOnboardingFollowArtist_me.graphql"
import { useSystemContext } from "System/SystemContext"

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

  const handleClose = useCallback(() => {
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
  }, [dismiss])

  useEffect(() => {
    if (counts.followedArtists === 0) return
    if (isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)) return

    handleClose()
  }, [handleClose, counts.followedArtists, isDismissed])

  if (!enabled || isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
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
