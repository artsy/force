import { Flex, Label } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { ExclusiveAccessBadge_artwork$key } from "__generated__/ExclusiveAccessBadge_artwork.graphql"

interface ExclusiveAccessBadgeProps {
  artwork: ExclusiveAccessBadge_artwork$key
}

export const ExclusiveAccessBadge: React.FC<ExclusiveAccessBadgeProps> = ({
  artwork,
}) => {
  const data = useFragment(exclusiveAccessBadgeFragment, artwork)

  if (!data.isUnlisted) {
    return null
  }

  return (
    <Flex position="absolute" left={1} bottom={1}>
      <Label>Exclusive Access</Label>
    </Flex>
  )
}

const exclusiveAccessBadgeFragment = graphql`
  fragment ExclusiveAccessBadge_artwork on Artwork {
    isUnlisted
  }
`
