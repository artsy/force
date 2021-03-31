import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBidsBidHeader_sale } from "v2/__generated__/MyBidsBidHeader_sale.graphql"
import { Box, CalendarIcon, Flex, Image, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useTracking } from "react-tracking"
import { ContextModule, clickedEntityGroup, OwnerType } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy"

interface MyBidsBidHeaderProps {
  sale: MyBidsBidHeader_sale
}

export const MyBidsBidHeader: React.FC<MyBidsBidHeaderProps> = ({ sale }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  return (
    <RouterLink
      to={`/auction/${sale.slug}`}
      noUnderline
      onClick={() => {
        trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.yourActiveBids,
            contextPageOwnerType,
            destinationPageOwnerType: OwnerType.sale,
            type: "thumbnail",
          })
        )
      }}
    >
      {sale.coverImage && (
        <Box minHeight={100}>
          <Image
            width="100%"
            height={100}
            style={{ objectFit: "cover" }}
            src={sale.coverImage.resized.src}
            srcSet={sale.coverImage.resized.srcSet}
          />
        </Box>
      )}
      <Box px={2} pb={2} pt={1}>
        {sale.partner && (
          <Text variant="small" color="black60">
            {sale.partner.name}
          </Text>
        )}
        <Text variant="title">{sale.name}</Text>
        <Flex mt={1}>
          <CalendarIcon width={15} height={15} top="1px" mr={0.3} />
          <Text variant="text" color="black60">
            {sale.formattedStartDateTime}
          </Text>
        </Flex>
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
          resized(width: 300, height: 100) {
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
