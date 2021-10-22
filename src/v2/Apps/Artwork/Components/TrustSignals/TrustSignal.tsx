import { Clickable, Flex, FlexProps, Text } from "@artsy/palette"
import { FC } from "react";

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
        {onClick ? (
          <Clickable onClick={onClick} textDecoration="underline">
            <Text variant="xs" color="black100">
              {label}
            </Text>
          </Clickable>
        ) : (
          <Text variant="xs" color="black100">
            {label}
          </Text>
        )}

        <Text variant="xs" color="black60">
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}
