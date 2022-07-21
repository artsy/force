import { useMemo } from "react"
import * as React from "react"
import qs from "qs"
import { graphql } from "react-relay"
import { useSystemContext } from "System"
import { EmailConfirmationCTA } from "Components/FlashBanner/EmailConfirmationCTA"
import { AnalyticsSchema as Schema, track } from "System/Analytics"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { isServer } from "lib/isServer"
import { EmailConfirmationLinkExpired } from "./EmailConfirmationLinkExpired"
import { FlashBannerQuery } from "__generated__/FlashBannerQuery.graphql"
import { FullBleedBanner } from "../FullBleedBanner"

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

  // Choose which flash message should be shown in the banner, if any
  const content = useMemo(() => {
    let contentCode: string | undefined | null = _contentCode

    if (!contentCode) {
      contentCode = qs.parse(window.location.search.slice(1))["flash_message"]
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
    const contentMap: Record<string, string> = {
      confirmed: "Your email has been confirmed.",
      already_confirmed: "You have already confirmed your email.",
      invalid_token: "An error has occurred. Please contact support@artsy.net.",
      blank_token: "An error has occurred. Please contact support@artsy.net.",
    }

    switch (contentCode) {
      case "email_confirmation_cta":
        return <EmailConfirmationCTA />
      case "expired_token":
        return <EmailConfirmationLinkExpired />
      default:
        return contentMap[contentCode]
    }
  }, [_contentCode, canRequestEmailConfirmation])

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
  context_module: Schema.ContextModule.FlashBanner,
})(FlashBanner)

export const FlashBannerQueryRenderer: React.FC = () => {
  const { relayEnvironment, user } = useSystemContext()

  if (isServer) return null

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
