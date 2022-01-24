import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NearbyGalleriesRail_partners } from "v2/__generated__/NearbyGalleriesRail_partners.graphql"
import { NearbyGalleriesRailRendererQuery } from "v2/__generated__/NearbyGalleriesRailRendererQuery.graphql"
import { Carousel } from "../Carousel"
import { useSystemContext } from "v2/System"
import { NearbyGalleryCardFragmentContainer } from "./NearbyGalleryCard"
import { NearbyGalleriesRailPlaceholder } from "./NearbyGalleriesRailPlaceholder"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { compact } from "lodash"

interface NearbyGalleriesRailProps extends BoxProps {
  partners: NearbyGalleriesRail_partners
  city: string | null
}

const NearbyGalleriesRail: React.FC<NearbyGalleriesRailProps> = ({
  partners,
  city,
  ...rest
}) => {
  if (!partners || partners.length === 0) {
    return null
  }

  const partnerList = compact(partners.map(c => c.node))

  return (
    <Box {...rest}>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Text variant="lg">Nearby Galleries</Text>
      </Flex>

      <Carousel itemsPerViewport={[2, 2, 3]}>
        {partnerList.map(node => {
          return (
            <NearbyGalleryCardFragmentContainer
              key={node.id}
              width={[300, "100%"]}
              partner={node}
              city={city}
            />
          )
        })}
      </Carousel>
    </Box>
  )
}

const NearbyGalleriesRailFragmentContainer = createFragmentContainer(
  NearbyGalleriesRail,
  {
    partners: graphql`
      fragment NearbyGalleriesRail_partners on PartnerEdge
        @relay(plural: true) {
        node {
          id
          slug
          ...NearbyGalleryCard_partner
        }
      }
    `,
  }
)

export const NearbyGalleriesRailRenderer: React.FC<
  {
    near: string
  } & Omit<NearbyGalleriesRailProps, "partners">
> = ({ near, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<NearbyGalleriesRailRendererQuery>
      lazyLoad
      environment={relayEnvironment}
      placeholder={<NearbyGalleriesRailPlaceholder {...rest} count={9} />}
      query={graphql`
        query NearbyGalleriesRailRendererQuery($near: String!) {
          partnersConnection(
            first: 12
            near: $near
            eligibleForListing: true
            defaultProfilePublic: true
            sort: RANDOM_SCORE_DESC
          ) {
            edges {
              ...NearbyGalleriesRail_partners
            }
          }
        }
      `}
      variables={{ near }}
      render={({ error, props }) => {
        if (error || !props)
          return <NearbyGalleriesRailPlaceholder {...rest} count={9} />

        return (
          <NearbyGalleriesRailFragmentContainer
            {...rest}
            {...props}
            partners={compact(props?.partnersConnection?.edges)}
          />
        )
      }}
    />
  )
}
