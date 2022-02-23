import { Box, BoxProps, THEME_V3 as THEME, useDidMount } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import styled from "styled-components"
import reactHtmlParser from "@artsy/react-html-parser"
import { ArticleTooltip, isSupportedArticleTooltip } from "./ArticleTooltip"

interface ArticleHTMLProps extends BoxProps {
  children: string
}

export const ArticleHTML: FC<ArticleHTMLProps> = ({ children, ...rest }) => {
  const isMounted = useDidMount()

  // Looks for links and if they are internal and a supported entity type,
  // inserts the relevant tooltip.
  const transform = (node: Element) => {
    if (node.tagName !== "A") return

    const { href } = node as HTMLAnchorElement

    try {
      const uri = new URL(href)

      if (!uri.hostname.includes("artsy.net")) return

      const [_, entity, id] = uri.pathname.split("/")

      if (!isSupportedArticleTooltip(entity)) return

      return (
        <ArticleTooltip entity={entity} id={id} href={href}>
          {node.textContent}
        </ArticleTooltip>
      )
    } catch {
      // If we can't parse the URL, just return the node un-transformed.
      return
    }
  }

  if (isMounted) {
    return <Container>{reactHtmlParser(children, { transform })}</Container>
  }

  return <Container dangerouslySetInnerHTML={{ __html: children }} {...rest} />
}

const toStyle = (style: Record<string, string | number | undefined>) => {
  return Object.entries(style)
    .map(([key, value]) => {
      const property = key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
      return `${property}: ${value};`
    })
    .join("")
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
    margin: ${themeGet("space.1")} auto;

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
    margin: ${themeGet("space.4")} auto;

    a {
      text-decoration: none;
    }
  }

  h1 {
    ${toStyle({ ...THEME.textVariants.xxl })}
  }

  h2 {
    ${toStyle({ ...THEME.textVariants.xl })}
  }

  h3 {
    ${toStyle({ ...THEME.textVariants.lg })}
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
    ${toStyle({ ...THEME.textVariants.sm })}
  }

  a {
    transition: color 250ms;

    &:hover {
      color: ${themeGet("colors.brand")};
    }
  }

  hr {
    height: 1px;
    border: 0;
    background-color: ${themeGet("colors.black10")};
  }

  blockquote {
    ${toStyle({ ...THEME.textVariants.xl })}
  }
`
