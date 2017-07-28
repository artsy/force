import components from '@artsy/reaction-force/dist/components/publishing/index'
import * as React from 'react'
import PropTypes from 'prop-types'
import SectionContainer from 'desktop/apps/article2/components/article/SectionContainer'
import styled from 'styled-components'
const { Authors, Embed, Header, ImagesetPreview, ImageCollection, Video } = components

const StyledSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.layout === 'standard' ? 'auto' : '100%'};
  margin-top: ${props => props.layout === 'standard' ? '60px' : '80px'};
  max-width: ${props => props.layout === 'standard' ? '780px' : 'auto'};
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    padding: 0px;
  }
`

const Text = styled.div`
  p {
    font-size: 23px;
    line-height: 34px;
  }
`

export default class Sections extends React.Component {
  static propTypes = {
    article: PropTypes.object
  }

  render () {
    const header = this.props.article.layout === 'standard' ? <Header article={this.props.article} /> : false
    return (
      <StyledSections layout={this.props.article.layout}>
        {header}
        {this.renderSections()}
        {this.renderAuthors()}
      </StyledSections>
    )
  }

  renderSections () {
    const sections = this.props.article.sections
    const article = this.props.article
    const renderedSections = sections.map((section, i) => {
      switch (section.type) {
        case 'image_collection':
          return (
            <SectionContainer key={i} layout={section.layout}>
              <ImageCollection images={section.images} width={900} targetHeight={500} gutter={10} />
            </SectionContainer>
          )
        case 'image_set':
          return (
            <SectionContainer key={i}>
              <ImagesetPreview images={section.images} layout={article.layout} type={'mini'} />
            </SectionContainer>
          )
        case 'video':
          return <SectionContainer key={i}><Video section={section} /></SectionContainer>
        case 'embed':
          return <SectionContainer key={i}><Embed section={section} /></SectionContainer>
        case 'text':
          return (
            <SectionContainer key={i}>
              <Text dangerouslySetInnerHTML={{__html: section.body}} />
            </SectionContainer>
          )
        default:
          return false
      }
    })
    return renderedSections
  }

  renderAuthors = () => {
    const article = this.props.article
    if (article.authors) {
      return (
        <SectionContainer><Authors authors={article.authors} /></SectionContainer>
      )
    } else {
      return false
    }
  }
}
