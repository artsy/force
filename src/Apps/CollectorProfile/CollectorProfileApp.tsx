import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { EmptyMyCollectionPage } from "Apps/Settings/Routes/MyCollection/Components/EmptyMyCollectionPage"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { useSystemContext } from "System/useSystemContext"
import { CollectorProfileApp_me$data } from "__generated__/CollectorProfileApp_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ProgressiveOnboardingSaveHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveHighlight"
import { ProgressiveOnboardingFollowHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowHighlight"
import styled from "styled-components"
import { Spacer } from "@artsy/palette"
import { useIsRouteActive } from "System/Router/useRouter"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"

interface CollectorProfileAppProps {
  me: CollectorProfileApp_me$data
}

const CollectorProfileApp: React.FC<CollectorProfileAppProps> = ({
  me,
  children,
}) => {
  const { isLoggedIn } = useSystemContext()
  const isSavesPathActive = useIsRouteActive(BASE_SAVES_PATH, {
    exact: false,
  })

  if (!isLoggedIn) {
    return (
      <>
        <MetaTags title="Collector Profile | Artsy" />

        <EmptyMyCollectionPage />
      </>
    )
  }

  return (
    <>
      <MetaTags title="Collector Profile | Artsy" />

      <CollectorProfileHeaderFragmentContainer me={me} />

      <Spacer y={[0, 2]} />

      <RouteTabs fill>
        <Tab to="/collector-profile/my-collection" variant={["xs", "sm"]}>
          My Collection
        </Tab>

        <Tab to="/collector-profile/insights" variant={["xs", "sm"]}>
          Insights
        </Tab>

        <ProgressiveOnboardingSaveHighlight position="center">
          <Tab
            to={BASE_SAVES_PATH}
            active={isSavesPathActive}
            variant={["xs", "sm"]}
          >
            Saves
          </Tab>
        </ProgressiveOnboardingSaveHighlight>

        <ProgressiveOnboardingFollowHighlight position="center">
          <Tab to="/collector-profile/follows" variant={["xs", "sm"]}>
            Follows
          </Tab>
        </ProgressiveOnboardingFollowHighlight>
      </RouteTabs>

      <Spacer y={[2, 4]} />

      {children}
    </>
  )
}

const Tab = styled(RouteTab).attrs({
  // Can remove these style override when progressive onboarding is removed.
  // Here we're padding out the tab to accomodate the highlight.
  height: 53, // Default is 40px
  display: "flex",
  alignItems: "center",
})``

export const CollectorProfileAppFragmentContainer = createFragmentContainer(
  CollectorProfileApp,
  {
    me: graphql`
      fragment CollectorProfileApp_me on Me {
        ...CollectorProfileHeader_me
        name
      }
    `,
  }
)
