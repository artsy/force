import { Box, BoxProps, Shelf, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NearbyGalleriesRail_partners$data } from "__generated__/NearbyGalleriesRail_partners.graphql"
import { NearbyGalleriesRailRendererQuery } from "__generated__/NearbyGalleriesRailRendererQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { NearbyGalleriesRailPlaceholder } from "./NearbyGalleriesRailPlaceholder"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { compact } from "lodash"
import { CellPartnerFragmentContainer } from "Components/Cells/CellPartner"

interface NearbyGalleriesRailProps extends BoxProps {
  partners: NearbyGalleriesRail_partners$data
}

const NearbyGalleriesRail: React.FC<NearbyGalleriesRailProps> = ({
  partners,
  ...rest
}) => {
  if (!partners || partners.length === 0) {
    return null
  }

  const partnerList = compact(partners.map(c => c.node))

  return (
    <Box {...rest}>
      <Text variant="lg-display" mb={4}>
        Nearby Galleries
      </Text>

      <Shelf>
        {partnerList.map(node => {
          return (
            <CellPartnerFragmentContainer
              key={node.internalID}
              partner={node}
            />
          )
        })}
      </Shelf>
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
          ...CellPartner_partner
          internalID
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
