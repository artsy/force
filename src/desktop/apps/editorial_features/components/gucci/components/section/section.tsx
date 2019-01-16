import React from "react"
import Waypoint from "react-waypoint"
import { SectionVideo } from "./section_video"
import { SectionText } from "./section_text"
import { Box } from "@artsy/palette"

interface SectionProps {
  onEnterSection: (index: number, data: any) => void
  onLeaveSection: (index: number, data: any) => void
  section: any
  index: number
}

export const Section: React.SFC<SectionProps> = props => {
  const { section, onEnterSection, onLeaveSection, index } = props

  return (
    <Box pb={[0, 0, 150, 150]} pt={[220, 220, 80, 80]}>
      <SectionVideo section={section} />
      <SectionText section={section} />
      <Waypoint
        onEnter={waypointData => onEnterSection(index, waypointData)}
        onLeave={waypointData => onLeaveSection(index, waypointData)}
        bottomOffset="50px"
      />
    </Box>
  )
}
