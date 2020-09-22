import { Flex, FlexProps, Link, Text } from "@artsy/palette"
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
        {/* FIXME: Remove this lint ignore */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link onClick={onClick}>
          <Text variant="caption" color="black100">
            {label}
          </Text>
        </Link>
        <Text variant="caption" color="black60">
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}
