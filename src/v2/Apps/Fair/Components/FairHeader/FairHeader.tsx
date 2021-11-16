import * as React from "react"
import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderIconFragmentContainer } from "./FairHeaderIcon"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"

interface FairHeaderProps extends BoxProps {
  fair: FairHeader_fair
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair }) => {
  const { name, exhibitionPeriod } = fair

  return (
    <Flex mt={[2, 4]}>
      <FairHeaderIconFragmentContainer fair={fair} mr={2} />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Text as="h1" variant={["lg", "xl"]}>
          {name}
        </Text>
        <Text variant={["lg", "xl"]} color="black60">
          {exhibitionPeriod}
        </Text>
      </Box>
    </Flex>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      ...FairHeaderIcon_fair
      name
      exhibitionPeriod
    }
  `,
})
