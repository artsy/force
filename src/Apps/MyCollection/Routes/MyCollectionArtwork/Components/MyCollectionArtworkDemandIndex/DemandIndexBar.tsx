import { Box, Flex } from "@artsy/palette"
import styled from "styled-components"
import { TriangleDownIcon } from "./TriangleDownIcon"
import { themeGet } from "@styled-system/theme-get"

export const DemandIndexBar: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const progressPercent = progress + "%"

  return (
    <Flex data-testid="demandIndexBar" flexDirection="column">
      <Box width="100%" position="relative" height={20} left={-6}>
        <Box position="absolute" left={progressPercent}>
          <TriangleDownIcon />
        </Box>
      </Box>

      <Box height={20} width="100%" bg="black15">
        <GradientBar height={20} width={progressPercent} />
      </Box>
    </Flex>
  )
}

const GradientBar = styled(Box)`
  background: linear-gradient(
    90deg,
    ${themeGet("colors.black5")} 2.6%,
    ${themeGet("colors.brand")} 100%
  );
`
