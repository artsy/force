import {
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Pill,
  ResponsiveBox,
  Text,
  Image,
} from "@artsy/palette"
import {
  SPECIALISTS,
  Specialty,
} from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpecialistsData"
import { Rail } from "Components/Rail"
import { useState } from "react"
import { RouterLink } from "System/Router/RouterLink"

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
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>(
    "auctions"
  )
  const [toDisplay, setToDisplay] = useState(
    SPECIALISTS.filter(i => i.specialty === "auctions")
  )

  return (
    <>
      <Text mb={[0.5, 1]} variant={["lg-display", "xxl"]}>
        Meet the specialists
      </Text>
      <Text mb={[2, 4]} variant={["xs", "sm"]}>
        Our in-house experts cover Post-War and Contemporary Art, Prints and
        Multiples, Street Art and Photographs.
      </Text>
      <Flex overflowY="scroll">
        {pills.map(pill => (
          <Pill
            mr={[1, 2]}
            hover={false}
            selected={selectedSpecialty === pill.type}
            variant="default"
            onClick={() => {
              setSelectedSpecialty(pill.type)
              setToDisplay(SPECIALISTS.filter(i => i.specialty === pill.type))
            }}
          >
            {pill.title}
          </Pill>
        ))}
      </Flex>
      <Rail
        title=""
        getItems={() => {
          return toDisplay.map(i => (
            <ResponsiveBox
              aspectWidth={445}
              aspectHeight={644}
              maxWidth={445}
              minHeight={[461, 644]}
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
                  <Button variant="secondaryWhite" mb={2}>
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
        Interested in selling multiple artworks, or not sure which of our
        experts is the right fit for your work? Get in touch and we'll connect
        you.
      </Text>
      <GridColumns>
        <Column span={2}>
          <Button
            width={"100%"}
            // @ts-ignore
            as={RouterLink}
            variant="primaryBlack"
            to="/sell/submission"
            onClick={event => {
              /* track event */
            }}
          >
            Start Selling
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}
