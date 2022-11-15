import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useMemo } from "react"
import * as React from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "System"
import { EmailConfirmationCTA } from "Components/FlashBanner/EmailConfirmationCTA"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EmailConfirmationLinkExpired } from "./EmailConfirmationLinkExpired"
import { FlashBannerQuery } from "__generated__/FlashBannerQuery.graphql"
import { FullBleedBanner } from "Components/FullBleedBanner"
import track from "react-tracking"
import { useRouter } from "System/Router/useRouter"

const FLASH_MESSAGES = {
  confirmed: "Your email has been confirmed.",
  already_confirmed: "You have already confirmed your email.",
  invalid_token: "An error has occurred. Please contact support@artsy.net.",
  blank_token: "An error has occurred. Please contact support@artsy.net.",
}

interface FlashBannerProps {
  contentCode?: string
  me?: {
    canRequestEmailConfirmation: boolean
  }
}

/**
 * @deprecated: Use `useToasts` from `@artsy/palette`
 * The component responsible for selecting a determining and displaying a flash message
 */
export const FlashBanner: React.FC<FlashBannerProps> = ({
  me,
  contentCode: _contentCode,
}) => {
  const canRequestEmailConfirmation = me?.canRequestEmailConfirmation

  const {
    match: { location },
  } = useRouter()

  // TODO: Clean up this logic
  // Choose which flash message should be shown in the banner, if any
  const content = useMemo(() => {
    let contentCode: string | undefined | null = _contentCode

    if (!contentCode) {
      contentCode = location.query.flash_message
    }

    if (!contentCode) {
      contentCode = canRequestEmailConfirmation
        ? "email_confirmation_cta"
        : null
    }

    if (!contentCode) {
      return null
    }

    /**
     * A map indexing keys (which may come from a contentCode prop, query string or
     * logic internal to the component + its props) to banner content.
     */

    switch (contentCode) {
      case "email_confirmation_cta":
        return <EmailConfirmationCTA />
      case "expired_token":
        return <EmailConfirmationLinkExpired />
      default:
        return FLASH_MESSAGES[contentCode]
    }
  }, [_contentCode, canRequestEmailConfirmation, location.query])

  if (!content) {
    return null
  }

  return (
    <FullBleedBanner dismissable variant="defaultDark" data-test="flashMessage">
      {content}
    </FullBleedBanner>
  )
}

const TrackedFlashBanner = track({
  context_module: DeprecatedAnalyticsSchema.ContextModule.FlashBanner,
})(FlashBanner)

export const FlashBannerQueryRenderer: React.FC = () => {
  const { relayEnvironment, user } = useSystemContext()

  return user ? (
    <SystemQueryRenderer<FlashBannerQuery>
      environment={relayEnvironment}
      query={graphql`
        query FlashBannerQuery {
          me {
            canRequestEmailConfirmation
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return null
        }

        return <TrackedFlashBanner me={props.me} />
      }}
    />
  ) : (
    <TrackedFlashBanner />
  )
}
