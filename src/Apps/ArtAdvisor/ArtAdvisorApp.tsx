import React, { FC, PropsWithChildren } from "react"
import { Box, Flex as _Flex, Link, Text } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

export const ArtAdvisorApp: FC = () => {
  return (
    <Box marginTop="1em">
      <Text as="h1" variant="lg-display" my={4}>
        Art Advisory Experiments
      </Text>

      <Experiment href="/advisor/1">
        <Name>Initial profile spike</Name>
        <Description>
          Using Force UI, Quantum backend, function calling, memory{" "}
          <em>(Not wired up currently)</em>
        </Description>
      </Experiment>

      <Experiment href="/advisor/2">
        <Name>UI refinements</Name>
        <Description>
          Markdown, auto-scrolling, etc. (Note: streaming was supported with
          Quantum backend, but not Force)
        </Description>
      </Experiment>

      <Experiment href="/advisor/3">
        <Name>Profile Builder</Name>
        <Description>
          Builds on the user profile spike work by expanding on the system
          instruction
        </Description>
      </Experiment>

      <Experiment href="/advisor/4">
        <Name>Save Bio, Follows and Alerts</Name>
        <Description>
          Expands the Profile Builder work by adding the ability to save the
          collector profile as your bio, follow an artist and/or create alerts
        </Description>
      </Experiment>

      <Experiment href="/advisor/5">
        <Name>Near Object Search Rail</Name>
        <Description>
          A artwork rail that demonstrates near object search functionality. It
          provides real time personalization based on user actions (liking or
          disliking an artwork)
        </Description>
      </Experiment>

      <Experiment href="/advisor/6">
        <Name>Near Concept Search Rail</Name>
        <Description>
          A artwork rail that demonstrates neartext search functionality. It
          retrieves artwork recommendations based on a list of concepts, as well
          as by moving toward/away from the user's liked/disliked artworks.
        </Description>
      </Experiment>

      <Experiment href="/advisor/7">
        <Name>Curated Discovery</Name>
        <Description>
          Provide a user with immediate recommendations for artworks,
          collections, etc based on a short questionnaire and segmentation
          process (Requires a user to be logged in)
        </Description>
      </Experiment>
    </Box>
  )
}

interface ExperimentProps {
  href: string
}
const Experiment: React.FC<PropsWithChildren<ExperimentProps>> = props => {
  const { children, href } = props

  return (
    <Link href={href} textDecoration={"none"}>
      <Flex
        flexDirection={["column", "row"]}
        pb={2}
        pt={1}
        borderTop="solid 1px"
        borderColor={"black30"}
      >
        {children}
      </Flex>
    </Link>
  )
}

const Name: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <Text flex="1" mr={[0, 2]}>
      {children}
    </Text>
  )
}

const Description: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return <Text flex="3">{children}</Text>
}

const Flex = styled(_Flex)`
  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`
