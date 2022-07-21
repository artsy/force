import { ArtsyLogoBlackIcon, Flex, Text } from "@artsy/palette"
import * as React from "react"

export const ModalHeader: React.FC<{
  title?: string
  hasLogo?: boolean
}> = ({ hasLogo, title }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      {hasLogo && <ArtsyLogoBlackIcon mb={1} />}

      {title && (
        <Text variant="lg-display" my={2}>
          {title}
        </Text>
      )}
    </Flex>
  )
}
