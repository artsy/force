import { Flex, Serif, space } from "@artsy/palette"
import { ClassicByline } from "v2/Components/Publishing/Byline/ClassicByline"
import { ClassicPromotedContent } from "v2/Components/Publishing/Header/Layouts/Components/ClassicPromotedContent"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React, { ReactElement } from "react"
import styled from "styled-components"

interface ClassicHeaderProps {
  article: ArticleData
  date?: string
  editLeadParagraph?: ReactElement<any>
  editTitle?: ReactElement<any>
}

export const ClassicHeader: React.SFC<ClassicHeaderProps> = props => {
  const { article, date, editTitle, editLeadParagraph } = props

  return (
    <>
      {(article.partner || article.sale) && (
        <ClassicPromotedContent article={article} />
      )}
      <Flex
        flexDirection="column"
        my={space(4)}
        mx="auto"
        px={[space(2), 0]}
        alignItems={["left", "center"]}
        maxWidth={["580px", "900px"]}
      >
        <Title size={["8", "10"]} pb={space(3)} textAlign={["left", "center"]}>
          {editTitle || <h1>{article.title}</h1>}
        </Title>
        {editLeadParagraph ? (
          <LeadParagraph size="4">{editLeadParagraph}</LeadParagraph>
        ) : (
            article.lead_paragraph && (
              <LeadParagraph size="4">
                <div
                  dangerouslySetInnerHTML={{ __html: article.lead_paragraph }}
                />
              </LeadParagraph>
            )
          )}
        <ClassicByline article={article} date={date} />
      </Flex>
    </>
  )
}

export const Title = styled(Serif)``

export const LeadParagraph = styled(Serif)`
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: ${space(3)}px;
  font-style: italic;
  text-align: left;

  p {
    margin: 0;
  }
`
