import { FullBleed, Spacer, useTheme } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { FairTabsFragmentContainer } from "Apps/Fair/Components/FairTabs"
import { Sticky } from "Components/Sticky"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Jump } from "Utils/Hooks/useJump"
import { Media } from "Utils/Responsive"
import { userIsAdmin } from "Utils/user"
import type { FairApp_fair$data } from "__generated__/FairApp_fair.graphql"
import { HttpError } from "found"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExhibitorsLetterNavFragmentContainer as ExhibitorsLetterNav } from "./Components/ExhibitorsLetterNav"
import { FairHeaderFragmentContainer } from "./Components/FairHeader"
import { FairHeaderImageFragmentContainer } from "./Components/FairHeader/FairHeaderImage"
import { FairMetaFragmentContainer } from "./Components/FairMeta"

interface FairAppProps {
  fair: FairApp_fair$data
}

const FairApp: React.FC<React.PropsWithChildren<FairAppProps>> = ({
  children,
  fair,
}) => {
  const { match } = useRouter()

  return (
    <>
      <FairMetaFragmentContainer fair={fair} />

      <FairHeaderImageFragmentContainer fair={fair} />

      <Spacer y={[2, 4]} />

      <FairHeaderFragmentContainer fair={fair} />

      <Spacer y={2} />

      <Jump id="FairTabs" />

      <Media greaterThan="xs">
        <Sticky>
          {({ stuck }) => {
            return (
              <Stuck stuck={stuck}>
                <FairTabsFragmentContainer fair={fair} />

                {match.location.pathname.includes("/exhibitors") && (
                  <ExhibitorsLetterNav fair={fair} />
                )}
              </Stuck>
            )
          }}
        </Sticky>
      </Media>

      <Media at="xs">
        <FairTabsFragmentContainer fair={fair} />

        <Sticky>
          {({ stuck }) => {
            return (
              <Stuck stuck={stuck}>
                {match.location.pathname.includes("/exhibitors") && (
                  <ExhibitorsLetterNav fair={fair} />
                )}
              </Stuck>
            )
          }}
        </Sticky>
      </Media>

      {children}
    </>
  )
}

const TrackingWrappedFairApp: React.FC<
  React.PropsWithChildren<FairAppProps>
> = props => {
  const {
    fair: { internalID, profile },
  } = props

  const { user } = useSystemContext()

  // If a fair's profile is inaccessible, that means it's private, which in turn means
  // the fair is only visible to admins.
  if (!profile && !userIsAdmin(user)) {
    throw new HttpError(404)
  }

  return (
    <Analytics contextPageOwnerId={internalID}>
      <FairApp {...props} />
    </Analytics>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const FairAppFragmentContainer = createFragmentContainer(
  TrackingWrappedFairApp,
  {
    fair: graphql`
      fragment FairApp_fair on Fair {
        ...FairTabs_fair
        ...FairMeta_fair
        ...FairHeader_fair
        ...FairHeaderImage_fair
        ...ExhibitorsLetterNav_fair
        internalID
        profile {
          id
        }
      }
    `,
  },
)

const Stuck: React.FC<React.PropsWithChildren<{ stuck: boolean }>> = ({
  stuck,
  children,
}) => {
  const { theme } = useTheme()

  return (
    <FullBleed
      mb={stuck ? 1 : 0}
      backgroundColor="mono0"
      style={stuck ? { boxShadow: theme.effects.dropShadow } : undefined}
    >
      <AppContainer>
        <HorizontalPadding>{children}</HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
