import LockIcon from "@artsy/icons/LockIcon"
import {
  Clickable,
  Flex,
  type FlexProps,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import type * as React from "react"
import styled from "styled-components"

export interface StepSummaryItemProps extends FlexProps {
  title?: React.ReactNode
  onChange?: () => void
  locked?: boolean
}

const LockIconPositioner = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
`

export const StepSummaryItem: React.FC<
  React.PropsWithChildren<StepSummaryItemProps>
> = ({ title, onChange, children, locked, ...others }) => {
  const showHeading = title || (onChange && !locked)

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
              color="mono100"
            >
              {title}
            </Text>
          )}
          {!locked && onChange && (
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
