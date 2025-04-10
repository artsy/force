import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { useRouter } from "System/Hooks/useRouter"
import { Jump } from "Utils/Hooks/useJump"
import type * as React from "react"

export const ViewingRoomTabBar: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
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
