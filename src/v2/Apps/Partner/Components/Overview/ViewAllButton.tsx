import React from "react"
import { Text, TextProps } from "@artsy/palette"
import { ScrollIntoView } from "v2/Utils"

export interface ViewAllButtonProps extends TextProps {
  scrollTo?: string
  offset?: number
  title?: string
}

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({
  scrollTo,
  offset,
  title,
  ...rest
}) => {
  return (
    <ScrollIntoView selector={scrollTo} offset={offset}>
      <Text variant="text" color="black" {...rest}>
        {title}
      </Text>
    </ScrollIntoView>
  )
}

ViewAllButton.defaultProps = {
  title: "View all",
  scrollTo: "#jumpto--PartnerHeader",
}
