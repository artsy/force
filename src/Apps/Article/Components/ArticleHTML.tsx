import { ContextModule } from "@artsy/cohesion"
import { Box, type BoxProps, Flex, THEME } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { toStyle } from "Utils/toStyle"
import { type FC, useEffect, useState } from "react"
import styled from "styled-components"
import { ArticleTooltip, isSupportedArticleTooltip } from "./ArticleTooltip"

interface ArticleHTMLProps extends BoxProps {
  children: string
}

export const ArticleHTML: FC<React.PropsWithChildren<ArticleHTMLProps>> = ({
  children,
  ...rest
}) => {
  // Looks for links and if they are internal and a supported entity type,
  // inserts the relevant tooltip.
  const transform = (node: Element, i: number) => {
    if (node.tagName !== "A") return

    const { href } = node as HTMLAnchorElement

    try {
      const uri = new URL(href)

      if (!uri.hostname.includes("artsy.net")) return

      const [_, entity, id] = uri.pathname.split("/")

      if (!isSupportedArticleTooltip(entity)) return

      const heading = node.closest("h2")

      const isArtistHeading =
        entity === "artist" && isEligibleFollowHeading(heading, entity)

      const isPartnerHeading =
        entity === "partner" && isEligibleFollowHeading(heading, entity)

      if (isArtistHeading) {
        return (
          <Flex alignItems="center" gap={1} key={[i, id].join("-")}>
            <ArticleTooltip entity={entity} id={id} href={href}>
              {node.textContent}
            </ArticleTooltip>
            <FollowArtistButtonQueryRenderer
              id={id}
              size={["large", "small"]}
              contextModule={ContextModule.artistHeader}
            />
          </Flex>
        )
      }

      if (isPartnerHeading) {
        return (
          <Flex alignItems="center" gap={1} key={[i, id].join("-")}>
            <ArticleTooltip entity={entity} id={id} href={href}>
              {node.textContent}
            </ArticleTooltip>
            <FollowProfileButtonQueryRenderer
              id={id}
              size={["large", "small"]}
              contextModule={ContextModule.partnerHeader}
            />
          </Flex>
        )
      }

      return (
        <ArticleTooltip
          key={[i, id].join("-")}
          entity={entity}
          id={id}
          href={href}
        >
          {node.textContent}
        </ArticleTooltip>
      )
    } catch {
      // If we can't parse the URL, just return the node un-transformed.
      return
    }
  }

  const [transformed, setTransformed] = useState<string | null>(null)

  useEffect(() => {
    // Relies on the DOMParser global being available in the browser.
    import("@artsy/react-html-parser").then(({ default: reactHtmlParser }) => {
      setTransformed(reactHtmlParser(children, { transform }))
    })
  }, [children])

  if (transformed) {
    return <Container {...rest}>{transformed}</Container>
  }

  return <Container dangerouslySetInnerHTML={{ __html: children }} {...rest} />
}

export const hasAdjacentEntityLinks = (heading: Element | null): boolean => {
  if (!heading) return false

  let sibling = heading.nextElementSibling
  while (sibling && sibling.tagName === "H3") {
    if (sibling.querySelector("a[href*='/artist/'], a[href*='/partner/']")) {
      return true
    }
    sibling = sibling.nextElementSibling
  }

  return false
}

export const isEligibleFollowHeading = (
  heading: Element | null,
  entity: string,
): boolean => {
  if (!heading || heading.tagName !== "H2") return false
  if (hasAdjacentEntityLinks(heading)) return false

  let expectedPrefix: string | null = null

  if (entity === "artist") {
    expectedPrefix = "https://www.artsy.net/artist/"
  } else if (entity === "partner") {
    expectedPrefix = "https://www.artsy.net/partner/"
  } else {
    return false
  }

  const links = heading.querySelectorAll(`a[href^='${expectedPrefix}']`)
  return links.length === 1
}

const Container = styled(Box)`
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  blockquote,
  pre,
  hr {
    margin: ${themeGet("space.2")} auto;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3 {
    margin: ${themeGet("space.2")} auto;
  }

  h1 {
    ${toStyle({ ...THEME.textVariants.xxl })}
  }

  h2 {
    ${toStyle({ ...THEME.textVariants.xl })}
  }

  h3 {
    ${toStyle({ ...THEME.textVariants["lg-display"] })}
  }

  ul {
    list-style: disc;
  }

  ul,
  ol,
  li {
    margin: ${themeGet("space.2")} auto;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin-left: ${themeGet("space.2")};
  }

  p,
  li {
    ${toStyle({ ...THEME.textVariants.md })}
  }

  a {
    transition: color 250ms;
    text-decoration: underline;

    &:hover {
      color: ${themeGet("colors.brand")};
    }
  }

  hr {
    height: 1px;
    border: 0;
    background-color: ${themeGet("colors.mono10")};
  }

  blockquote {
    ${toStyle({ ...THEME.textVariants.bq })}
  }
`
