import { pMedia } from "v2/Components/Helpers"
import { Truncator } from "v2/Components/Truncator"
import React, { Component } from "react"
import styled from "styled-components"
import { NewsByline } from "../Byline/NewsByline"
import { ImageCollection } from "../Sections/ImageCollection"
import { SocialEmbed } from "../Sections/SocialEmbed"
import { Text } from "../Sections/Text"
import { ArticleData, SectionData } from "../Typings"

interface Props {
  article: ArticleData
  isMobile?: boolean
  isTruncated: boolean
}

interface ContainerProp {
  type: string
}

export class NewsSections extends Component<Props> {
  getSection(section: SectionData, index: number) {
    const { article, isMobile, isTruncated } = this.props

    const sections = {
      image_collection: (
        <ImageCollection
          sectionLayout={section.layout}
          articleLayout={article.layout}
          images={section.images}
          targetHeight={500}
          gutter={10}
        />
      ),
      social_embed: <SocialEmbed section={section} />,
      text: <Text html={section.body} layout={this.props.article.layout} />,
      default: false,
    }

    const sectionComponent = sections[section.type] || sections.default
    if (section.type === "text" && isTruncated) {
      return (
        <Truncator maxLineCount={isMobile ? 3 : 2}>
          {sectionComponent}
        </Truncator>
      )
    }
    return sectionComponent
  }

  renderSections() {
    const {
      article: { sections },
      isTruncated,
    } = this.props
    const hasMainImage = sections[0].type === "image_collection"

    let limit
    if (isTruncated) {
      limit = hasMainImage ? 2 : 1
    } else {
      limit = sections.length
    }

    const renderedSections = sections.slice(0, limit).map((section, index) => {
      const child = this.getSection(section, index)

      if (child) {
        return (
          <NewsSectionContainer key={index} type={section.type}>
            {child}
          </NewsSectionContainer>
        )
      }
    })

    return renderedSections
  }

  renderByline() {
    const {
      article: { authors, published_at },
    } = this.props

    if (authors || published_at) {
      return (
        <BylineContainer>
          <NewsByline {...this.props} />
        </BylineContainer>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderSections()}
        {this.renderByline()}
      </div>
    )
  }
}

const getMaxWidth = type => {
  if (type === "image_collection") {
    return ""
  } else {
    return "max-width: 660px;"
  }
}

export const NewsSectionContainer = styled.div`
  ${(props: ContainerProp) => getMaxWidth(props.type)};
  margin-bottom: 20px;

  ${pMedia.sm`
    margin: 0 0 15px 0;
    padding: 0;
  `};
`

const BylineContainer = styled.div`
  max-width: 780px;
  margin-top: 30px;

  ${pMedia.sm`
    margin: 30px 0 0 0;
    padding: 0px;
  `};
`
