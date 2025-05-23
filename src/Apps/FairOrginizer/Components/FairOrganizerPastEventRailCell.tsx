import { Box, Image, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { FairOrganizerPastEventRailCell_fair$data } from "__generated__/FairOrganizerPastEventRailCell_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairOrganizerPastEventRailCellProps {
  fair: FairOrganizerPastEventRailCell_fair$data
}

export const FairOrganizerPastEventRailCell: React.FC<
  React.PropsWithChildren<FairOrganizerPastEventRailCellProps>
> = props => {
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
        <Box width={325} height={244} bg="mono10" />
      )}
      <Text variant="xl" width={325} mt={1}>
        {fair.name}
      </Text>
    </RouterLink>
  )
}

export const FairOrganizerPastEventRailCellFragmentContainer =
  createFragmentContainer(FairOrganizerPastEventRailCell, {
    fair: graphql`
      fragment FairOrganizerPastEventRailCell_fair on Fair {
        slug
        name
        image {
          cropped(width: 325, height: 244) {
            width
            height
            src
            srcSet
          }
        }
      }
    `,
  })
