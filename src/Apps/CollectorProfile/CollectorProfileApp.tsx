import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { EmptyMyCollectionPage } from "Apps/Settings/Routes/MyCollection/Components/EmptyMyCollectionPage"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { CollectorProfileApp_me$data } from "__generated__/CollectorProfileApp_me.graphql"

interface CollectorProfileAppProps {
  me: CollectorProfileApp_me$data
}

const CollectorProfileApp: React.FC<CollectorProfileAppProps> = ({
  me,
  children,
}) => {
  const { isLoggedIn } = useSystemContext()
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const isSeparateSavesAndFollowsEnabled = useFeatureFlag(
    "collector-profile-separating-saves-and-follows"
  )
  if (!isCollectorProfileEnabled) {
    return null
  }

  if (!isLoggedIn) {
    return (
      <>
        <MetaTags title="Collector Profile | Artsy" />

        <EmptyMyCollectionPage />
      </>
    )
  }

  const tabs = compact([
    { name: "My Collection", url: "/collector-profile/my-collection" },
    { name: "Insights", url: "/collector-profile/insights" },
    {
      name: isSeparateSavesAndFollowsEnabled ? "Saves" : "Saves & Follows",
      url: "/collector-profile/saves",
    },
    isSeparateSavesAndFollowsEnabled && {
      name: "Follows",
      url: "/collector-profile/follows",
    },
  ])

  return (
    <>
      <MetaTags title="Collector Profile | Artsy" />

      <CollectorProfileHeaderFragmentContainer me={me} />

      <RouteTabs fill my={[2, 4]}>
        {tabs.map(tab => {
          return (
            <RouteTab key={tab.url} to={tab.url} variant={["xs", "sm"]}>
              {tab.name}
            </RouteTab>
          )
        })}
      </RouteTabs>

      {children}
    </>
  )
}

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
