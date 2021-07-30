import React from "react"
import {
  ArtworkWithBadgeIcon,
  Box,
  Flex,
  LightningBoltIcon,
  Text,
  UserWithChartIcon,
  color,
  Button,
  Spacer,
} from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { RouterLink } from "v2/System/Router/RouterLink"

export const SellArtDifferently: React.FC = () => {
  return (
    <SectionContainer>
      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        pt={[0, 4]}
        mb={[0, 4, 0, 0]}
      >
        <Section
          icon={<ArtworkWithBadgeIcon width={50} height={50} />}
          text="Earn More"
          description="We offer low fees, a global network of online bidders, and multiple sales options so you get the most out of your auction experience."
        />
        <Section
          icon={<UserWithChartIcon width={50} height={50} />}
          text="Keep It Simple"
          description="Sell fast, risk-free, and in most cases, you keep your artwork until it sells. We’ll guide you at every step—we’re just a tap away in our app."
        />
        <Section
          icon={<LightningBoltIcon width={50} height={50} />}
          text="Be Empowered"
          description="Our data advantage and industry expertise enhance your sale with informed pricing, transparency, and precision marketing."
        />
      </Flex>
      <Box
        borderBottom={`1px solid ${color("black60")}`}
        width="100%"
        margin="10% 0"
        textAlign={"center"}
      >
        <Text width="60%" pb={3} variant="largeTitle" margin="0 auto">
          Are you an artist? <br />
          See our <u>FAQ</u> about selling your own work with Artsy.
        </Text>
        {/* TODO: link to FAQ component in RouterLink */}
        <RouterLink to={""}>
          <Button size="large">Learn more</Button>
        </RouterLink>
        <Spacer mb={5} />
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
