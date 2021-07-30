import { Box, Carousel, Spacer, Text } from "@artsy/palette"
import React from "react"
import { PastEventRailCell } from "./PastEventRailCell"

interface PastEventsRailProps {}

const items = [
  {
    id: "eb076c3f-14a7-423e-9cf2-e200fe89905e",
    slug: "art-paris-2020",
    label: "Art Paris 2020",
  },
  {
    id: "dc842dc5-1329-4887-b2f1-459ab7edadcc",
    slug: "art-paris-2019",
    label: "Art Paris 2019",
  },
  {
    id: "28d4e17b-4c5d-4122-b199-cc03f7d06f04",
    slug: "art-paris-2018",
    label: "Art Paris 2018",
  },
  {
    id: "01c5b841-36bb-49bd-a82a-b9b1c7bc81e7",
    slug: "art-paris-2017",
    label: "Art Paris 2017",
  },
  {
    id: "ac0f460a-c8cc-483b-a3c3-7626aadac8c1",
    slug: "art-paris-2016",
    label: "Art Paris 2016",
  },
  {
    id: "bf18b177-ffab-4d76-928b-d80db865e0a2",
    slug: "art-paris-2015",
    label: "Art Paris 2015",
  },
]

export const PastEventsRail: React.FC<PastEventsRailProps> = props => {
  return (
    <Box mt={2}>
      <Text variant="lg" as="h3" mb={4}>
        Past Events
      </Text>
      <Carousel>
        {items.map(item => {
          return <PastEventRailCell key={item.id} item={item} />
        })}
      </Carousel>
      <Spacer mb={6} />
    </Box>
  )
}
