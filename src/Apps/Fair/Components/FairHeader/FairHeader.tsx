import { type BoxProps, Column, Flex, GridColumns, Text } from "@artsy/palette"
import { HeaderIcon } from "Components/HeaderIcon"
import type { FairHeader_fair$data } from "__generated__/FairHeader_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairHeaderProps extends BoxProps {
  fair: FairHeader_fair$data
}

const FairHeader: React.FC<React.PropsWithChildren<FairHeaderProps>> = ({
  fair,
}) => {
  const { name, exhibitionPeriod, profile } = fair

  const avatar = profile?.icon?.url
  const isArtsyEditionShop = fair.slug === "the-artsy-edition-shop"

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

        {isArtsyEditionShop ? (
          <Text variant={["md", "lg-display"]} color="mono60">
            Your Chance to Own an Icon
          </Text>
        ) : (
          <Text variant={["lg-display", "xl"]} color="mono60">
            {exhibitionPeriod}
          </Text>
        )}
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
      slug
    }
  `,
})
