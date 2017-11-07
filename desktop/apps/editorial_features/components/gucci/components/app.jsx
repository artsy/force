import React, { Component } from 'react'
import { SeriesFooter } from './series_footer.jsx'
import { SectionText } from './section_text.jsx'

export default class App extends Component {
  render () {
    const { curation } = this.props
    const { sections } = curation
    return (
        <div className='gucci'>
          <div className='gucci__body'>
            {sections.map((section, index) =>
              <SectionText section={section} curation={curation} />
            )}
            <SeriesFooter curation={curation} />
          </div>
        </div>
    )
  }
}
