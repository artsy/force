import {
  Box,
  Flex,
  Image,
  Link,
  Sans,
  Serif,
  Spacer,
  color,
} from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { Truncator } from "v2/Components/Truncator"
import React from "react"
import styled from "styled-components"
import { FallbackIcon } from "./FallbackIcon"

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
      <Link
        href={href}
        underlineBehavior="none"
        onClick={() => {
          this.handleClick()
        }}
      >
        <ItemRow>
          <Spacer pb={3} />
          <Flex pl={4} flexDirection="row">
            <Box height={70} width={70} mr={2}>
              <Flex
                style={{ backgroundColor: color("black10") }}
                height="100%"
                justifyContent="center"
                alignItems="center"
              >
                {imageUrl && entityType !== "City" ? (
                  <Image width={70} height={70} src={imageUrl} alt={name} />
                ) : (
                  <FallbackIcon entityType={entityType} />
                )}
              </Flex>
            </Box>

            <Box>
              <Sans color="black100" size="2" weight="medium">
                {translateEntityType(entityType)}
              </Sans>
              <Spacer mb={0.5} />

              <Serif color="black100" size="3">
                {name}
              </Serif>

              {description && (
                <>
                  <Spacer mb={0.5} />
                  <Serif color="black60" size="3" maxWidth={536}>
                    <Truncator maxLineCount={3}>{description}</Truncator>
                  </Serif>
                </>
              )}
            </Box>
          </Flex>
          <Spacer pb={3} />
        </ItemRow>
      </Link>
    )
  }
}

const ItemRow = styled(Box)`
  &:hover {
    background-color: ${color("black5")};
  }
`
