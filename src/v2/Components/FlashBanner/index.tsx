import React from "react"
import { Banner, Flex, Sans } from "@artsy/palette"
import { QueryRenderer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import qs from "qs"
import { EmailConfirmationCTA } from "./EmailConfirmationCTA"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"
import { AnalyticsSchema as Schema, track } from "v2/Artsy/Analytics"
interface FlashBannerProps {
  contentCode?: string
  me?: {
    canRequestEmailConfirmation: boolean
  }
}

type BannerContent = string | React.ComponentType

function isComponent(c: BannerContent): c is React.ComponentType {
  return typeof c === "function"
}

/**
 * The component responsible for selecting a determining and displaying a flash message
 *
 */
export const FlashBanner: React.FC<FlashBannerProps> = props => {
  /**
   * A map indexing keys (which may come from a contentCode prop, query string or
   * logic internal to the component + its props) to banner content.
   */
  const contentMap: Record<string, BannerContent> = {
    /* Comes from actual window.location.search query params */
    confirmed: "Your email has been confirmed.",
    already_confirmed: "You have already confirmed your email.",
    invalid_token: "An error has occurred. Please contact support@artsy.net.",
    blank_token: "An error has occurred. Please contact support@artsy.net.",
    expired_token: "Link expired. Resend verification email.",

    /* Comes from logic */
    email_confirmation_cta: EmailConfirmationCTA,
  }

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

  const Content: React.ComponentType | string = contentMap[contentCode]

  if (!Content) {
    return null
  }

  return (
    <Banner dismissable backgroundColor="black100">
      <Sans color="white100" size="3" lineHeight={1} weight="medium">
        <Flex justifyContent="center" alignItems="center">
          {isComponent(Content) ? <Content /> : Content}
        </Flex>
      </Sans>
    </Banner>
  )
}

const TrackedFlashBanner = track({
  context_module: Schema.ContextModule.FlashBanner,
})(FlashBanner)

export const FlashBannerQueryRenderer: React.FC = () => {
  const didMount = useDidMount()
  const { relayEnvironment } = useSystemContext()

  // This component is client-only, skip during SSR
  if (!didMount) {
    return null
  }

  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query FlashBannerQuery {
          me {
            canRequestEmailConfirmation
            email
            id
          }
        }
      `}
      render={({ props, error }) => {
        if (error) console.error(error)
        return <TrackedFlashBanner {...props} />
      }}
    />
  )
}
