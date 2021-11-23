import * as React from "react"
import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { ProfileIcon } from "v2/Components/ProfileIcon"
import styled from "styled-components"
import { fadeIn, fadeOut } from "v2/Assets/Animations"
import { Media } from "v2/Utils/Responsive"

interface FairHeaderProps extends BoxProps {
  stuck?: boolean
  fair: FairHeader_fair
}

const FadingText = styled(Text)<{ show: boolean }>`
  opacity: ${p => +p.show};
  animation: ${p => (p.show ? fadeIn : fadeOut)} 0.1s linear;
`

const ScalingText = styled(Text)<{ stuck: boolean }>`
  transform-origin: 0;
  transform: ${p => `scale(${p.stuck ? 0.7 : 1})`};
  transition: transform 0.2s;
`

const Title: React.FC<{ title: string | null; stuck: boolean }> = ({
  title,
  stuck,
}) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <ScalingText as="h1" variant={"xl"} stuck={stuck}>
          {title}
        </ScalingText>
      </Media>

      <Media lessThan="md">
        <Text as="h1" variant="lg">
          {title}
        </Text>
      </Media>
    </>
  )
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair, stuck = false }) => {
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
        <Title title={name} stuck={stuck} />
        <FadingText show={!stuck} variant={["lg", "xl"]} color="black60">
          {exhibitionPeriod}
        </FadingText>
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
