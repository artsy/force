import * as React from "react"
import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { ProfileIcon } from "v2/Components/ProfileIcon"

interface FairHeaderProps extends BoxProps {
  stuck?: boolean
  fair: FairHeader_fair
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair, stuck }) => {
  const { name, exhibitionPeriod, profile } = fair

  return (
    <Flex
      py={1}
      border="1px solid transparent"
      borderBottomColor={stuck ? "black10" : "transparent"}
    >
      <ProfileIcon
        profile={{ icon: profile?.icon, name: name! }}
        stuck={stuck}
        mr={2}
      />
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Text as="h1" variant={stuck ? "lg" : ["lg", "xl"]}>
          {name}
        </Text>
        {!stuck && (
          <Text variant={["lg", "xl"]} color="black60">
            {exhibitionPeriod}
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      name
      exhibitionPeriod
      profile {
        icon {
          desktop: cropped(width: 80, height: 80, version: "square140") {
            src
            srcSet
            size: width
          }

          mobile: cropped(width: 60, height: 60, version: "square140") {
            src
            srcSet
            size: width
          }

          sticky: cropped(width: 50, height: 50, version: "square140") {
            src
            srcSet
            size: width
          }
        }
      }
    }
  `,
})
