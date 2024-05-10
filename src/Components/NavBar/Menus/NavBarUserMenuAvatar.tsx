import { Avatar, Skeleton } from "@artsy/palette"
import { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { NavBarUserMenuAvatarQuery } from "__generated__/NavBarUserMenuAvatarQuery.graphql"

interface NavBarUserMenuAvatarProps {}

export const NavBarUserMenuAvatar: FC<NavBarUserMenuAvatarProps> = () => {
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
      borderColor="black10"
    />
  )
}

export const NavBarUserMenuAvatarSkeleton: FC = () => {
  return (
    <Skeleton>
      <Avatar size="xs" bg="black10" border="1px solid" borderColor="black10" />
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
