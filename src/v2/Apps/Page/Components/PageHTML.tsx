import { Box, THEME_V3 as THEME } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { toStyle } from "v2/Utils/toStyle"

export const PageHTML = styled(Box)`
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
    margin: ${themeGet("space.2")} auto;
    text-align: center;
  }

  h1 {
    ${toStyle({ ...THEME.textVariants.xl })}
  }

  h2 {
    ${toStyle({ ...THEME.textVariants.lg })}
  }

  h3 {
    ${toStyle({ ...THEME.textVariants.md, fontWeight: "bold" })}
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
  li,
  details {
    ${toStyle({ ...THEME.textVariants.sm })}
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
    ${toStyle({ ...THEME.textVariants.lg })}
  }
`
