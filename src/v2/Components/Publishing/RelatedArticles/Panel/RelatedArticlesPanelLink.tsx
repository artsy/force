import { color, Serif, space } from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { RelatedArticlePanelData } from "v2/Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { crop } from "../../../../Utils/resizer"
import { getEditorialHref } from "../../Constants"

interface RelatedArticlesPanelProps extends React.HTMLProps<HTMLDivElement> {
  article: RelatedArticlePanelData
}

@track()
export class RelatedArticlesPanelLink extends React.Component<
RelatedArticlesPanelProps
> {
  static defaultProps = {
    label: "Related Stories",
  }

  @track<RelatedArticlesPanelProps>(props => ({
    action_type: Schema.ActionType.Click,
    destination_path: getEditorialHref(
      props.article.layout,
      props.article.slug
    ),
    // TODO: add type to schema
    type: "thumbnail",
  }))
  onClick(e) {
    // noop
  }

  render() {
    const { article } = this.props
    const href = getEditorialHref(article.layout, article.slug)
    const articleImageSrc = crop(article.thumbnail_image, {
      width: 160,
      height: 110,
    })

    return (
      <ArticleLink href={href} onClick={this.onClick.bind(this)}>
        <ArticleImage src={articleImageSrc} />
        <Serif size="4t" color={color("black100")}>
          {article.thumbnail_title}
        </Serif>
      </ArticleLink>
    )
  }
}

export const ArticleLink = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: left;
  margin-bottom: ${space(2)}px;
`

const ArticleImage = styled.img`
  min-width: 80px;
  height: 55px;
  margin-right: ${space(1)}px;
`
