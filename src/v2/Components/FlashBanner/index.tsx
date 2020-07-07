import React from "react"
import qs from "qs"
import { graphql } from "react-relay"
import { Banner, Flex, Sans } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy"
import { EmailConfirmationCTA } from "v2/Components/FlashBanner/EmailConfirmationCTA"
import { AnalyticsSchema as Schema, track } from "v2/Artsy/Analytics"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { isServer } from "lib/isServer"
import { EmailConfirmationLinkExpired } from "./EmailConfirmationLinkExpired"

interface FlashBannerProps {
  contentCode?: string
  me?: {
    canRequestEmailConfirmation: boolean
  }
}

/**
 * The component responsible for selecting a determining and displaying a flash message
 */
export const FlashBanner: React.FC<FlashBannerProps> = props => {
  /**
   * Choose which flash message should be shown in the banner, if any
   */
  const selectContent = (): string | JSX.Element | null | undefined => {
    let contentCode = props.contentCode

    if (!contentCode) {
      contentCode = qs.parse(window.location.search.slice(1))["flash_message"]
    }

    if (!contentCode) {
      contentCode = props.me?.canRequestEmailConfirmation
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
  }

  const content = selectContent()

  if (!content) {
    return null
  }

  return (
    <Banner dismissable backgroundColor="black100">
      <Sans color="white100" size="3" lineHeight={1} weight="medium">
        <Flex justifyContent="center" alignItems="center">
          {content}
        </Flex>
      </Sans>
    </Banner>
  )
}

const TrackedFlashBanner = track({
  context_module: Schema.ContextModule.FlashBanner,
})(FlashBanner)

export const FlashBannerQueryRenderer: React.FC = () => {
  const { relayEnvironment, user } = useSystemContext()
  if (isServer) return null

  return user ? (
    <SystemQueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query FlashBannerQuery {
          me {
            canRequestEmailConfirmation
          }
        }
      `}
      render={({ props, error }) => {
        if (error) console.error(error)
        return <TrackedFlashBanner {...props} />
      }}
    />
  ) : (
    <TrackedFlashBanner />
  )
}
