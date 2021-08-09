import React from "react"
import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderIconFragmentContainer } from "./FairHeaderIcon"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { FairTimingFragmentContainer as FairTiming } from "./FairTiming"
import { Media } from "v2/Utils/Responsive"

interface FairHeaderProps extends BoxProps {
  fair: FairHeader_fair
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair }) => {
  const { name } = fair

  return (
    <>
      {/* Desktop Fair Header */}
      <Media greaterThan="xs">
        <Flex my={4}>
          <FairHeaderIconFragmentContainer fair={fair} mr={2} />
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Text as="h1" variant="xl">
              {name}
            </Text>
            <FairTiming fair={fair} />
          </Box>
        </Flex>
      </Media>

      {/* Mobile Fair Header */}
      <Media at="xs">
        <Flex my={2}>
          <FairHeaderIconFragmentContainer fair={fair} mr={2} />
          <Box>
            <Text as="h1" variant="lg">
              {name}
            </Text>
            <FairTiming fair={fair} />
          </Box>
        </Flex>
      </Media>
    </>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      ...FairHeaderIcon_fair
      ...FairTiming_fair
      name
    }
  `,
})
