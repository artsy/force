import { Serif } from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { RelatedArticleCanvasData } from "v2/Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { crop } from "../../../../Utils/resizer"
import { pMedia } from "../../../Helpers"
import { Byline } from "../../Byline/Byline"
import { getEditorialHref } from "../../Constants"

interface RelatedArticleCanvasLinkProps
  extends React.HTMLProps<HTMLDivElement> {
  article: RelatedArticleCanvasData
}

@track()
export class RelatedArticleCanvasLink extends React.Component<
RelatedArticleCanvasLinkProps
> {
  @track<RelatedArticleCanvasLinkProps>(props => ({
    action_type: Schema.ActionType.Click,
    destination_path: getEditorialHref(
      props.article.layout,
      props.article.slug
    ),
    type: Schema.Type.Thumbnail,
  }))
  onClick() {
    // noop
  }

  render() {
    const { article } = this.props
    const href = getEditorialHref(article.layout, article.slug)
    const imageSrc = crop(article.thumbnail_image, { width: 510, height: 340 })
    const bylineArticle = { ...article, id: article.slug }

    return (
      <ArticleFigure href={href} onClick={this.onClick.bind(this)}>
        <ImageTitle>
          <BlockImage src={imageSrc} alt={article.thumbnail_title} />
          <Serif size="3t">{article.thumbnail_title}</Serif>
        </ImageTitle>

        <Byline article={bylineArticle} layout="condensed" />
      </ArticleFigure>
    )
  }
}

const ImageTitle = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
`

const ArticleFigure = styled.a`
  display: flex;
  flex-direction: column;
  width: 278px;
  text-decoration: none;
  color: black;
  ${pMedia.sm`width: 225px;`};
`

const BlockImage = styled.img`
  display: block;
  width: 278px;
  height: 185px;
  margin-bottom: 10px;
  object-fit: cover;
  ${pMedia.sm`
    width: 225px;
    height: 150px;
  `};
`
