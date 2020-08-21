import { Separator } from "@artsy/palette/dist/elements/Separator"
import { color } from "@artsy/palette/dist/helpers/color"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { Box } from "@artsy/palette/dist/elements/Box"
import React from "react"

const FilterSidebarSection: React.SFC<any> = props => {
  return (
    <>
      <Box
        width={80}
        height={14}
        style={{ marginBottom: "15px", backgroundColor: color("black10") }}
      />
      <Flex alignItems="center" mt={10}>
        <Box width={20} height={20} bg={color("black10")} mr={1} />
        <Box width={100} height={17} bg={color("black10")} />
      </Flex>
      <Flex alignItems="center" mt={10}>
        <Box width={20} height={20} bg={color("black10")} mr={1} />
        <Box width={100} height={17} bg={color("black10")} />
      </Flex>
      <Flex alignItems="center" mt={10}>
        <Box width={20} height={20} bg={color("black10")} mr={1} />
        <Box width={100} height={17} bg={color("black10")} />
      </Flex>
      <Flex alignItems="center" mt={10}>
        <Box width={20} height={20} bg={color("black10")} mr={1} />
        <Box width={100} height={17} bg={color("black10")} />
      </Flex>
    </>
  )
}

export const FilterSidebar: React.SFC<any> = props => {
  return (
    <Box display={["none", "block"]} width="25%" pl={[0, 20]} pr={10} mr={10}>
      <FilterSidebarSection />
      <Separator mt={3} mb={3} />
      <FilterSidebarSection />
      <Separator mt={3} mb={3} />
      <FilterSidebarSection />
    </Box>
  )
}
