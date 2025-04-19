import { Avatar, Box, type BoxProps } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import type { CollectorProfileHeaderAvatar_me$data } from "__generated__/CollectorProfileHeaderAvatar_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface CollectorProfileHeaderAvatarProps extends BoxProps {
  me: CollectorProfileHeaderAvatar_me$data
}

const CollectorProfileHeaderAvatar: React.FC<
  React.PropsWithChildren<CollectorProfileHeaderAvatarProps>
> = ({ me, ...rest }) => {
  const image = (me.icon?.versions?.length ?? 0) > 0 ? me.icon?.cropped : null

  const avatar = {
    initials: me.initials ?? "U",
    border: "1px solid",
    borderColor: "mono10",
    ...(image ? { src: image.src, srcSet: image.srcSet } : {}),
  }

  return (
    <Box {...rest}>
      <Media lessThan="sm">
        <Avatar size="xs" {...avatar} />
      </Media>

      <Media greaterThanOrEqual="sm">
        <Avatar size="md" {...avatar} />
      </Media>
    </Box>
  )
}

export const CollectorProfileHeaderAvatarFragmentContainer =
  createFragmentContainer(CollectorProfileHeaderAvatar, {
    me: graphql`
      fragment CollectorProfileHeaderAvatar_me on Me {
        initials
        icon {
          internalID
          versions
          cropped(height: 100, width: 100) {
            src
            srcSet
          }
        }
      }
    `,
  })
