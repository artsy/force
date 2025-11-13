import { Avatar, Skeleton } from "@artsy/palette"
import type { NavBarUserMenuAvatarQuery } from "__generated__/NavBarUserMenuAvatarQuery.graphql"
import type { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

type NavBarUserMenuAvatarProps = {}

export const NavBarUserMenuAvatar: FC<
  React.PropsWithChildren<NavBarUserMenuAvatarProps>
> = () => {
  const { me } = useLazyLoadQuery<NavBarUserMenuAvatarQuery>(
    QUERY,
    {},
    { fetchPolicy: "store-and-network" }
  )

  if (!me) return <Avatar size="xs" />

  const img = me.icon?.resized

  return (
    <Avatar
      size="xs"
      initials={me.initials ?? "U"}
      {...img}
      border="1px solid"
      borderColor="mono10"
    />
  )
}

export const NavBarUserMenuAvatarSkeleton: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <Avatar size="xs" bg="mono10" border="1px solid" borderColor="mono10" />
    </Skeleton>
  )
}

const QUERY = graphql`
  query NavBarUserMenuAvatarQuery {
    me {
      initials
      icon {
        resized(height: 45, width: 45, version: "large_square") {
          src
          srcSet
        }
      }
    }
  }
`
