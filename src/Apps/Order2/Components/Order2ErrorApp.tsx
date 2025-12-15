import {
  Box,
  type BoxProps,
  Column,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { responsiveColumnsProps } from "Apps/Order2/Utils/responsiveColumnProps"
import { ERROR_MESSAGES as BASE_ERROR_MESSAGES } from "Components/ErrorPage"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"

interface OrderErrorAppProps extends BoxProps {
  code?: number
  message?: string
  detail?: string
}

export const OrderErrorApp: React.FC<
  React.PropsWithChildren<OrderErrorAppProps>
> = ({ code = 404, message, detail, children, ...rest }) => {
  // We assume string codes are client exceptions
  const headline =
    typeof code === "number" ? ERROR_MESSAGES[code] : "Internal Error"

  return (
    <Box data-testid="order-error-page" {...rest}>
      <GridColumns
        py={responsiveColumnsProps(0, 4)}
        px={responsiveColumnsProps(0, 4)}
      >
        <Column span={6} wrap>
          <Spacer y={responsiveColumnsProps(2, 4)} />
          <Text variant="xl">{headline}</Text>

          <Text variant="xl" color="mono60">
            {code}
          </Text>

          <Spacer y={4} />

          {message && <Text>{message}</Text>}

          <Spacer y={2} />

          <Text variant="sm-display" color="mono60">
            Please contact{" "}
            <RouterLink inline to="mailto:support@artsy.net">
              support@artsy.net
            </RouterLink>{" "}
            with any questions.
          </Text>
          <Text variant="sm-display" color="mono60">
            <RouterLink to="/">Go to Artsy Homepage</RouterLink>
          </Text>
        </Column>
      </GridColumns>
    </Box>
  )
}

const ERROR_MESSAGES: Record<number, string> = {
  ...BASE_ERROR_MESSAGES,
  401: "Sorry, you don't have permission to view this order.",
  404: "Sorry, we couldn't find that order.",
}
