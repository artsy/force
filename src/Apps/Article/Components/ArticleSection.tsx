import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleSectionEmbedFragmentContainer } from "./Sections/ArticleSectionEmbed"
import { ArticleSectionImageCollectionFragmentContainer } from "./Sections/ArticleSectionImageCollection"
import { ArticleSectionImageSetFragmentContainer } from "./Sections/ArticleSectionImageSet"
import { ArticleSectionSocialEmbedFragmentContainer } from "./Sections/ArticleSectionSocialEmbed"
import { ArticleSectionTextFragmentContainer } from "./Sections/ArticleSectionText"
import { ArticleSectionVideoFragmentContainer } from "./Sections/ArticleSectionVideo"
import { ArticleSection_section$data } from "__generated__/ArticleSection_section.graphql"

interface ArticleSectionProps {
  section: ArticleSection_section$data
  isFirst: boolean
  isLast: boolean
}

const ArticleSection: FC<ArticleSectionProps> = ({
  section,
  isFirst,
  isLast,
}) => {
  switch (section.__typename) {
    case "ArticleSectionText": {
      return (
        <ArticleSectionTextFragmentContainer
          section={section}
          isFirst={isFirst}
          isLast={isLast}
        />
      )
    }

    case "ArticleSectionImageCollection": {
      return (
        <ArticleSectionImageCollectionFragmentContainer section={section} />
      )
    }

    case "ArticleSectionImageSet": {
      return <ArticleSectionImageSetFragmentContainer section={section} />
    }

    case "ArticleSectionVideo": {
      return <ArticleSectionVideoFragmentContainer section={section} />
    }

    case "ArticleSectionSocialEmbed": {
      return <ArticleSectionSocialEmbedFragmentContainer section={section} />
    }

    case "ArticleSectionEmbed": {
      return <ArticleSectionEmbedFragmentContainer section={section} />
    }

    default:
      return null
  }
}

export const ArticleSectionFragmentContainer = createFragmentContainer(
  ArticleSection,
  {
    section: graphql`
      fragment ArticleSection_section on ArticleSections {
        __typename
        ...ArticleSectionText_section
        ...ArticleSectionImageCollection_section
        ...ArticleSectionImageSet_section
        ...ArticleSectionVideo_section
        ...ArticleSectionSocialEmbed_section
        ...ArticleSectionEmbed_section
      }
    `,
  }
)
