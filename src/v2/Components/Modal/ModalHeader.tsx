import { ArtsyLogoBlackIcon, Flex, Serif, space } from "@artsy/palette"
import React, { FC } from "react"

export const ModalHeader: FC<{
  title?: string
  hasLogo?: boolean
}> = props => {
  const { hasLogo, title } = props

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      {hasLogo && (
        <ArtsyLogoBlackIcon fontSize="34px" display="block" mb={space(1)} />
      )}
      {title && (
        <Serif size="5" weight="semibold" pb={space(1)}>
          {title}
        </Serif>
      )}
    </Flex>
  )
}
