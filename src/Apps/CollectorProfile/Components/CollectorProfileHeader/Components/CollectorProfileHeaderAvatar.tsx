import { Avatar, Flex, UserSingleIcon } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { CollectorProfileHeaderAvatar_me$data } from "__generated__/CollectorProfileHeaderAvatar_me.graphql"

interface CollectorProfileHeaderAvatarProps {
  me: CollectorProfileHeaderAvatar_me$data
}

const CollectorProfileHeaderAvatar: React.FC<CollectorProfileHeaderAvatarProps> = ({
  me,
}) => {
  if (!me.icon?.resized?.src) {
    return <NoAvatarComponent />
  }

  return (
    <>
      <Media lessThan="sm">
        <Avatar size="xs" lazyLoad {...me.icon.resized} mr={[1, 2]} />
      </Media>

      <Media greaterThanOrEqual="sm">
        <Avatar size="md" lazyLoad {...me.icon.resized} mr={[1, 2]} />
      </Media>
    </>
  )
}

export const CollectorProfileHeaderAvatarFragmentContainer = createFragmentContainer(
  CollectorProfileHeaderAvatar,
  {
    me: graphql`
      fragment CollectorProfileHeaderAvatar_me on Me {
        icon {
          resized(height: 200, width: 200, version: "large_square") {
            src
            srcSet
          }
        }
      }
    `,
  }
)

const NoAvatarComponent: React.FC = () => {
  return (
    <Flex
      height={[45, 100]}
      width={[45, 100]}
      borderRadius="50%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="black10"
      mr={[1, 2]}
    >
      <UserSingleIcon />
    </Flex>
  )
}
