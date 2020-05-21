import { Flex, Sans } from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { RelatedArticleCanvasData } from "v2/Components/Publishing/Typings"
import { map, once } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import { RelatedArticleCanvasLink } from "./RelatedArticleCanvasLink"

export interface RelatedArticlesCanvasProps
  extends React.HTMLProps<HTMLDivElement> {
  vertical?: {
    name: string
    id?: string
  }
  articles: RelatedArticleCanvasData[]
  isMobile?: boolean
}

interface ScrollingContainerProps {
  isMobile?: boolean
}

@track({
  // TODO: re-evalutate double naming of context/schema
  context_module: Schema.ContextModule.FurtherReading,
  subject: Schema.Subject.FurtherReading,
})
export class RelatedArticlesCanvas extends React.Component<
RelatedArticlesCanvasProps
> {
  @track(() => ({ action_type: Schema.ActionType.Impression }))
  trackRelatedImpression() {
    // noop
  }

  render() {
    const { articles, isMobile, vertical } = this.props

    return (
      <Flex flexDirection="column" maxWidth={1250} mx="auto" mt={4} mb={6}>
        {getTitle(vertical)}
        <Waypoint onEnter={once(this.trackRelatedImpression.bind(this))} />
        <ArticlesWrapper isMobile={isMobile}>
          {map(articles, (article, i) => {
            return (
              <RelatedArticleCanvasLink
                article={article}
                key={`related-article-figure-${i}`}
              />
            )
          })}
        </ArticlesWrapper>
      </Flex>
    )
  }
}

const getTitle = vertical => {
  if (vertical) {
    return (
      <Title size={["6", "8"]}>
        Further reading in <VerticalSpan>{vertical.name}</VerticalSpan>
      </Title>
    )
  } else {
    return <Title size={["6", "8"]}>More from Artsy Editorial</Title>
  }
}

const Title = styled(Sans)`
  margin-bottom: 20px;
  ${pMedia.xl`
    margin: 0 20px 30px 40px;
  `};
  ${pMedia.sm`
    margin-left: 20px;
  `};
`
const VerticalSpan = styled.span`
  ${pMedia.sm`
    display: block;
  `};
`
const ArticlesWrapper = styled.div.attrs<ScrollingContainerProps>({})`
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  a {
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
    ${pMedia.xl`
      margin: 0 10px;
      &:first-child {
        margin-left: 40px;
      }
      &:last-child {
        border-right: 20px solid white;
      }
    `};
    ${pMedia.sm`
      &:first-child {
        margin-left: 20px;
      }
    `};
  }
  ${props => props.isMobile && "-webkit-overflow-scrolling: touch;"};
`
