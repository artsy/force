import * as React from "react"
import styled from "styled-components"

import {
  Flex,
  FlexProps,
  LockIcon,
  Text,
  StackableBorderBox,
  Clickable,
} from "@artsy/palette"
import { order } from "styled-system"

export interface StepSummaryItemProps extends FlexProps {
  title?: React.ReactNode
  onChange?: () => void
  orderSource?: string | null
  locked?: boolean
}

const LockIconPositioner = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
`

export const StepSummaryItem: React.SFC<StepSummaryItemProps> = ({
  title,
  onChange,
  orderSource,
  children,
  locked,
  ...others
}) => {
  const showHeading = title || (onChange && !locked)
  const allowChangeShipping =
    !locked && onChange && orderSource !== "private_sale"

  return (
    <StackableBorderBox
      flexDirection="column"
      {...others}
      style={{ position: "relative" }}
    >
      {showHeading && (
        <Flex justifyContent="space-between" alignItems="baseline" mb={1}>
          {title && (
            <Text
              variant={["xs", "sm-display"]}
              fontWeight="bold"
              color="black100"
            >
              {title}
            </Text>
          )}
          {orderSource !== "private_sale" && (
            <Clickable
              data-test="change-link"
              textDecoration="underline"
              onClick={onChange}
            >
              <Text variant="xs">Change</Text>
            </Clickable>
          )}
          {locked && <LockIcon />}
        </Flex>
      )}
      {!showHeading && locked && (
        <LockIconPositioner p={2}>
          <LockIcon />
        </LockIconPositioner>
      )}
      {children}
    </StackableBorderBox>
  )
}
