import React from "react"
import { Box, Flex, Image, Link, Text, BorderBox } from "@artsy/palette"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

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

@track()
export class GenericSearchResultItem extends React.Component<
  GenericSearchResultItemProps
> {
  @track((props: GenericSearchResultItemProps) => ({
    action_type: Schema.ActionType.SelectedItemFromSearchPage,
    query: props.term,
    item_number: props.index,
    item_type: props.entityType,
    item_id: props.id,
    destination_path: props.href,
  }))
  handleClick() {
    // no-op
  }

  render() {
    const { imageUrl, href, name, description, entityType } = this.props
    const translateEntityType = anEntityType => {
      switch (anEntityType) {
        case "PartnerShow":
          return "Show"
        default:
          return anEntityType
      }
    }

    return (
      <Link href={href} underlineBehavior="none" onClick={this.handleClick}>
        <ItemRow py={2}>
          <Flex px={[0, 4]} flexDirection="row">
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
              <Text variant="xs" color="black60" mb={0.5}>
                {translateEntityType(entityType)}
              </Text>

              <Text size="md">{name}</Text>

              {description && (
                <Text mt={0.5} variant="sm" color="black60" lineClamp={3}>
                  {description}
                </Text>
              )}
            </Box>
          </Flex>
        </ItemRow>
      </Link>
    )
  }
}

const ItemRow = styled(Box)`
  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`
