import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { CollectorProfileApp_me$data } from "__generated__/CollectorProfileApp_me.graphql"

const TABS = [
  { name: "My Collection", url: "/collector-profile/my-collection" },
  { name: "Insights", url: "/collector-profile/insights" },
  { name: "Saves & Follows", url: "/collector-profile/saves" },
]

interface CollectorProfileAppProps {
  me: CollectorProfileApp_me$data
}

const CollectorProfileApp: React.FC<CollectorProfileAppProps> = ({
  me,
  children,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  if (!isCollectorProfileEnabled) {
    return null
  }

  return (
    <>
      <MetaTags title="Collector Profile | Artsy" />

      <CollectorProfileHeaderFragmentContainer me={me} />

      <RouteTabs fill my={[2, 4]}>
        {TABS.map(tab => {
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
