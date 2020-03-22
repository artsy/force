import React from "react"
import { CollectionsHubsHomepageNav as ReactionHubsNav } from "reaction/Components/CollectionsHubsHomepageNav"

export const CollectionsHubsHomepageNav = ({ collectionsHubs }) => {
  return (
    <ReactionHubsNav
      marketingHubCollections={
        collectionsHubs ? collectionsHubs.slice(0, 6) : []
      }
    />
  )
}
