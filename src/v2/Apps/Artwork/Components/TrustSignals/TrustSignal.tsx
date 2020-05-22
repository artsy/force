import { Flex, FlexProps, Link, Sans } from "@artsy/palette"
import React, { FC } from "react"

export interface TrustSignalProps extends Omit<FlexProps, "flexDirection"> {
  Icon: JSX.Element
  label: string
  description: string | JSX.Element
  onClick?: () => void
}

export const TrustSignal: FC<TrustSignalProps> = ({
  Icon,
  label,
  description,
  onClick,
  ...other
}) => {
  return (
    <Flex {...other}>
      {Icon}
      <Flex flexDirection="column" ml={1}>
        <Link onClick={onClick}>
          <Sans size="2" weight="medium" color="black100">
            {label}
          </Sans>
        </Link>
        <Sans size="2" color="black60">
          {description}
        </Sans>
      </Flex>
    </Flex>
  )
}
