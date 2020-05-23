import React from "react"
import { CollectionsHubsHomepageNav as ReactionHubsNav } from "v2/Components/CollectionsHubsHomepageNav"

export const CollectionsHubsHomepageNav = ({ collectionsHubs }) => {
  return (
    <ReactionHubsNav
      marketingHubCollections={
        collectionsHubs ? collectionsHubs.slice(0, 6) : []
      }
    />
  )
}
