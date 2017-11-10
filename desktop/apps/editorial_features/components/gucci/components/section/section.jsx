import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SectionVideo } from './section_video.jsx'
import { SectionText } from './section_text.jsx'

export const Section = (props) => {
  const { section, onScrollOver } = props

  return (
    <SectionContainer>
      <SectionVideo section={section} />
      <Waypoint onEnter={onScrollOver} />
      <SectionText section={section} />
    </SectionContainer>
  )
}

Section.propTypes = {
  onScrollOver: PropTypes.func,
  section: PropTypes.object
}

const SectionContainer = styled.div`
  padding-top: 80px;
  margin-bottom: 150px;
  .SectionText {
    justify-content: space-between;
  }
  ${pMedia.sm`
    padding-top: 40px;
    margin-bottom: 100px;
    .col--first {
      margin-bottom: 40px;
    } 
    .SectionText {
      padding: 0 20px;
      max-width: 100%;
    }
  `}
`
