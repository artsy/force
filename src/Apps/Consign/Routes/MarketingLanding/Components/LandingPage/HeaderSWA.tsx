import {
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { PreviousSubmissionQueryRenderer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/PreviousSubmission"
import { useMarketingLandingTracking } from "Apps/Consign/Routes/MarketingLanding/Utils/marketingLandingTracking"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { resized } from "Utils/resized"

export const HeaderSWA = () => {
  const {
    trackStartSellingClick,
    trackGetInTouchClick,
  } = useMarketingLandingTracking()

  const enableNewSubmissionFlow = useFeatureFlag("onyx_new_submission_flow")

  const image = resized(
    "https://files.artsy.net/images/content-card-swa-landing-page.jpg",
    { width: 1104, height: 833 }
  )

  return (
    <GridColumns gridRowGap={[2, 4]} alignItems="center">
      <Column span={5} order={[1, 0]} py={[0, 2]} pr={[0, 2]}>
        <Media at="xs">
          {enableNewSubmissionFlow && <PreviousSubmissionQueryRenderer />}
        </Media>

        <Text as="h1" variant={["xl", "xxl", "xxxl"]}>
          Sell art from your collection
        </Text>

        <Spacer y={[0.5, 2, 4]} />

        <Text variant={["xs", "sm", "lg"]}>
          With our global reach and art market expertise, our specialists will
          find the right buyer for your work.
        </Text>

        <Media greaterThanOrEqual="sm">
          {enableNewSubmissionFlow ? (
            <Spacer y={[2, 1]} />
          ) : (
            <Spacer y={[2, 4]} />
          )}

          <GridColumns>
            <Column span={[12, 12, 10]}>
              {enableNewSubmissionFlow && <PreviousSubmissionQueryRenderer />}
            </Column>

            <Column span={[12, 6, 5]}>
              <Button
                // @ts-ignore
                as={RouterLink}
                width="100%"
                variant="primaryBlack"
                to={enableNewSubmissionFlow ? "sell/intro" : "/sell/submission"}
                onClick={event => {
                  trackStartSellingClick("Header")
                }}
                mb={[1, 0]}
                data-testid="start-selling-button"
              >
                Start Selling
              </Button>
            </Column>
            <Column span={[12, 6, 5]}>
              <Button
                width="100%"
                // @ts-ignore
                as={RouterLink}
                variant="secondaryBlack"
                data-testid="get-in-touch-button"
                onClick={trackGetInTouchClick}
                to="/sell/inquiry"
              >
                Get in Touch
              </Button>
            </Column>
          </GridColumns>
        </Media>
      </Column>

      <Column span={7} ml={[-2, 0]} mr={[-2, -4]}>
        <ResponsiveBox aspectWidth={1104} aspectHeight={833} maxWidth="100%">
          <Media greaterThan="xs">
            <Text
              position="absolute"
              bottom={0}
              ml={1}
              variant="xs"
              color="black15"
            >
              <i>
                Hunt Slonem, Lily White, 2020. Alex Katz, Large Birch, 2005.
                Andy Warhol, Queen Margrethe II of Denmark (FS II.345), 1985
              </i>
            </Text>
          </Media>
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
