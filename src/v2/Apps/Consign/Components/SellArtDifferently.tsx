import React from "react"
import { Box, EditIcon, Flex, Separator, Text } from "@artsy/palette"

export const SellArtDifferently: React.FC = () => {
  return (
    <Box>
      <Box>
        <Text variant="title">Selling Art Differently</Text>
        <Separator />
      </Box>

      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="center"
      >
        <Section
          icon={<EditIcon width={30} height={30} />}
          text="Submit once"
          description="Submit your artwork details and images. Artsy will review and
            approve qualified submissions for consignment."
        />
        <Section
          icon={<EditIcon width={30} height={30} />}
          text="Submit once"
          description="Submit your artwork details and images. Artsy will review and
            approve qualified submissions for consignment."
        />
        <Section
          icon={<EditIcon width={30} height={30} />}
          text="Submit once"
          description="Submit your artwork details and images. Artsy will review and
            approve qualified submissions for consignment."
        />
      </Flex>
    </Box>
  )
}

const Section: React.FC<{
  icon: React.ReactNode
  text: string
  description: string
}> = ({ icon, text, description }) => {
  return (
    <Box width={["100%", "25%"]} height={["100%", 170]} my={[3, 0]} mx={2}>
      <Box>{icon}</Box>
      <Box mt={1} mb={2}>
        <Text variant="mediumText">{text}</Text>
      </Box>
      <Box>
        <Text variant="mediumText">{description}</Text>
      </Box>
    </Box>
  )
}
