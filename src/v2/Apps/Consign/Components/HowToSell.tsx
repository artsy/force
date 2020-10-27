import React from "react"
import { Box, Button, EditIcon, Flex, Separator, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { SectionContainer } from "./SectionContainer"

export const HowToSell: React.FC = () => {
  const navigateTo = "/consign/submission"
  return (
    <SectionContainer>
      <Text
        width="100%"
        textAlign={["center", "left"]}
        mb={2}
        variant="largeTitle"
      >
        3 Simple Steps:
        <br /> How to sell artwork from your collection
      </Text>
      <Separator />

      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        pt={[1, 4]}
      >
        <Section
          icon={<EditIcon width={50} height={50} />}
          text="Submit the Artwork"
          description="Submit your artwork details and images. Artsy will review and approve qualified submissions."
        />
        <Section
          icon={<EditIcon width={50} height={50} />}
          text="Receive Multiple Offers"
          description="If your work is accepted, you’ll receive competitive consignment offers from auction houses, galleries, and collectors."
        />
        <Section
          icon={<EditIcon width={50} height={50} />}
          text="Match and Sell"
          description="With our specialists’ expert guidance, evaluate your offers, choose the best one for you, and sell your work. We’ll help you ship it safely."
        />
      </Flex>
      <Box width="100%" textAlign="center">
        <RouterLink to={navigateTo}>
          <Media greaterThanOrEqual="sm">
            <Button variant="primaryBlack" size="large" mt={6}>
              Submit your artwork
            </Button>
          </Media>
          <Media lessThan="sm">
            <Button
              variant="primaryBlack"
              size="large"
              mt={6}
              block
              width="100%"
            >
              Submit your artwork
            </Button>
          </Media>
        </RouterLink>
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
    <Box
      width={["100%", "25%"]}
      height={["100%", 170]}
      my={[1, 0]}
      textAlign="center"
    >
      <Box>{icon}</Box>
      <Box mt={[0, 1]} mb={[0, 2]}>
        <Text variant="subtitle">{text}</Text>
      </Box>
      <Box>
        <Text variant="text" color="black60">
          {description}
        </Text>
      </Box>
    </Box>
  )
}
