import { GridColumns, Column, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
// import { RouterLink } from "System/Router/RouterLink"
import { Article2App_article$data } from "__generated__/Article2App_article.graphql"

interface Article2AppProps {
  article: Article2App_article$data
}

const Article2App: FC<Article2AppProps> = ({ article }) => {
  return (
    <>
      <GridColumns gridRowGap={4}>
        <Column span={7}>
          <>
            {/* <Text variant="sm" fontWeight="bold">
                  {article.vertical}
                </Text> */}

            {/* <RouterLink
                  to={article.href}
                  display="block"
                  textDecoration="none"
                > */}
            <Text as="h1" variant={["lg-display", "xl", "xxl"]}>
              {article.title}
            </Text>

            <Text variant={["md", "lg-display"]} color="black60">
              {article.authors.map(author => author.name).join(", ")}
            </Text>
            {/* </RouterLink> */}

            <Spacer y={2} />
          </>
        </Column>
      </GridColumns>
    </>
  )
}

export const Article2AppFragmentContainer = createFragmentContainer(
  Article2App,
  {
    article: graphql`
      fragment Article2App_article on ContentfulArticle {
        title
        authors {
          name
          initials
        }
        sections
      }
    `,
  }
)
