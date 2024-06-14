import { ActionType, ContextModule } from "@artsy/cohesion"
import { Box, Button, Image, Text } from "@artsy/palette"
import { TextAndImageLayout } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/TextAndImageLayout"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { resized } from "Utils/resized"
import { useTracking } from "react-tracking"

export const SpeakToTheTeam: React.FC = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const image = resized(
    "https://files.artsy.net/images/SWA-landing-FAQ-section-speak-to-the-team-image-x2.jpg",
    { width: 949, height: 420 }
  )
  const getInTouchRoute = "/sell/inquiry"

  const trackGetInTouchClick = () => {
    trackEvent({
      action: ActionType.tappedConsignmentInquiry,
      context_module: ContextModule.sellSpeakToTheTeam,
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  return (
    <TextAndImageLayout
      text={
        <>
          <Text variant={["lg", "xl", "xxl"]} textColor="white100" mb={4}>
            Selling multiple artworks? Get in touch to connect with a
            specialist.
          </Text>
        </>
      }
      button={
        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryWhite"
          width={["100%", 300]}
          to={getInTouchRoute}
          onClick={trackGetInTouchClick}
          data-testid="get-in-touch-button"
        >
          Get in Touch
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
      references="Janet Fish, Daffodils, 1995. Malik Roberts, Untitled | Blue, 2022. Robert Colescott, Les Demoiselles d’Alabama: Vestidas, 1985. Hunt Slonem, Peacock St Mary’s, 2010-2020. Vik Muniz, Metachrome (Interior with Egyptian Curtain, after Matisse), 2016."
    />
  )
}
