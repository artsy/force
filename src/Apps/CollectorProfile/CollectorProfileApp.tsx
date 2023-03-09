import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { EmptyMyCollectionPage } from "Apps/Settings/Routes/MyCollection/Components/EmptyMyCollectionPage"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { useSystemContext } from "System/useSystemContext"
import { CollectorProfileApp_me$data } from "__generated__/CollectorProfileApp_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ProgressiveOnboardingSavesHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSavesHighlight"
import { ProgressiveOnboardingFollowsHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowsHighlight"
import styled from "styled-components"
import { Spacer } from "@artsy/palette"

interface CollectorProfileAppProps {
  me: CollectorProfileApp_me$data
}

const CollectorProfileApp: React.FC<CollectorProfileAppProps> = ({
  me,
  children,
}) => {
  const { isLoggedIn } = useSystemContext()

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
        <Tab to="/collector-profile/my-collection">My Collection</Tab>

        <Tab to="/collector-profile/insights">Insights</Tab>

        <ProgressiveOnboardingSavesHighlight position="center">
          <Tab to="/collector-profile/saves">Saves</Tab>
        </ProgressiveOnboardingSavesHighlight>

        <ProgressiveOnboardingFollowsHighlight position="center">
          <Tab to="/collector-profile/follows">Follows</Tab>
        </ProgressiveOnboardingFollowsHighlight>
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
