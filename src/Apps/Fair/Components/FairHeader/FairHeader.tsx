import * as React from "react"
import { BoxProps, Column, Flex, GridColumns, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair$data } from "__generated__/FairHeader_fair.graphql"
import { HeaderIcon } from "Components/HeaderIcon"

interface FairHeaderProps extends BoxProps {
  fair: FairHeader_fair$data
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair }) => {
  const { name, exhibitionPeriod, profile } = fair

  const avatar = profile?.icon?.url

  return (
    <GridColumns>
      {avatar && (
        <Column span={[12, 12, 1]}>
          <Flex justifyContent={["center", "center", "left"]}>
            <HeaderIcon src={avatar} />
          </Flex>
        </Column>
      )}

      <Column
        span={avatar ? [12, 12, 10] : 12}
        textAlign={avatar ? ["center", "center", "left"] : "left"}
      >
        <Text as="h1" variant={["lg-display", "xl"]}>
          {name}
        </Text>

        <Text variant={["lg-display", "xl"]} color="black60">
          {exhibitionPeriod}
        </Text>
      </Column>
    </GridColumns>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      name
      exhibitionPeriod
      profile {
        icon {
          url(version: ["large", "square", "square140"])
        }
      }
    }
  `,
})
