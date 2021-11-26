import {
  AddItemIcon,
  ArtworkWithCheckIcon,
  Box,
  Button,
  MultipleOffersIcon,
  Text,
  GridColumns,
  Column,
} from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const HowToSell: React.FC = () => {
  return (
    <>
      <Text
        width="100%"
        textAlign={["center", "left"]}
        pb={2}
        variant="xl"
        borderBottom="1px solid"
        borderBottomColor="black100"
      >
        How It Works
      </Text>

      <GridColumns my={4}>
        <Column span={4}>
          <Section
            icon={<AddItemIcon width={50} height={50} />}
            text="Submit your artwork"
            description="Submit your artwork details and images. Artsy will review and approve qualified submissions."
          />
        </Column>

        <Column span={4}>
          <Section
            icon={<MultipleOffersIcon width={50} height={50} />}
            text="Receive multiple offers"
            description="If your work is accepted, you’ll receive competitive consignment offers from Artsy’s curated auctions, auction houses, and galleries."
          />
        </Column>

        <Column span={4}>
          <Section
            icon={<ArtworkWithCheckIcon width={50} height={50} />}
            text="Match and sell"
            description="Our specialists will guide you in choosing the best option to sell your work."
          />
        </Column>
      </GridColumns>

      <Box textAlign="center">
        <Button
          variant="primaryBlack"
          // @ts-ignore
          as={RouterLink}
          to="/consign/submission/artwork-details"
        >
          Submit your artwork
        </Button>
      </Box>
    </>
  )
}

const Section: React.FC<{
  icon: React.ReactNode
  text: string
  description: string
}> = ({ icon, text, description }) => {
  return (
    <Box textAlign="center">
      {icon}

      <Text variant="lg" mt={1}>
        {text}
      </Text>

      <Text variant="sm" color="black60" mt={1} mx="auto" maxWidth="40ch">
        {description}
      </Text>
    </Box>
  )
}
