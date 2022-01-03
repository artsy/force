import { Hit } from "react-instantsearch-core"
import { Box, Flex, Image, Text, BorderBox } from "@artsy/palette"
import { useRouter } from "v2/System/Router/useRouter"
import { AlgoliaHit } from "v2/Apps/Algolia/types"
import * as Schema from "v2/System/Analytics/Schema"

import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import { AlgoliaHighlightText } from "./AlgoliaHighlightText"

interface AlgoliaResultItemProps {
  hit: Hit<AlgoliaHit>
  entityType: string
  position: number
}

const translateEntityType = (anEntityType: string) => {
  switch (anEntityType) {
    case "PartnerShow":
      return "Show"
    default:
      return anEntityType
  }
}

export const AlgoliaResultItem: React.FC<AlgoliaResultItemProps> = ({
  hit,
  entityType,
  position,
}) => {
  const { match } = useRouter()
  const tracking = useTracking()

  const trackEvent = () => {
    const trackingData = {
      action_type: Schema.ActionType.SelectedItemFromSearchPage,
      query: match.location.query?.query,
      item_number: position,
      item_type: entityType,
      item_id: hit.objectID,
      destination_path: hit.href,
    }

    tracking.trackEvent(trackingData)
  }

  return (
    <RouterLink to={hit.href} textDecoration="none" onClick={trackEvent}>
      <ItemRow py={2}>
        <Flex flexDirection="row">
          <Box width={72} height={72} mr={2}>
            <BorderBox width={72} height={72} p={0}>
              {hit.image_url && entityType !== "City" && (
                <Image
                  lazyLoad
                  width={70}
                  height={70}
                  src={hit.image_url!}
                  alt={hit.name}
                />
              )}
            </BorderBox>
          </Box>

          <Box>
            <Text variant="xs" color="black60" mb={0.5}>
              {translateEntityType(entityType)}
            </Text>

            <AlgoliaHighlightText hit={hit} attribute="name" variant="md" />

            {hit.description && (
              <AlgoliaHighlightText
                hit={hit}
                attribute="description"
                mt={0.5}
                variant="sm"
                color="black60"
                lineClamp={3}
              />
            )}
          </Box>
        </Flex>
      </ItemRow>
    </RouterLink>
  )
}

const ItemRow = styled(Box)`
  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`
