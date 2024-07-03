import { ActionType, ContextModule } from "@artsy/cohesion"
import {
  Box,
  Button,
  Image,
  ReadMore,
  ResponsiveBox,
  Shelf,
  Skeleton,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import {
  CARD_HEIGHT,
  CARD_HEIGHT_MD,
  CARD_HEIGHT_MOBILE,
  CARD_WIDTH,
} from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpecialistsData"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { resized } from "Utils/resized"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { MeetTheSpecialistsQuery } from "__generated__/MeetTheSpecialistsQuery.graphql"
import { MeetTheSpecialists_staticContent$data } from "__generated__/MeetTheSpecialists_staticContent.graphql"

export const MeetTheSpecialists: React.FC<{
  staticContent: MeetTheSpecialists_staticContent$data
}> = ({ staticContent }) => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const specialists = staticContent?.specialistBios
  // TODO: remove the local data usage

  if (!specialists) {
    return PLACEHOLDER
  }

  const trackContactTheSpecialistClick = () => {
    trackEvent({
      action: ActionType.tappedConsignmentInquiry,
      context_module: ContextModule.sellMeetTheSpecialists,
      context_page_owner_type: contextPageOwnerType,
      label: "Contact specialist_name",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  const trackGetInTouchClick = () => {
    trackEvent({
      action: ActionType.tappedConsignmentInquiry,
      context_module: ContextModule.sellMeetTheSpecialists,
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  const clickContactSpecialist = () => {
    trackContactTheSpecialistClick()
  }

  // TODO: move title and subtitle above the query renderer so it is visible in the placeholder
  // same for Previouslu sold on artsy component
  return (
    <>
      <Text mb={[0.5, 1]} variant={["lg-display", "xl", "xxl"]}>
        Meet the specialists
      </Text>
      <Text mb={2} variant={["xs", "sm"]}>
        Our specialists span today’s most popular collecting categories.
      </Text>
      <Shelf showProgress={false}>
        {specialists.map(i => {
          return (
            <ResponsiveBox
              aspectWidth={CARD_WIDTH}
              aspectHeight={CARD_HEIGHT}
              maxWidth={CARD_WIDTH}
              minHeight={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_MD, CARD_HEIGHT]}
              backgroundColor="black10"
              key={`specialist-${i.firstName}`}
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="flex-end"
                flexDirection="column"
              >
                <Image
                  width="100%"
                  height="100%"
                  {...resized(i?.image?.imageURL || "", {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  })}
                  lazyLoad
                  alt={`specialist ${i.firstName}`}
                />

                <Info position="absolute" width="100%" pt={12}>
                  <Box pl={2} pr={2} zIndex={10}>
                    <Text variant={["lg-display", "xl"]} color="white100">
                      {i.name}
                    </Text>

                    <Text mb={1} variant={["xs", "xs"]} color="white100">
                      {i.jobTitle}
                    </Text>

                    <Text
                      mb={2}
                      variant={["xs", "sm-display"]}
                      color="white100"
                    >
                      <ReadMore content={i.bio} maxChars={88} />
                    </Text>

                    <Button
                      // @ts-ignore
                      as={RouterLink}
                      variant="secondaryWhite"
                      size="small"
                      mb={2}
                      onClick={clickContactSpecialist}
                      data-testid={`get-in-touch-button-${i.firstName}`}
                      to={`/sell/inquiry/${i.email}`}
                    >
                      Contact {i.firstName}
                    </Button>
                  </Box>
                </Info>
              </Box>
            </ResponsiveBox>
          )
        })}
      </Shelf>
      <Text mb={[2, 4]} variant={["md", "lg-display"]}>
        Not sure who’s the right fit for your collection? Get in touch and we’ll
        connect you.
      </Text>
      <Button
        width={["100%", 300]}
        // @ts-ignore
        as={RouterLink}
        variant="primaryBlack"
        onClick={trackGetInTouchClick}
        data-testid="get-in-touch-button"
        to="/sell/inquiry"
      >
        Get in Touch
      </Button>
    </>
  )
}

const Info = styled(Box)`
  background: ${themeGet("effects.overlayGradient")};
  text-shadow: ${themeGet("effects.textShadow")};
`

export const MeetTheSpecialistsQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<MeetTheSpecialistsQuery>
      lazyLoad
      query={graphql`
        query MeetTheSpecialistsQuery {
          viewer {
            staticContent {
              ...MeetTheSpecialists_staticContent
            }
          }
          me {
            name
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ props }) => {
        if (!props || !props.viewer?.staticContent) {
          return PLACEHOLDER
        }

        return (
          <MeetTheSpecialistsFragmentContainer
            staticContent={props?.viewer?.staticContent}
          />
        )
      }}
    />
  )
}

export const MeetTheSpecialistsFragmentContainer = createFragmentContainer(
  MeetTheSpecialists,
  {
    staticContent: graphql`
      fragment MeetTheSpecialists_staticContent on StaticContent {
        specialistBios {
          name
          firstName
          jobTitle
          bio
          email
          image {
            imageURL
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Shelf>
      {[...new Array(12)].map((_, i) => {
        return (
          <ResponsiveBox
            key={i}
            aspectWidth={CARD_WIDTH}
            aspectHeight={CARD_HEIGHT}
            maxWidth={CARD_WIDTH}
            minHeight={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_MD, CARD_HEIGHT]}
            backgroundColor="black10"
          />
        )
      })}
    </Shelf>
  </Skeleton>
)
