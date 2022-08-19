import { Box, Flex } from "@artsy/palette"
import styled from "styled-components"

export const DemandIndexBar: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const progressPercent = progress + "%"

  return (
    <Flex flexDirection="column">
      <Box width="100%" position="relative" height={20} left={-6}>
        <Box position="absolute" left={progressPercent}>
          <TriangleDown />
        </Box>
      </Box>

      <Box height={20} width="100%" bg="black15">
        <GradientBar height={20} width={progressPercent} />
      </Box>
    </Flex>
  )
}

const TriangleDown = () => {
  return (
    <svg width="11" height="6" viewBox="0 0 11 6" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 6L0 0L11 0L5.5 6Z"
        fill="#1023D7"
      />
    </svg>
  )
}

const GradientBar = styled(Box)`
  background: linear-gradient(90deg, #f3f0f8 2.6%, #1023d7 100%);
`
