import { GridColumns, Message, Text } from "@artsy/palette"
import React from "react"

interface SectionContainerProps {
  title: string
  children?: React.ReactNode
  emptyStateNote?: string
  emptyStateAction?: React.ReactNode
}

export const SectionContainer: React.FC<
  React.PropsWithChildren<SectionContainerProps>
> = ({
  children,
  title,
  emptyStateNote = "Nothing to Show",
  emptyStateAction,
}) => {
  const hasChildren = !!React.Children.count(children)

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        {title}
      </Text>

      {hasChildren ? (
        <GridColumns>{children}</GridColumns>
      ) : (
        <>
          <Message variant="info">{emptyStateNote}</Message>
          {emptyStateAction}
        </>
      )}
    </>
  )
}
