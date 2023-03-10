import { ActionType, ContextModule } from "@artsy/cohesion"
import {
  Box,
  Button,
  Flex,
  Image,
  Pill,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import {
  CARD_HEIGHT,
  CARD_HEIGHT_MD,
  CARD_HEIGHT_MOBILE,
  CARD_WIDTH,
  SPECIALISTS,
  Specialty,
} from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpecialistsData"
import { Rail } from "Components/Rail/Rail"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System/SystemContext"
import { useState } from "react"
import { useTracking } from "react-tracking"

interface PillData {
  type: Specialty
  title: string
}

const pills: PillData[] = [
  {
    type: "auctions",
    title: "Auctions",
  },
  {
    type: "priveteSalesAndAdvisory",
    title: "Private Sales & Advisory",
  },
  {
    type: "collectorServices",
    title: "Collector Services",
  },
]

export const MeetTheSpecialists: React.FC = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>(
    "auctions"
  )
  const [specialistsTooDisplay, setSpecialistsTooDisplay] = useState(
    SPECIALISTS.filter(i => i.specialty === "auctions")
  )

  const getInTouchRoute = "/sell/inquiry"

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

  return (
    <>
      <Text mb={[0.5, 1]} variant={["lg-display", "xl", "xxl"]}>
        Meet the specialists
      </Text>
      <Text mb={2} variant={["xs", "sm"]}>
        Our in-house experts cover Post-War and Contemporary Art, Prints and
        Multiples, Street Art and Photographs.
      </Text>
      <Flex overflowY="scroll">
        {pills.map(pill => (
          <Pill
            mr={1}
            hover={false}
            selected={selectedSpecialty === pill.type}
            variant="default"
            onClick={() => {
              setSelectedSpecialty(pill.type)
              setSpecialistsTooDisplay(
                SPECIALISTS.filter(i => i.specialty === pill.type)
              )
            }}
            style={
              selectedSpecialty === pill.type
                ? {
                    color: "white",
                    backgroundColor: "black",
                    borderColor: "black",
                  }
                : undefined
            }
          >
            {pill.title}
          </Pill>
        ))}
      </Flex>
      <Rail
        title=""
        getItems={() => {
          return specialistsTooDisplay.map(i => (
            <ResponsiveBox
              aspectWidth={CARD_WIDTH}
              aspectHeight={CARD_HEIGHT}
              maxWidth={CARD_WIDTH}
              minHeight={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_MD, CARD_HEIGHT]}
              backgroundColor="black60"
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="flex-end"
                flexDirection="column"
              >
                <Box position="absolute" width="100%" height="100%">
                  <Image
                    width="100%"
                    height="100%"
                    src={i.image.src}
                    srcSet={i.image.srcSet}
                    lazyLoad
                    alt={`specialist ${i.firstName}`}
                  />
                </Box>

                <Box pl={2} pr={2} zIndex={10}>
                  <Text variant={["lg-display", "xl"]} color="white100">
                    {i.name}
                  </Text>
                  <Text mb={1} variant={["xs", "xs"]} color="white100">
                    {i.jobTitle}
                  </Text>
                  <Text mb={2} variant={["xs", "sm"]} color="white100">
                    {i.bio}
                  </Text>
                  <Button
                    // @ts-ignore
                    as={RouterLink}
                    variant="secondaryWhite"
                    size="small"
                    mb={2}
                    onClick={trackContactTheSpecialistClick}
                    data-testid={`get-in-touch-button-${i.firstName}`}
                    to={`mailto:${i.email}`}
                  >
                    Contact {i.firstName}
                  </Button>
                </Box>
              </Box>
            </ResponsiveBox>
          ))
        }}
        showProgress={false}
      />
      <Text mb={[2, 4]} variant={["md", "lg-display"]}>
        Not sure which of our experts is the right fit for your work? Get in
        touch and we'll connect you.
      </Text>
      <Button
        width={["100%", 300]}
        // @ts-ignore
        as={RouterLink}
        variant="primaryBlack"
        onClick={trackGetInTouchClick}
        data-testid="get-in-touch-button"
        to={getInTouchRoute}
      >
        Get in Touch
      </Button>
    </>
  )
}
