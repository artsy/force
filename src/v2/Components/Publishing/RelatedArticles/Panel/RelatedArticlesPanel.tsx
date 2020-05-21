import { Sans } from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { RelatedArticlePanelData } from "v2/Components/Publishing/Typings"
import { once } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { RelatedArticlesPanelLink } from "./RelatedArticlesPanelLink"

interface RelatedArticlesPanelProps extends React.HTMLProps<HTMLDivElement> {
  label?: string
  articles: RelatedArticlePanelData[]
}

@track({
  // TODO: reevalutate double naming of context/schema
  context_module: Schema.ContextModule.RelatedArticles,
  subject: Schema.Subject.RelatedArticles,
})
export class RelatedArticlesPanel extends React.Component<
RelatedArticlesPanelProps
> {
  static defaultProps = {
    label: "Related Stories",
  }

  @track(props => ({ action_type: Schema.ActionType.Impression }))
  trackRelatedImpression() {
    // noop
  }

  render() {
    const { articles, label } = this.props

    return (
      <RelatedArticlesContainer>
        <Label size="3t" weight="medium">
          {label}
        </Label>
        <Waypoint onEnter={once(this.trackRelatedImpression.bind(this))} />
        <Collection>
          {articles.map((article, i) => (
            <RelatedArticlesPanelLink
              article={article}
              key={`relatedArticles-${i}`}
            />
          ))}
        </Collection>
      </RelatedArticlesContainer>
    )
  }
}

const RelatedArticlesContainer = styled.div`
  max-width: 360px;
`

const Collection = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled(Sans)`
  margin-bottom: 10px;
`
