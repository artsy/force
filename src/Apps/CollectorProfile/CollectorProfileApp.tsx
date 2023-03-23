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
import { useFeatureFlag } from "System/useFeatureFlag"
import { useIsRouteActive } from "System/Router/useRouter"

interface CollectorProfileAppProps {
  me: CollectorProfileApp_me$data
}

const CollectorProfileApp: React.FC<CollectorProfileAppProps> = ({
  me,
  children,
}) => {
  const { isLoggedIn } = useSystemContext()

  // TODO: Remove this👇 when we're ready to launch the new artworks list page
  const isArtworksListEnabled = useFeatureFlag("force-enable-artworks-list")

  const savesPath = "/collector-profile/saves"
  const isSavesPathActive = useIsRouteActive(savesPath, { exact: false })
  const savesPath2 = "/collector-profile/saves2"
  const isSaves2PathActive = useIsRouteActive(savesPath2, { exact: false })

  const savesPathToUse = isArtworksListEnabled
    ? "/collector-profile/saves2"
    : "/collector-profile/saves"

  const isSavesOrSaves2RouteActive = isSavesPathActive || isSaves2PathActive
  // TODO: Remove this ☝️ when we're ready to launch the new artworks list page

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
          <Tab to={savesPathToUse} active={isSavesOrSaves2RouteActive}>
            Saves
          </Tab>
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
