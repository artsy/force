import { FC, useEffect, useRef } from "react"
import { ArticleSectionSocialEmbed_section$data } from "__generated__/ArticleSectionSocialEmbed_section.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "@artsy/palette"
import styled from "styled-components"

interface ArticleSectionSocialEmbedProps {
  section: ArticleSectionSocialEmbed_section$data
}

const ArticleSectionSocialEmbed: FC<ArticleSectionSocialEmbedProps> = ({
  section,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current || !section.embed) return

    // React doesn't load the script tags when using `dangerouslySetInnerHTML`
    // So just inject the HTML manually after mount.
    ref.current.innerHTML = section.embed
  }, [section])

  if (!section.embed) return null

  return (
    <Container
      ref={ref as any}
      dangerouslySetInnerHTML={{ __html: section.embed }}
      data-testid="ArticleSectionSocialEmbed"
    />
  )
}

export const ArticleSectionSocialEmbedFragmentContainer = createFragmentContainer(
  ArticleSectionSocialEmbed,
  {
    section: graphql`
      fragment ArticleSectionSocialEmbed_section on ArticleSectionSocialEmbed {
        url
        embed
      }
    `,
  }
)

const Container = styled(Box)`
  > * {
    margin: auto;
  }
`
