import { ActionType, ContextModule } from "@artsy/cohesion"
import {
  Box,
  Button,
  HorizontalOverflow,
  Image,
  Join,
  Pill,
  ReadMore,
  ResponsiveBox,
  Spacer,
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
import { resized } from "Utils/resized"
import { useState } from "react"
import { useTracking } from "react-tracking"
import styled from "styled-components"

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

const filteredPills = pills.filter(pill =>
  SPECIALISTS.some(specialist => specialist.specialty === pill.type)
) as PillData[]

export const MeetTheSpecialists: React.FC = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const [specialityFilter, setSpecialityFilter] = useState<Specialty | null>()

  const specialistsTooDisplay = specialityFilter
    ? SPECIALISTS.filter(i => i.specialty === specialityFilter)
    : SPECIALISTS

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
  return (
    <>
      <Text mb={[0.5, 1]} variant={["lg-display", "xl", "xxl"]}>
        Meet the specialists
      </Text>
      <Text mb={2} variant={["xs", "sm"]}>
        Our specialists span today’s most popular collecting categories.
      </Text>
      <HorizontalOverflow>
        <Join separator={<Spacer x={1} />}>
          {filteredPills.map(pill => (
            <Pill
              key={`pill-${pill.type}`}
              selected={specialityFilter === pill.type}
              onClick={() => {
                setSpecialityFilter(
                  specialityFilter === pill.type ? null : pill.type
                )
              }}
            >
              {pill.title}
            </Pill>
          ))}
        </Join>
      </HorizontalOverflow>
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
              key={`specialist-${i.firstName}`}
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="flex-end"
                flexDirection="column"
              >
                <Box position="absolute" width="100%" height="100%">
                  <LinearGradient />
                  <Image
                    width="100%"
                    height="100%"
                    {...resized(i.imageUrl, {
                      width: CARD_WIDTH,
                      height: CARD_HEIGHT,
                    })}
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
              </Box>
            </ResponsiveBox>
          ))
        }}
        showProgress={false}
      />
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
        to={"/sell/inquiry"}
      >
        Get in Touch
      </Button>
    </>
  )
}

const LinearGradient = styled(Box)`
  position: "absolute";
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  transition: background-color 200ms;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 100%
  );
`
