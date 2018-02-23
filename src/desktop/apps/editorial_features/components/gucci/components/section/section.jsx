import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'
import { pMedia } from 'reaction/Components/Helpers'
import { SectionVideo } from './section_video.jsx'
import { SectionText } from './section_text.jsx'

export const Section = (props) => {
  const { section, onEnterSection, onLeaveSection, index } = props

  return (
    <SectionContainer>
      <SectionVideo section={section} />
      <SectionText section={section} />
      <Waypoint
        onEnter={(waypointData) => onEnterSection(index, waypointData)}
        onLeave={(waypointData) => onLeaveSection(index, waypointData)}
        bottomOffset="50px"
      />
    </SectionContainer>
  )
}

Section.propTypes = {
  onEnterSection: PropTypes.func,
  onLeaveSection: PropTypes.func,
  section: PropTypes.object,
  index: PropTypes.number,
}

const SectionContainer = styled.div`
  padding-top: 80px;
  margin-bottom: 150px;
  .SectionText {
    justify-content: space-between;
  }
  ${pMedia.sm`
    padding-top: 220px;
    margin-bottom: 0;
    .col--first {
      margin-bottom: 40px;
      width: 100%;
    }
    .SectionText {
      padding: 0 20px;
      max-width: 100%;
    }
  `};
`
