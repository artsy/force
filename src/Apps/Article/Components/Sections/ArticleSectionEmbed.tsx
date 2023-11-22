import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, FullBleed, ResponsiveBox } from "@artsy/palette"
import { ArticleSectionEmbed_section$data } from "__generated__/ArticleSectionEmbed_section.graphql"

interface ArticleSectionEmbedProps {
  section: ArticleSectionEmbed_section$data
}

const ArticleSectionEmbed: FC<ArticleSectionEmbedProps> = ({ section }) => {
  const { Container } = useMemo(() => {
    switch (section._layout) {
      case "FILLWIDTH":
        return { Container: FullBleed }

      // COLUMN_WIDTH
      // OVERFLOW
      // OVERFLOW_FILLWIDTH
      default:
        return { Container: Box }
    }
  }, [section._layout])

  if (!section.url) return null

  if (section.height || section.mobileHeight) {
    return (
      <Container>
        <Box
          data-testid="ArticleSectionEmbed"
          as="iframe"
          display="block"
          width="100%"
          height={[
            section.mobileHeight ?? (section.height as number),
            section.height ?? (section.mobileHeight as number),
          ]}
          borderWidth={0}
          // @ts-ignore
          src={section.url}
        />
      </Container>
    )
  }

  return (
    <Container>
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
    </Container>
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
        _layout: layout
      }
    `,
  }
)
