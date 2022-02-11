import { Box, BoxProps, THEME_V3 as THEME } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import styled from "styled-components"

interface ArticleHTMLProps extends BoxProps {
  children: string
}

export const ArticleHTML: FC<ArticleHTMLProps> = ({ children, ...rest }) => {
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

  p {
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
`
