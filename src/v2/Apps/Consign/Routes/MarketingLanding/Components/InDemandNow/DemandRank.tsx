import React from "react"
import { Text, Box, Flex, Spacer } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

export const DemandRank: React.FC<{ demandRank: number }> = ({
  demandRank,
}) => {
  const width = Math.min(demandRank * 100, 100)

  return (
    <Box>
      <Text variant="xs" textTransform="uppercase">
        Demand Index
      </Text>

      <Text variant="xl" color="white100" mb={2}>
        {demandRank}
      </Text>

      <ProgressBar width={width} />

      <Spacer my={0.5} />

      <Flex flexDirection="row" justifyContent="space-between">
        <Text variant="xs">0.0</Text>
        <Text variant="xs">{demandRank}</Text>
      </Flex>
    </Box>
  )
}

const TriangleDown = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 6px solid ${themeGet("colors.white100")};
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
`

const ProgressBar: React.FC<{ width: number }> = ({ width }) => {
  const pctWidth = width + "%"

  return (
    <Box position="relative">
      <TriangleDown
        style={{ top: "-10px", left: pctWidth, transform: "translateX(-50%)" }}
      />

      <Box height={20} width="100%" bg="black5">
        <Box
          width={pctWidth}
          height="100%"
          className="card" // TODO: Why?
          style={{
            background:
              "linear-gradient(to right, rgba(10, 26, 180, 0.1), #066AE0)",
          }}
        />
      </Box>
    </Box>
  )
}
