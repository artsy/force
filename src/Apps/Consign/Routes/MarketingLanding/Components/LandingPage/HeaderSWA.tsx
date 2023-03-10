import { ActionType } from "@artsy/cohesion"
import {
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System/SystemContext"
import { Media } from "Utils/Responsive"
import { resized } from "Utils/resized"
import { useTracking } from "react-tracking"

export const HeaderSWA = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const getInTouchRoute = "/sell/inquiry"

  const trackStartSellingClick = () => {
    trackEvent({
      action: ActionType.tappedConsign,
      context_module: "Header", // not importing the name from cohesion as a exeption, should NOT be done in other places
      // the reason is that in cohesion the modult is maned "header"
      // we use "Header" with capital letter for analyticks already and we do not want to intrpduce another name
      context_page_owner_type: contextPageOwnerType,
      label: "Start Selling",
      destination_path: "/sell/submission",
      user_id: user?.id,
    })
  }

  const trackGetInTouchClick = () => {
    trackEvent({
      action: ActionType.tappedConsignmentInquiry,
      context_module: "Header", // not importing the name from cohesion as a exeption, should NOT be done in other places
      // the reason is that in cohesion the modult is maned "header"
      // we use "Header" with capital letter for analyticks already and we do not want to intrpduce another name
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  const image = resized(
    "https://files.artsy.net/images/content-card-swa-landing-page.jpg",
    { width: 1104, height: 833 }
  )

  return (
    <GridColumns gridRowGap={[2, 4]} alignItems="center">
      <Column span={5} order={[1, 0]} py={[0, 2]} pr={[0, 2]}>
        <Text as="h1" variant={["xl", "xxl", "xxxl"]}>
          Sell art from your collection
        </Text>

        <Spacer y={[0.5, 2, 4]} />

        <Text variant={["xs", "sm", "lg"]}>
          Our experts find the best sales opportunity for your work, through our
          vast global network of buyers.
        </Text>

        <Spacer y={[2, 4]} />

        <GridColumns>
          <Column span={[12, 6, 5]}>
            <Button
              // @ts-ignore
              as={RouterLink}
              width="100%"
              variant="primaryBlack"
              to="/sell/submission"
              onClick={trackStartSellingClick}
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
              to={getInTouchRoute}
            >
              Get in Touch
            </Button>
          </Column>
        </GridColumns>
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
