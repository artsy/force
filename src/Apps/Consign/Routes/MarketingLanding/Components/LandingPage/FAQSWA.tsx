import { Button, Text, Image, Box } from "@artsy/palette"
import { TextAndImageLayout } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/TextAndImageLayout"
import { RouterLink } from "System/Components/RouterLink"
import { resized } from "Utils/resized"

export const FAQSWA: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/SWA-landing-FAQ-section-x2.jpg",
    { width: 950, height: 419 }
  )
  const supportUrl = "https://support.artsy.net/s/topic/0TO3b000000UesxGAC/sell"

  return (
    <TextAndImageLayout
      text={
        <>
          <Text variant={["lg", "xl", "xxl"]} mb={4} textColor="white100">
            No upfront fees, clear pricing estimates, and competitive commission
            structures.
          </Text>
          <Text variant={["xs", "sm", "sm"]} mb={[2, 4]} textColor="white100">
            Have more questions?
          </Text>
        </>
      }
      button={
        <Button
          // @ts-ignore
          as={RouterLink}
          variant="secondaryWhite"
          width={["100%", 300]}
          to={supportUrl}
          data-testid="read-FAQs-button"
        >
          Read FAQs
        </Button>
      }
      image={
        <Box width="100%" height="100%" bg="black100">
          <Image
            width="100%"
            height="100%"
            src={image.src}
            srcSet={image.srcSet}
            lazyLoad
            alt="Collage of five artworks on a black background"
          />
        </Box>
      }
      references="Andy Warhol, Cow, II.12A, 1976. Alex Katz, Yellow Tulips, 2014. Hunt Slonem, Abraham Lincoln, 2020. Julian Opie, Walking in Melbourne, 1, 2018  "
    />
  )
}
