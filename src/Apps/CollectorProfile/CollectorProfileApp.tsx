import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { EmptyMyCollectionPage } from "Apps/Settings/Routes/MyCollection/Components/EmptyMyCollectionPage"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { useSystemContext } from "System/useSystemContext"
import { CollectorProfileApp_me$data } from "__generated__/CollectorProfileApp_me.graphql"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"

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

  const tabs = compact([
    { name: "My Collection", url: "/collector-profile/my-collection" },
    { name: "Insights", url: "/collector-profile/insights" },
    {
      name: "Saves",
      url: "/collector-profile/saves",
    },
    {
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
