import React, { Children, isValidElement, useState } from "react"
import { FilterLink } from "./FilterLink"

interface ShowMoreProps {
  initial?: number
  expanded?: boolean
  children: JSX.Element[]
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

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      {hasMore && (
        <FilterLink onClick={() => setExpanded(visibility => !visibility)}>
          {isExpanded ? "Hide" : "Show more"}
        </FilterLink>
      )}
    </>
  )
}
