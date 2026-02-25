import { type BoxProps, Clickable, Flex, Text } from "@artsy/palette"
import type * as React from "react"

export interface DefinitionListItem {
  term: string
  value: React.ReactNode
  onTermClick?: () => void
}

interface DefinitionListProps extends BoxProps {
  items: DefinitionListItem[]
}

export const DefinitionList: React.FC<DefinitionListProps> = ({
  items,
  ...rest
}) => {
  const displayItems = items.filter(
    item => item.value != null && item.value !== "",
  )

  if (displayItems.length === 0) {
    return null
  }

  return (
    <Flex as="dl" flexDirection="column" gap={1} {...rest}>
      {displayItems.map((item, index) => {
        const hasPlainTextValue = typeof item.value === "string"

        return (
          <Flex key={`${item.term}-${index}`} flexDirection={["column", "row"]}>
            <Text as="dt" variant="xs" width={150} flexShrink={0} mr={2}>
              {item.onTermClick ? (
                <Clickable
                  onClick={item.onTermClick}
                  textDecoration="underline"
                >
                  <Text as="span" variant="xs">
                    {item.term}
                  </Text>
                </Clickable>
              ) : (
                item.term
              )}
            </Text>

            <Flex as="dd" minWidth={0} flex={1} color="mono60">
              {hasPlainTextValue ? (
                <Text variant="xs">{item.value}</Text>
              ) : (
                item.value
              )}
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}
