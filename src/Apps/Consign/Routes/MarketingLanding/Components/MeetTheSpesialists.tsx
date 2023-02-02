import {
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Pill,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { Rail } from "Components/Rail"
import { useState } from "react"
import { RouterLink } from "System/Router/RouterLink"

type Specialty = "auctions" | "priveteSalesAndAdvisory" | "collectorServices"

interface PillData {
  type: Specialty
  title: string
}
interface SpecialistsData {
  specialty: Specialty
  image: string
  name: string
  firstName: string
  jobTitle: string
  bio: string
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

const specialists: SpecialistsData[] = [
  {
    specialty: "auctions",
    image: "",
    name: "Wendy Wiberg",
    firstName: "Wendy",
    jobTitle: "Collector Services Lead",
    bio:
      "20-year veteran as the VP of Artsy's commercial and benefit auctions businesses.",
  },
  {
    specialty: "auctions",
    image: "",
    name: "Alexander Forbes",
    firstName: "Alexander",
    jobTitle: "Head of Collector Services & Private Sales",
    bio:
      "20-year veteran as the VP of Artsy's commercial and benefit auctions businesses.",
  },
  {
    specialty: "auctions",
    image: "",
    name: "",
    firstName: "",
    jobTitle: "",
    bio: "",
  },
]

export const MeetTheSpesialists: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>(
    "auctions"
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
            onClick={() => setSelectedSpecialty(pill.type)}
          >
            {pill.title}
          </Pill>
        ))}
      </Flex>
      <Rail
        title=""
        getItems={() => {
          return specialists.map(i => (
            <ResponsiveBox
              aspectWidth={445}
              aspectHeight={644}
              maxWidth={445}
              minHeight={461}
              pl={2}
              pr={2}
              backgroundColor="black60"
            >
              <Box
                // TODO: add background image
                /*<Box height="80px" width="80px">
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      backgroundImage: `url(${item.image?.thumbnailUrl})`,
                      backgroundSize: "contain",
                    }}
                  />
                </Box> */
                width="100%"
                height="100%"
                display="flex"
                justifyContent="flex-end"
                flexDirection="column"
              >
                <Text variant={["lg-display", "xl"]}>{i.name}</Text>
                <Text mb={1} variant={["xs", "xs"]}>
                  {i.jobTitle}
                </Text>
                <Text mb={2} variant={["xs", "sm"]}>
                  {i.bio}
                </Text>
                <Button variant="secondaryWhite" mb={2}>
                  Contact {i.firstName}
                </Button>
              </Box>
            </ResponsiveBox>
          ))
        }}
        showProgress={false}
      />

      {/*  <Flex overflowY="scroll">
        {specialists.map(i => (
          <Box
            height={644}
            minWidth={445}
            mr={2}
            pl={2}
            pr={2}
            backgroundColor="black60"
            display="flex"
            justifyContent="flex-end"
            flexDirection="column"
          >
            <Text variant={["lg-display", "xl"]}>{i.name}</Text>
            <Text mb={1} variant={["xs", "xs"]}>
              {i.jobTitle}
            </Text>
            <Text mb={2} variant={["xs", "sm"]}>
              {i.bio}
            </Text>
            <Button variant="secondaryWhite" mb={2}>
              Contact {i.firstName}
            </Button>
          </Box>
        ))}
      </Flex>
 */}
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
