import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ProgressiveOnboardingSaveArtworkQuery } from "__generated__/ProgressiveOnboardingSaveArtworkQuery.graphql"
import { ProgressiveOnboardingSaveArtwork_me$data } from "__generated__/ProgressiveOnboardingSaveArtwork_me.graphql"
import { useSystemContext } from "System/SystemContext"
import { PROGRESSIVE_ONBOARDING_FIND_SAVES } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFindSaves"
import { PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSavesHighlight"

export const PROGRESSIVE_ONBOARDING_SAVE_ARTWORK = "save-artwork"

interface ProgressiveOnboardingSaveArtworkProps {
  me: ProgressiveOnboardingSaveArtwork_me$data
}

export const ProgressiveOnboardingSaveArtwork: FC<ProgressiveOnboardingSaveArtworkProps> = ({
  me,
  children,
}) => {
  const counts = me.counts || { savedArtworks: 0 }

  const { dismiss, isDismissed, enabled } = useProgressiveOnboarding()

  const isDisplayble =
    enabled &&
    !isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK) &&
    counts.savedArtworks === 0

  const handleClose = useCallback(() => {
    // If you dismiss the save artwork onboarding,
    // we also want to dismiss any related onboarding tips.
    dismiss(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)
    dismiss(PROGRESSIVE_ONBOARDING_FIND_SAVES)
    dismiss(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the save artwork onboarding once you save an artwork.
    if (
      // Ignore 0 counts (which display the onboarding) and 1+ counts (which
      // already know how to save artworks).
      counts.savedArtworks !== 1 ||
      // Ignore if the onboarding is already dismissed.
      isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)
    ) {
      return
    }

    dismiss(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)
  }, [counts.savedArtworks, dismiss, isDismissed])

  if (!isDisplayble) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_SAVE_ARTWORK}
      placement="bottom"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          <strong>Like what you see?</strong>
          <br />
          Hit the heart to save an artwork.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

const ProgressiveOnboardingSaveArtworkFragmentContainer = createFragmentContainer(
  ProgressiveOnboardingSaveArtwork,
  {
    me: graphql`
      fragment ProgressiveOnboardingSaveArtwork_me on Me {
        counts {
          savedArtworks
        }
      }
    `,
  }
)

export const ProgressiveOnboardingSaveArtworkQueryRenderer: FC = ({
  children,
}) => {
  const { isLoggedIn } = useSystemContext()

  if (!isLoggedIn) {
    return <>{children}</>
  }

  return (
    <SystemQueryRenderer<ProgressiveOnboardingSaveArtworkQuery>
      lazyLoad
      placeholder={children}
      query={graphql`
        query ProgressiveOnboardingSaveArtworkQuery {
          me {
            ...ProgressiveOnboardingSaveArtwork_me
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
          <ProgressiveOnboardingSaveArtworkFragmentContainer me={props.me}>
            {children}
          </ProgressiveOnboardingSaveArtworkFragmentContainer>
        )
      }}
    />
  )
}
