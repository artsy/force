import * as React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { ProfileIcon } from "v2/Components/ProfileIcon"
import styled from "styled-components"
import { growAndFadeIn, shrinkAndFadeOut } from "v2/Assets/Animations"
import { Media } from "v2/Utils/Responsive"

const SUBTITLE_HEIGHT = "38px"

interface FairHeaderProps extends BoxProps {
  stuck?: boolean
  fair: FairHeader_fair
}

const FadingText = styled(Text)<{ show: boolean }>`
  transform-origin: 0 0;
  transform: ${p => `scale(${+p.show})`};
  transition: transform 0.2s;
  opacity: ${p => +p.show};
  height: ${p => (p.show ? SUBTITLE_HEIGHT : 0)};
  animation: ${p =>
      p.show
        ? growAndFadeIn(SUBTITLE_HEIGHT)
        : shrinkAndFadeOut(SUBTITLE_HEIGHT)}
    0.1s linear;
`

const ScalingText = styled(Text)<{ stuck: boolean }>`
  transform-origin: 0 0;
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
        <ScalingText as="h1" variant="xl" stuck={stuck}>
          {title}
        </ScalingText>
      </Media>

      <Media lessThan="md">
        <Text as="h1" variant="lg-display">
          {title}
        </Text>
      </Media>
    </>
  )
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair, stuck = false }) => {
  const { name, exhibitionPeriod, profile } = fair

  return (
    <Box p={0} py={1} display="flex" flexDirection="row">
      <ProfileIcon
        profile={{ icon: profile?.icon, name: name! }}
        stuck={stuck}
        mr={2}
      />
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Title title={name} stuck={stuck} />
        <FadingText
          show={!stuck}
          variant={["lg-display", "xl"]}
          color="black60"
        >
          {exhibitionPeriod}
        </FadingText>
      </Box>
    </Box>
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
