import * as React from "react"
import { useRouter } from "System/Hooks/useRouter"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { Jump } from "Utils/Hooks/useJump"

export const ViewingRoomTabBar: React.FC = () => {
  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  return (
    <Jump id="ViewingRoomTabBar">
      <RouteTabs fill>
        <RouteTab to={`/viewing-room/${slug}`}>Statement</RouteTab>
        <RouteTab to={`/viewing-room/${slug}/artworks`}>Works</RouteTab>
      </RouteTabs>
    </Jump>
  )
}
