import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { EmailConfirmationCTA } from "Components/FlashBanner/EmailConfirmationCTA"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EmailConfirmationLinkExpired } from "./EmailConfirmationLinkExpired"
import { FlashBannerQuery } from "__generated__/FlashBannerQuery.graphql"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { useRouter } from "System/Hooks/useRouter"
import { FlashBanner_me$data } from "__generated__/FlashBanner_me.graphql"

interface FlashBannerProps {
  me?: FlashBanner_me$data
}

/**
 * The component responsible for selecting a determining and
 * displaying a flash message on the homepage.
 */
const FlashBanner: FC<FlashBannerProps> = ({ me }) => {
  const {
    match: { location },
  } = useRouter()

  const canRequestEmailConfirmation = !!me?.canRequestEmailConfirmation

  const contentCode = useMemo(() => {
    if (location.query.flash_message) {
      return location.query.flash_message
    }

    if (canRequestEmailConfirmation) {
      return "email_confirmation_cta"
    }

    return null
  }, [location.query.flash_message, canRequestEmailConfirmation])

  const content = useMemo(() => {
    switch (contentCode) {
      case "email_confirmation_cta":
        return <EmailConfirmationCTA />
      case "expired_token":
        return <EmailConfirmationLinkExpired />
      case "confirmed":
        return "Your email has been confirmed."
      case "already_confirmed":
        return "You have already confirmed your email."
      case "invalid_token":
        return "An error has occurred. Please contact support@artsy.net."
      case "blank_token":
        return "An error has occurred. Please contact support@artsy.net."
      default:
        return null
    }
  }, [contentCode])

  if (!content) return null

  return (
    <FullBleedBanner
      dismissable
      variant="defaultDark"
      data-test="flashMessage"
      data-testid="flashMessage"
    >
      {content}
    </FullBleedBanner>
  )
}

export const FlashBannerFragmentContainer = createFragmentContainer(
  FlashBanner,
  {
    me: graphql`
      fragment FlashBanner_me on Me {
        canRequestEmailConfirmation
      }
    `,
  }
)

export const FlashBannerQueryRenderer: FC = () => {
  const { user } = useSystemContext()

  return user ? (
    <SystemQueryRenderer<FlashBannerQuery>
      query={graphql`
        query FlashBannerQuery {
          me {
            ...FlashBanner_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return <FlashBannerFragmentContainer />
        }

        if (!props?.me) {
          return <FlashBannerFragmentContainer />
        }

        return <FlashBannerFragmentContainer me={props.me} />
      }}
    />
  ) : (
    <FlashBannerFragmentContainer />
  )
}
