import styled from 'styled-components'
import React, { Component } from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SeriesFooter } from './series_footer.jsx'
import { SectionText } from './section_text.jsx'

export default class App extends Component {
  render () {
    const { curation } = this.props
    const { sections } = curation
    return (
        <div className='gucci'>
          <GucciContainer>
            {sections.map((section, index) =>
              <SectionText section={section} curation={curation} />
            )}
            <SeriesFooter curation={curation} />
          </GucciContainer>
        </div>
    )
  }
}

const GucciContainer = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  .col {
    max-width: 100%;
    position: relative;
  }
  ${pMedia.sm`
    padding: 0;
  `}
`
