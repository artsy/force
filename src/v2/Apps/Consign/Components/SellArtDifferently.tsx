import React from "react"
import { Box, EditIcon, Flex, Separator, Text } from "@artsy/palette"
import { SectionContainer } from "v2/Apps/Artist/Routes/Consign/Components/SectionContainer"

export const SellArtDifferently: React.FC = () => {
  return (
    <SectionContainer>
      <Text textAlign={["center", "left"]} mb={2} variant="largeTitle">
        Selling Art Differently
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
          text="More selling options"
          description="We’ll introduce your work to leading buyers around the world and help compare their offers to get you the best deal."
        />
        <Section
          icon={<EditIcon width={50} height={50} />}
          text="Unique market insights"
          description="Our expertise, primary and secondary art market data, and relationships with buyers provide a best-in-class reselling experience."
        />
        <Section
          icon={<EditIcon width={50} height={50} />}
          text="Speed anad efficiency"
          description="Guaranteed offer within 24 hours, and you’ll always be presented with a sales option to sell your work in a month. Plus, we’ll help you ship."
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
