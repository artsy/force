import {
  Text,
  Spacer,
  Button,
  Flex,
  Skeleton,
  SkeletonText,
  SkeletonBox,
  ResponsiveBox,
  Box,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import GridItem from "Components/Artwork/GridItem"
import { extractNodes } from "Utils/extractNodes"
import { ShowsCurrentShow_show$data } from "__generated__/ShowsCurrentShow_show.graphql"
import { Masonry } from "Components/Masonry"
import { RouterLink } from "System/Components/RouterLink"

interface ShowsCurrentShowProps {
  show: ShowsCurrentShow_show$data
}

const ShowsCurrentShow: React.FC<ShowsCurrentShowProps> = ({ show }) => {
  const artworks = extractNodes(show.artworksConnection)
  const count = show.artworksConnection?.totalCount ?? 0
  const remaining = count - 15
  const dateRange = [show.startAt, show.endAt].filter(Boolean).join(" – ")
  const subtitle = [dateRange, show.location?.city].filter(Boolean).join(", ")

  return (
    <>
      <RouterLink to={show.href} textDecoration="none" display="block">
        {show.partner?.name && (
          <Text variant="lg-display">{show.partner?.name}</Text>
        )}

        <Text variant="lg-display" color="black60">
          {show.name}
        </Text>

        <Spacer y={1} />

        <Text variant="sm-display">{subtitle}</Text>
      </RouterLink>

      <Spacer y={4} />

      <Masonry columnCount={[2, 3, 4]}>
        {artworks.map(artwork => {
          return (
            <React.Fragment key={artwork.internalID}>
              <GridItem artwork={artwork} />

              <Spacer y={4} />
            </React.Fragment>
          )
        })}
      </Masonry>

      {remaining > 0 && (
        <Flex flexDirection="column" justifyContent="center">
          <Spacer y={2} />

          <Button
            variant="secondaryBlack"
            m="auto"
            // @ts-ignore
            as={RouterLink}
            to={show.href}
          >
            {remaining} more artwork{remaining === 1 ? "" : "s"}
          </Button>
        </Flex>
      )}
    </>
  )
}

export const ShowsCurrentShowFragmentContainer = createFragmentContainer(
  ShowsCurrentShow,
  {
    show: graphql`
      fragment ShowsCurrentShow_show on Show {
        name
        href
        startAt(format: "MMM D")
        endAt(format: "MMM D")
        partner {
          ... on Partner {
            name
          }
          ... on ExternalPartner {
            name
          }
        }
        location {
          city
        }
        artworksConnection(first: 15) {
          totalCount
          edges {
            node {
              internalID
              ...GridItem_artwork
            }
          }
        }
      }
    `,
  }
)

export const ShowsCurrentShowPlaceholder: React.FC = () => (
  <Skeleton>
    <SkeletonText variant="lg-display">Partner Name</SkeletonText>

    <SkeletonText variant="lg-display">Name of the Show</SkeletonText>

    <Spacer y={1} />

    <SkeletonText variant="sm-display">Jan 0 – Feb 0, City Name</SkeletonText>

    <Spacer y={4} />

    <Masonry columnCount={[2, 3, 4]}>
      {[...new Array(11)].map((_, i) => {
        return (
          <Box key={i}>
            <ResponsiveBox
              aspectHeight={[4, 3, 3.5, 4.25, 9][i % 5]}
              aspectWidth={[3, 4, 4.5, 3.25, 16][i % 5]}
              maxWidth="100%"
            >
              <SkeletonBox width="100%" height="100%" />
            </ResponsiveBox>

            <Spacer y={1} />

            <SkeletonText variant="sm-display">Artist Name</SkeletonText>
            <SkeletonText variant="sm-display">
              Title of Artwork, 1900
            </SkeletonText>
            <SkeletonText variant="xs">Partner Name</SkeletonText>
            <SkeletonText variant="xs">$00,000</SkeletonText>

            <Spacer y={4} />
          </Box>
        )
      })}
    </Masonry>
  </Skeleton>
)
