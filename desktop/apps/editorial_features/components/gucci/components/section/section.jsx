import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SectionVideo } from './section_video.jsx'
import { SectionText } from './section_text.jsx'

export class Section extends Component {
  componentDidMount () {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    console.log(this.props.section.title, rect)
  }

  render () {
    const { section, curation } = this.props
    return (
      <SectionContainer>
        <SectionVideo section={section} />
        <SectionText section={section} />
      </SectionContainer>
    )
  }
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
