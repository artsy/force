import { ArtsyLogoBlackIcon, Box } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import React from "react"
import { useSystemContext } from "v2/System"

interface MinimalNavBarProps {
  to: string
  children: React.ReactNode
  isBlank?: boolean
}

export const MinimalNavBar: React.FC<MinimalNavBarProps> = props => {
  const { isEigen } = useSystemContext()
  return (
    <Box
      zIndex={1000}
      background="white"
      position="absolute"
      left={0}
      top={0}
      width="100%"
      pt={4}
    >
      {!props.isBlank && !isEigen && (
        <Box height={70} px={[2, 4]}>
          <RouterLink
            to={props.to}
            // TODO: figure out a minimal example of the underlying cause of this error
            // and submit an issue to TS 😓
            // @ts-ignore
            data-test="logoLink"
          >
            <ArtsyLogoBlackIcon />
          </RouterLink>
        </Box>
      )}

      {props.children}
    </Box>
  )
}
