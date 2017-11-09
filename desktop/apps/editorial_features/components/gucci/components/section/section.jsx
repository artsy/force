import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SectionVideo } from './section_video.jsx'
import { SectionText } from './section_text.jsx'

export const Section = (props) => {
  const { section, curation } = props

  return (
    <SectionContainer>
      <SectionVideo section={section} />
      <SectionText section={section} />
    </SectionContainer>
  )
}

Section.propTypes = {
  section: PropTypes.object
}

const SectionContainer = styled.div`
  margin-bottom: 180px;
  .SectionText {
    justify-content: space-between;
  }
  ${pMedia.sm`
    margin-bottom: 140px;
    .col--first {
      margin-bottom: 40px;
    } 
    .SectionText {
      padding: 0 20px;
    }
  `}
`
