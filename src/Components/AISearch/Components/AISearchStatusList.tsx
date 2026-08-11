import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { FC } from "react"
import styled, { keyframes } from "styled-components"

const THINKING_STATUS = "Thinking…"

interface AISearchStatusListProps {
  /** Tool-call summaries, appended as the agent streams them */
  statuses: string[]
  isComplete: boolean
}

export const AISearchStatusList: FC<AISearchStatusListProps> = ({
  statuses,
  isComplete,
}) => {
  // Tool calls only start arriving a beat into the turn; keep the shimmer up
  // until the first one lands so the response never looks stalled.
  const visible =
    statuses.length === 0 && !isComplete ? [THINKING_STATUS] : statuses

  return (
    <Box>
      {visible.map((status, index) => {
        const isActive = !isComplete && index === visible.length - 1

        return (
          // Summaries repeat verbatim across tool calls, so index-key here
          <Flex key={index} alignItems="center" py="2px">
            <Box width={18} height={18} mr={1} flexShrink={0}>
              {!isActive && <CheckmarkIcon fill="mono40" />}
            </Box>

            {isActive ? (
              <ShimmerText variant="sm-display">{status}</ShimmerText>
            ) : (
              <Text variant="sm-display" color="mono60">
                {status}
              </Text>
            )}
          </Flex>
        )
      })}
    </Box>
  )
}

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
`

const ShimmerText = styled(Text)`
  background: linear-gradient(
    90deg,
    ${themeGet("colors.mono60")} 0%,
    ${themeGet("colors.mono100")} 40%,
    ${themeGet("colors.mono100")} 60%,
    ${themeGet("colors.mono60")} 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${shimmer} 1.6s linear infinite;
`
