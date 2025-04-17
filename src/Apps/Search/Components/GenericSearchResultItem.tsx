import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { BorderBox, Box, Flex, Image, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Components/RouterLink"
import type React from "react"
import { useTracking } from "react-tracking"
import styled from "styled-components"

interface GenericSearchResultItemProps {
  imageUrl: string
  name: string
  description?: string
  href: string
  entityType: string
  term: string
  index: number
  id: string
}

export const GenericSearchResultItem: React.FC<
  React.PropsWithChildren<GenericSearchResultItemProps>
> = ({ imageUrl, name, description, href, entityType, term, index, id }) => {
  const tracking = useTracking()

  const translateEntityType = (anEntityType: string) => {
    switch (anEntityType) {
      case "PartnerShow":
        return "Show"
      default:
        return anEntityType
    }
  }

  const trackEvent = () => {
    const trackingData = {
      action_type: DeprecatedSchema.ActionType.SelectedItemFromSearchPage,
      query: term,
      item_number: index,
      item_type: entityType,
      item_id: id,
      destination_path: href,
    }

    tracking.trackEvent(trackingData)
  }

  return (
    <RouterLink to={href} textDecoration="none" onClick={trackEvent}>
      <ItemRow py={2}>
        <Flex flexDirection="row">
          <Box width={72} height={72} mr={2}>
            <BorderBox width={72} height={72} p={0}>
              {imageUrl && entityType !== "City" && (
                <Image
                  lazyLoad
                  width={70}
                  height={70}
                  src={imageUrl}
                  alt={name}
                />
              )}
            </BorderBox>
          </Box>

          <Box>
            <Text variant="xs" color="mono60" mb={0.5}>
              {translateEntityType(entityType)}
            </Text>

            <Text size="md">{name}</Text>

            {description && (
              <Text mt={0.5} variant="sm" color="mono60" lineClamp={3}>
                {description}
              </Text>
            )}
          </Box>
        </Flex>
      </ItemRow>
    </RouterLink>
  )
}

const ItemRow = styled(Box)`
  &:hover {
    background-color: ${themeGet("colors.mono5")};
  }
`
