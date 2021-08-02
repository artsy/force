import { Box, Image, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { PastEventRailCell_fair } from "v2/__generated__/PastEventRailCell_fair.graphql"

interface PastEventRailCellProps {
  fair: PastEventRailCell_fair
}

export const PastEventRailCell: React.FC<PastEventRailCellProps> = props => {
  const { fair } = props

  return (
    <RouterLink to={`/fair/${fair.slug}`} textDecoration="none">
      {fair.image?.cropped?.src ? (
        <Image
          src={fair.image.cropped.src}
          srcSet={fair.image.cropped.srcSet}
          width={fair.image.cropped.width}
          height={fair.image.cropped.height}
          lazyLoad
          alt={fair.name!}
        />
      ) : (
        <Box width={325} height={240} bg="black10" />
      )}
      <Text variant="xl" mt={1}>
        {fair.name}
      </Text>
    </RouterLink>
  )
}

export const PastEventRailCellFragmentContainer = createFragmentContainer(
  PastEventRailCell,
  {
    fair: graphql`
      fragment PastEventRailCell_fair on Fair {
        slug
        name
        image {
          cropped(width: 325, height: 240) {
            width
            height
            src
            srcSet
          }
        }
      }
    `,
  }
)
