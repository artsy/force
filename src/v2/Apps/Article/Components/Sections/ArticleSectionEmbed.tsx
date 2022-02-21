import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, ResponsiveBox } from "@artsy/palette"
import { ArticleSectionEmbed_section$data } from "v2/__generated__/ArticleSectionEmbed_section.graphql"

interface ArticleSectionEmbedProps {
  section: ArticleSectionEmbed_section$data
}

const ArticleSectionEmbed: FC<ArticleSectionEmbedProps> = ({ section }) => {
  if (!section.url) return null

  if (section.height || section.mobileHeight) {
    return (
      <Box
        data-testid="ArticleSectionEmbed"
        as="iframe"
        display="block"
        width="100%"
        height={[
          section.mobileHeight ?? section.height,
          section.height ?? section.mobileHeight,
        ]}
        borderWidth={0}
        // @ts-ignore
        src={section.url}
      />
    )
  }

  return (
    <ResponsiveBox
      data-testid="ArticleSectionEmbed"
      aspectWidth={16}
      aspectHeight={9}
      maxWidth="100%"
      bg="black10"
    >
      <Box
        as="iframe"
        display="block"
        borderWidth={0}
        width="100%"
        height="100%"
        // @ts-ignore
        src={section.url}
      />
    </ResponsiveBox>
  )
}

export const ArticleSectionEmbedFragmentContainer = createFragmentContainer(
  ArticleSectionEmbed,
  {
    section: graphql`
      fragment ArticleSectionEmbed_section on ArticleSectionEmbed {
        url
        height
        mobileHeight
      }
    `,
  }
)
