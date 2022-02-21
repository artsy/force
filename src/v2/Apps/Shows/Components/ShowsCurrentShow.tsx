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
import GridItem from "v2/Components/Artwork/GridItem"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShowsCurrentShow_show$data } from "v2/__generated__/ShowsCurrentShow_show.graphql"
import { Masonry } from "v2/Components/Masonry"
import { RouterLink } from "v2/System/Router/RouterLink"

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
        {show.partner?.name && <Text variant="lg">{show.partner?.name}</Text>}

        <Text variant="lg" color="black60">
          {show.name}
        </Text>

        <Spacer mt={1} />

        <Text variant="md">{subtitle}</Text>
      </RouterLink>

      <Spacer mt={4} />

      <Masonry columnCount={[2, 3, 4]}>
        {artworks.map(artwork => {
          return (
            <React.Fragment key={artwork.internalID}>
              <GridItem artwork={artwork} />

              <Spacer mt={4} />
            </React.Fragment>
          )
        })}
      </Masonry>

      {remaining > 0 && (
        <Flex flexDirection="column" justifyContent="center">
          <Spacer mt={2} />

          <Button
            variant="secondaryOutline"
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
    <SkeletonText variant="lg">Partner Name</SkeletonText>

    <SkeletonText variant="lg">Name of the Show</SkeletonText>

    <Spacer mt={1} />

    <SkeletonText variant="md">Jan 0 – Feb 0, City Name</SkeletonText>

    <Spacer mt={4} />

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

            <Spacer mt={1} />

            <SkeletonText variant="md">Artist Name</SkeletonText>
            <SkeletonText variant="md">Title of Artwork, 1900</SkeletonText>
            <SkeletonText variant="xs">Partner Name</SkeletonText>
            <SkeletonText variant="xs">$00,000</SkeletonText>

            <Spacer mt={4} />
          </Box>
        )
      })}
    </Masonry>
  </Skeleton>
)
