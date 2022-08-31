import { GridColumns, Message, Text } from "@artsy/palette"
import React from "react"

interface SectionContainerProps {
  title: string
  children?: React.ReactNode
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  title,
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
        <Message variant="info">Nothing to Show</Message>
      )}
    </>
  )
}
