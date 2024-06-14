import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { EmptyMyCollectionPage } from "Apps/Settings/Routes/MyCollection/Components/EmptyMyCollectionPage"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { CollectorProfileApp_me$data } from "__generated__/CollectorProfileApp_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
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

      <Spacer y={[4, 6]} />

      <CollectorProfileHeaderFragmentContainer me={me} />

      <Spacer y={[4, 6]} />

      <RouteTabs>
        <Tab to="/collector-profile/my-collection" variant={["xs", "sm"]}>
          Artworks
        </Tab>

        <Tab to="/collector-profile/artists" variant={["xs", "sm"]}>
          Artists
        </Tab>

        <Tab to="/collector-profile/insights" variant={["xs", "sm"]}>
          Insights
        </Tab>
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
