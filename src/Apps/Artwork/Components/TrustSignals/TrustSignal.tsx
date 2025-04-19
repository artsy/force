import { Clickable, Flex, type FlexProps, Text } from "@artsy/palette"
import type { FC } from "react"

export interface TrustSignalProps extends Omit<FlexProps, "flexDirection"> {
  Icon: JSX.Element
  label: string
  description: string | JSX.Element
  onClick?: () => void
}

export const TrustSignal: FC<React.PropsWithChildren<TrustSignalProps>> = ({
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
        {onClick ? (
          <Clickable onClick={onClick} textDecoration="underline">
            <Text variant="xs" color="mono100">
              {label}
            </Text>
          </Clickable>
        ) : (
          <Text variant="xs" color="mono100">
            {label}
          </Text>
        )}

        <Text variant="xs" color="mono60">
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}
