import React from "react"
import {
  Text as BaseText,
  Box,
  Flex,
  Spacer,
  TriangleDownIcon,
} from "@artsy/palette"
import styled from "styled-components"

export const DemandRank: React.FC<{ demandRank: number }> = ({
  demandRank,
}) => {
  const width = Math.min(demandRank * 100, 100)

  return (
    <Box>
      <Text>Demand Index</Text>
      <Box>
        <Text variant="largeTitle" color="white100">
          {demandRank}
        </Text>
      </Box>
      <ProgressBar width={width} />
      <Spacer my={0.3} />
      <Flex flexDirection="row" justifyContent="space-between">
        <Text>0.0</Text>
        <Text>{demandRank}</Text>
      </Flex>
    </Box>
  )
}

const ProgressBar: React.FC<{ width: number }> = ({ width }) => {
  const pctWidth = width + "%"

  return (
    <Box overflow="hidden">
      <Box width="100%" position="relative" height={10} left={-6}>
        <TriangleDownIcon fill="white100" left={pctWidth} position="absolute" />
      </Box>
      <Box height={20} width="100%" bg="black5">
        <Box
          width={pctWidth}
          height={24}
          className="card"
          style={{
            background:
              "linear-gradient(to right, rgba(10, 26, 180, 0.1), #066AE0)",
          }}
        />
      </Box>
    </Box>
  )
}

const Text = styled(BaseText)`
  color: white;
`
