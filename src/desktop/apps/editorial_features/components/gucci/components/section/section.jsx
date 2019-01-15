import PropTypes from "prop-types"
import React from "react"
import Waypoint from "react-waypoint"
import { SectionVideo } from "./section_video.jsx"
import { SectionText } from "./section_text.jsx"
import { Box, media } from "@artsy/palette"

export const Section = props => {
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

Section.propTypes = {
  onEnterSection: PropTypes.func,
  onLeaveSection: PropTypes.func,
  section: PropTypes.object,
  index: PropTypes.number,
}
