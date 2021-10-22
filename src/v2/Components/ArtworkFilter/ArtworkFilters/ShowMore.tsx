import { Clickable, Text, TextVariant, useThemeConfig } from "@artsy/palette"
import { Children, isValidElement, useState } from "react";
import * as React from "react";

interface ShowMoreProps {
  initial?: number
  expanded?: boolean
}

export const INITIAL_ITEMS_TO_SHOW = 6

export const ShowMore: React.FC<ShowMoreProps> = ({
  initial = INITIAL_ITEMS_TO_SHOW,
  children,
  expanded = false,
}) => {
  const nodes = Children.toArray(children).filter(isValidElement)
  const hasMore = nodes.length > initial

  const [isExpanded, setExpanded] = useState(expanded)

  const tokens = useThemeConfig({
    v2: { variant: "small" as TextVariant },
    v3: { variant: "xs" as TextVariant },
  })

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      {hasMore && (
        <Clickable
          mt={1}
          textDecoration="underline"
          textAlign="left"
          onClick={() => setExpanded(visibility => !visibility)}
        >
          <Text variant={tokens.variant}>
            {isExpanded ? "Hide" : "Show more"}
          </Text>
        </Clickable>
      )}
    </>
  )
}
