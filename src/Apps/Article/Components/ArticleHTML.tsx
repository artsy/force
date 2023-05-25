import { Box, BoxProps, THEME, useDidMount } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import styled from "styled-components"
import reactHtmlParser from "@artsy/react-html-parser"
import { ArticleTooltip, isSupportedArticleTooltip } from "./ArticleTooltip"
import { toStyle } from "Utils/toStyle"

interface ArticleHTMLProps extends BoxProps {
  children: string
}

export const ArticleHTML: FC<ArticleHTMLProps> = ({ children, ...rest }) => {
  const isMounted = useDidMount()

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

  if (isMounted) {
    return (
      <Container {...rest}>
        {reactHtmlParser(children, { transform })}
      </Container>
    )
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
    background-color: ${themeGet("colors.black10")};
  }

  blockquote {
    ${toStyle({ ...THEME.textVariants.bq })}
  }
`
