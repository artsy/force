import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleApp_editorialArticle } from "v2/__generated__/ArticleApp_editorialArticle.graphql"

interface ArticleAppProps {
  editorialArticle: ArticleApp_editorialArticle
}

export const ArticleApp: React.FC<ArticleAppProps> = props => {
  console.log(props)
  return (
    <>
      <Text variant="xl">{props.editorialArticle.title}j</Text>
    </>
  )
}

export const ArticleAppFragmentContainer = createFragmentContainer(ArticleApp, {
  editorialArticle: graphql`
    fragment ArticleApp_editorialArticle on MarketingArticle {
      title
    }
  `,
})
