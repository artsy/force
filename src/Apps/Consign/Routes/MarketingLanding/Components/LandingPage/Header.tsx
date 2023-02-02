import {
  Button,
  Column,
  GridColumns,
  ResponsiveBox,
  Spacer,
  Text,
  Image,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"
import { useFeatureFlag } from "System/useFeatureFlag"
import { trackEvent } from "Server/analytics/helpers"
import { useAnalyticsContext, useSystemContext } from "System"

export const HeaderNew = () => {
  const enableSWAInquiryFlow = useFeatureFlag("swa-inquiry-flow")
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()

  const getInTouchRoute = enableSWAInquiryFlow
    ? "/sell/inquiry"
    : "mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"

  /*   const trackSubmitClick = () => {
    trackEvent({
      // @ts-ignore
      action: "clickedSubmitAnArtwork",
      // @ts-ignore
      context_module: "StickyBanner",
      context_page_owner_type: contextPageOwnerType,
      label: "Submit an Artwork",
      user_id: user?.id,
      destination_path: "/sell/submission",
    })
  } */

  const trackGetInTouchClick = () => {
    trackEvent({
      action: "clickedGetInTouch",
      context_module: "Header",
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  const image = resized(
    "https://files.artsy.net/images/content-card-swa-landing-page.png",
    { width: 1104, height: 833 } // TODO: Source image should be 4:3, ideally
  )

  return (
    <GridColumns gridRowGap={4} alignItems="center">
      <Column span={5} order={[1, 0]} py={[0, 2]} pr={[0, 2]}>
        <Text variant={["xl", "xl", "xxxl"]}>
          Sell art from your collection
        </Text>

        <Spacer y={[0.5, 2]} />

        <Text variant={["xs", "lg"]}>
          Our experts find the best sales opportunity for your work, through our
          vast global network of buyers.
        </Text>

        <Spacer y={[4, 6]} />

        <GridColumns>
          <Column span={4}>
            <Button
              width={"100%"}
              // @ts-ignore
              as={RouterLink}
              variant="primaryBlack"
              to="/sell/submission"
              //  onClick={trackSubmitClick}
              mb={[1, 0]}
            >
              Start Selling
            </Button>
          </Column>
          <Column span={4}>
            <Button
              width={"100%"}
              // @ts-ignore
              as={RouterLink}
              variant="secondaryBlack"
              onClick={trackGetInTouchClick}
              data-testid="get-in-touch-button"
              to={getInTouchRoute}
            >
              Get in Touch
            </Button>
          </Column>
        </GridColumns>
      </Column>

      <Column span={7}>
        <ResponsiveBox aspectWidth={1104} aspectHeight={833} maxWidth="100%">
          <Image
            width="100%"
            height="100%"
            src={image.src}
            srcSet={image.srcSet}
            lazyLoad
            alt="Collage of three artworks on a white background"
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )
}
