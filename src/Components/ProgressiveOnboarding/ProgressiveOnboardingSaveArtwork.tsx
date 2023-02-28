import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ProgressiveOnboardingSaveArtworkQuery } from "__generated__/ProgressiveOnboardingSaveArtworkQuery.graphql"
import { ProgressiveOnboardingSaveArtwork_me$data } from "__generated__/ProgressiveOnboardingSaveArtwork_me.graphql"
import { useSystemContext } from "System/SystemContext"

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

  const handleClose = useCallback(() => {
    dismiss(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)
  }, [dismiss])

  useEffect(() => {
    if (counts.savedArtworks === 0) return
    if (isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)) return

    handleClose()
  }, [handleClose, counts.savedArtworks, isDismissed])

  if (!enabled || isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
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
