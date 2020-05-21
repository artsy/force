import colors from "v2/Assets/Colors"
import { garamond, unica } from "v2/Assets/Fonts"
import { pMedia } from "v2/Components/Helpers"
import React from "react"
import styled from "styled-components"
import { getDate } from "../Constants"
import { ArticleData } from "../Typings"

interface Props {
  articles: ArticleData[]
}

export const NewsPanel: React.SFC<Props> = props => {
  return (
    <NewsPanelContainer>
      <Header>
        <HeaderTitle>News</HeaderTitle>
        <HeaderText>{getDate(new Date().toISOString(), "monthDay")}</HeaderText>
      </Header>

      <ArticlesContainer>
        {props.articles.map((article, i) => (
          <ArticleHeadline href={`/news/${article.slug}`} key={i}>
            {article.title}
          </ArticleHeadline>
        ))}
      </ArticlesContainer>

      <Footer>
        <a href="/news">More in News</a>
      </Footer>
    </NewsPanelContainer>
  )
}

const NewsPanelContainer = styled.div`
  padding: 20px;
  border: 1px solid ${colors.grayRegular};
  border-radius: 3px;

  a {
    color: black;

    &:hover {
      color: ${colors.grayDark};
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

export const HeaderText = styled.div`
  ${unica("s19", "medium")};
  ${pMedia.sm`
    ${unica("s16", "medium")}
  `};
`

const HeaderTitle = styled(HeaderText)`
  position: absolute;
  left: 0;
`

const ArticlesContainer = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  ${pMedia.sm`
    padding: 0 0 10px;
  `};
`

const ArticleHeadline = styled.a`
  ${garamond("s18")};
  padding: 10px 0;
  cursor: pointer;
  text-decoration: none;
  ${pMedia.sm`
    ${garamond("s15")}
    line-height: 1.4em;
  `};
`

const Footer = styled.div`
  ${unica("s16")};
  ${pMedia.sm`
    ${unica("s12")}
  `};
`
