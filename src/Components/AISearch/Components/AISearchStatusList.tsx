import { Flex, Text } from "@artsy/palette"
import type { AIAgentActivity } from "Components/AISearch/Utils/aiSearchTypes"
import { themeGet } from "@styled-system/theme-get"
import type { FC } from "react"
import styled, { keyframes } from "styled-components"

const ACTIVITY_LABELS: Record<AIAgentActivity, string> = {
  THINKING: "Thinking…",
  SEARCHING_ARTWORKS: "Searching for artworks…",
  SEARCHING_ARTISTS: "Searching for artists…",
  SEARCHING_SHOWS: "Searching for shows…",
  SEARCHING_FAIRS: "Searching for fairs…",
  FINDING_RECOMMENDATIONS: "Finding recommendations…",
  LOADING_ARTWORK_DETAILS: "Looking at the artwork…",
  SEARCHING_ARTSY: "Searching Artsy…",
}

interface AISearchStatusListProps {
  activity: AIAgentActivity | null
}

export const AISearchStatusList: FC<AISearchStatusListProps> = ({
  activity,
}) => {
  return (
    <Flex alignItems="center" py="2px">
      <ShimmerText variant="sm-display">
        {ACTIVITY_LABELS[activity ?? "THINKING"]}
      </ShimmerText>
    </Flex>
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
