import React from "react"
import {
  AddItemIcon,
  ArtworkWithCheckIcon,
  Box,
  Button,
  Flex,
  MultipleOffersIcon,
  Text,
  color,
} from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { SectionContainer } from "./SectionContainer"

export const HowToSell: React.FC = () => {
  const navigateTo = "/consign/submission"
  return (
    <SectionContainer>
      <Text
        width="100%"
        textAlign={["center", "left"]}
        pb={3}
        variant="largeTitle"
        borderBottom={`1px solid ${color("black60")}`}
      >
        How It Works
      </Text>

      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        pt={[1, 4]}
        mb={[0, 4, 0, 0]}
      >
        <Section
          icon={<AddItemIcon width={50} height={50} />}
          text="Submit your artwork"
          description="Submit your artwork details and images. Artsy will review and approve qualified submissions."
        />
        <Section
          icon={<MultipleOffersIcon width={50} height={50} />}
          text="Receive multiple offers"
          description="If your work is accepted, you’ll receive competitive consignment offers from Artsy’s curated auctions, auction houses, and galleries."
        />
        <Section
          icon={<ArtworkWithCheckIcon width={50} height={50} />}
          text="Match and sell"
          description="Our specialists will guide you in choosing the best option to sell your work."
        />
      </Flex>
      <Box width="100%" textAlign="center">
        <Media greaterThanOrEqual="sm">
          <RouterLink to={navigateTo}>
            <Button variant="primaryBlack" size="large" mt={6}>
              Submit your artwork
            </Button>
          </RouterLink>
        </Media>
        <Media lessThan="sm">
          <RouterLink to={navigateTo}>
            <Button variant="primaryBlack" size="large" mt={6} width="100%">
              Submit your artwork
            </Button>
          </RouterLink>
        </Media>
      </Box>
    </SectionContainer>
  )
}

const Section: React.FC<{
  icon: React.ReactNode
  text: string
  description: string
}> = ({ icon, text, description }) => {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      height={["100%", 170]}
      my={[1, 0]}
      mx={1}
      textAlign="center"
    >
      <Box>{icon}</Box>
      <Box mt={[0, 1]} mb={[0.5, 2]}>
        <Text variant={["mediumText", "subtitle"]}>{text}</Text>
      </Box>
      <Box>
        <Text variant="text" color="black60">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
