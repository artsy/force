import React from "react"
import {
  ArtworkWithBadgeIcon,
  Box,
  Flex,
  LightningBoltIcon,
  Text,
  UserWithChartIcon,
  color,
} from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const SellArtDifferently: React.FC = () => {
  return (
    <SectionContainer>
      <Text
        width="100%"
        textAlign={["center", "left"]}
        pb={3}
        variant="largeTitle"
        borderBottom={`1px solid ${color("black60")}`}
      >
        Selling Art Differently
      </Text>

      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        pt={[1, 4]}
        mb={[0, 4, 0, 0]}
      >
        <Section
          icon={<ArtworkWithBadgeIcon width={50} height={50} />}
          text="Risk-free sales"
          description="We offer no upfront fees, our auctions are confidential, and best of all, you keep your artwork until it’s sold."
        />
        <Section
          icon={<UserWithChartIcon width={50} height={50} />}
          text="Insights-driven matching"
          description="Our proprietary data-driven insights and the largest global audience of collectors ensures better matchmaking to sell your work."
        />
        <Section
          icon={<LightningBoltIcon width={50} height={50} />}
          text="Speed and efficiency"
          description="We will present you with a sales option that will allow you to sell your work quickly."
        />
      </Flex>
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
