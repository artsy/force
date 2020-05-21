import React from "react"
import styled from "styled-components"
import { getArticleFullHref } from "../Constants"
import { ArticleData } from "../Typings"
import { Author, StyledAuthor } from "./Author"
import { DateSource } from "./DateSource"
import { Share } from "./Share"

export interface NewsBylineProps {
  article: ArticleData
  editSource?: any
  isMobile?: boolean
  isTruncated?: boolean
  onShareFromMobile?: () => void
}

export const NewsByline: React.SFC<NewsBylineProps> = props => {
  const { article, editSource, isTruncated, isMobile } = props
  const { authors, title } = article
  const url = getArticleFullHref(article.slug)

  return (
    <NewsBylineContainer>
      <AuthorDateContainer>
        {!isTruncated && <Author authors={authors} />}
        <DateSource article={article} editSource={editSource} />
      </AuthorDateContainer>

      {!isTruncated && (
        <Share url={url} title={title} isMobile={isMobile} isNews />
      )}
    </NewsBylineContainer>
  )
}

const NewsBylineContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;

  ${StyledAuthor} {
    margin-top: 0;
    margin-bottom: 5px;
  }
`

const AuthorDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`
