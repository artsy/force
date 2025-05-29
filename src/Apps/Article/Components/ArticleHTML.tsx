import { ContextModule } from "@artsy/cohesion"
import { Box, type BoxProps, Flex, THEME } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
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
      const artistLinks = heading?.querySelectorAll(
        "a[href^='https://www.artsy.net/artist/']",
      )

      const isArtistHeading =
        entity === "artist" && heading && artistLinks?.length === 1

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
