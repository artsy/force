import { createFragmentContainer, graphql } from "react-relay"
import { StaticPageApp_page } from "v2/__generated__/StaticPageApp_page.graphql"
import {
  Box,
  BoxProps,
  Column,
  GridColumns,
  THEME_V3 as THEME,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import styled from "styled-components"
import { MetaTags } from "v2/Components/MetaTags"

interface StaticPageProps {
  page: StaticPageApp_page
}

const StaticPageApp: React.FC<StaticPageProps> = ({ page }) => {
  if (!page.content) {
    return null
  }

  return (
    <>
      <MetaTags title={page.name} />

      <GridColumns>
        <Column span={8} start={3}>
          <PageHTML>{page.content}</PageHTML>
        </Column>
      </GridColumns>
    </>
  )
}

export const StaticPageAppFragmentContainer = createFragmentContainer(
  StaticPageApp,
  {
    page: graphql`
      fragment StaticPageApp_page on Page {
        name
        content(format: HTML)
      }
    `,
  }
)

interface ArticleHTMLProps extends BoxProps {
  children: string
}

export const PageHTML: FC<ArticleHTMLProps> = ({ children, ...rest }) => {
  return (
    <Container
      dangerouslySetInnerHTML={{ __html: children }}
      {...rest}
      mt={2}
    />
  )
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
  ul,
  ol,
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

  h1 {
    ${toStyle({ ...THEME.textVariants.xl })}
    margin-top: ${themeGet("space.2")};
    margin-bottom: ${themeGet("space.2")};
    text-align: center;
  }

  h2 {
    ${toStyle({ ...THEME.textVariants.lg })}
    margin-top: ${themeGet("space.2")};
    margin-bottom: ${themeGet("space.2")};
    text-align: center;

    a {
      text-decoration: none;
    }
  }

  h3 {
    ${toStyle({ ...THEME.textVariants.lg })}
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
