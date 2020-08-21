import React from "react"
import styled from "styled-components"

import { Flex, FlexProps } from "@artsy/palette/dist/elements/Flex"
import { LockIcon } from "@artsy/palette/dist/svgs/LockIcon"
import { Sans, Serif } from "@artsy/palette/dist/elements/Typography"
import { StackableBorderBox } from "@artsy/palette/dist/elements/StackableBorderBox"

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

export const StepSummaryItem: React.SFC<StepSummaryItemProps> = ({
  title,
  onChange,
  children,
  locked,
  ...others
}) => {
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
            <Serif size={["2", "3t"]} weight="semibold" color="black100">
              {title}
            </Serif>
          )}
          {!locked && onChange && (
            <Sans size="2">
              <a className="colorLink" onClick={onChange}>
                Change
              </a>
            </Sans>
          )}
          {locked && <LockIcon />}
        </Flex>
      )}
      {!showHeading && locked && (
        <LockIconPositioner p={[2, 3]}>
          <LockIcon />
        </LockIconPositioner>
      )}
      {children}
    </StackableBorderBox>
  )
}
