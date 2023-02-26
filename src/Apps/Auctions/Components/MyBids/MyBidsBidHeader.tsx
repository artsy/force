import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBidsBidHeader_sale$data } from "__generated__/MyBidsBidHeader_sale.graphql"
import { Box, Image, Text, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useTracking } from "react-tracking"
import { ContextModule, clickedEntityGroup, OwnerType } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"

interface MyBidsBidHeaderProps {
  sale: MyBidsBidHeader_sale$data
}

export const MyBidsBidHeader: React.FC<MyBidsBidHeaderProps> = ({ sale }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const image = sale.coverImage?.cropped

  const auctionURL = `/auction/${sale.slug}`

  return (
    <RouterLink
      to={auctionURL}
      noUnderline
      onClick={() => {
        trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.yourActiveBids,
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            contextPageOwnerType,
            destinationPageOwnerType: OwnerType.sale,
            type: "thumbnail",
          })
        )
      }}
    >
      {image ? (
        <Image
          width="100%"
          height={100}
          src={image.src}
          srcSet={image.srcSet}
          lazyLoad
        />
      ) : (
        <Box bg="black10" height={100} />
      )}

      <Spacer y={1} />

      <Box px={2}>
        {sale.partner && <Text variant="xs">{sale.partner.name}</Text>}

        <Spacer y={1} />

        <Text variant="lg-display">{sale.name}</Text>

        <Text variant="lg-display" color="black60">
          {sale.formattedStartDateTime}
        </Text>
      </Box>
    </RouterLink>
  )
}

export const MyBidsBidHeaderFragmentContainer = createFragmentContainer(
  MyBidsBidHeader,
  {
    sale: graphql`
      fragment MyBidsBidHeader_sale on Sale {
        coverImage {
          cropped(
            width: 330
            height: 100
            version: ["source", "wide", "large_rectangle"]
          ) {
            src
            srcSet
          }
        }
        formattedStartDateTime
        name
        partner {
          name
        }
        slug
      }
    `,
  }
)
