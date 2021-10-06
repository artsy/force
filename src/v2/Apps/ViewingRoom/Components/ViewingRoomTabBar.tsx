import React from "react"
import { useRouter } from "v2/System/Router/useRouter"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"

export const ViewingRoomTabBar: React.FC = () => {
  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  return (
    <div id="scrollTo--ViewingRoomTabBar">
      <RouteTabs fill>
        <RouteTab to={`/viewing-room/${slug}`}>Statement</RouteTab>
        <RouteTab to={`/viewing-room/${slug}/artworks`}>Works</RouteTab>
      </RouteTabs>
    </div>
  )
}
