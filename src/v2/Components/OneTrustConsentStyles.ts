/**
 * The way this works is that we develop the styles locally for a reasonable
 * feedback loop and access to our themed values, then extract and copy them
 * into the template in the onetrust.com dashboard.
 *
 * To develop locally: in Boot.tsx
 * `import { OneTrustConsentStyles } from "v2/Components/OneTrustConsentStyles"`
 * and include the `<OneTrustConsentStyles />` component in the render method.
 *
 * When you're ready, you can just return only the `<OneTrustConsentStyles />`
 * component, then copy out the compiled styles. Log into onetrust.com and find
 * the template. Click on "Styling", then paste into the "Custom CSS" field.
 * Save the template, then go to "Integration" > "Scripts". Click the environment
 * and publish.
 *
 * This is not good code. This is not good CSS. What this is, is an effort to
 * overwrite the default styles from OneTrust. We can't blanket reset/remove the
 * entire stylesheet, because the modal management, etc, relies on some of the
 * default styles and would be too difficult/cumbersome to rewrite. We're also
 * reliant on whatever selectors are given to us. Frustratingly, OneTrust styles
 * happen at different levels of specificity, hence the blanket !important.
 * Consider this write once, read never.
 */
import { createGlobalStyle, css } from "styled-components"
import { THEME_V3 as THEME } from "@artsy/palette-tokens"
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  BUTTON_TEXT_SIZES,
  DROP_SHADOW,
  TextVariant,
} from "@artsy/palette"

const toStyle = (style: Record<string, string | number | undefined>) => {
  return [...Object.entries(style), ["boxSizing", "border-box"]]
    .map(([key, value]) => {
      const property = key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
      return `${property}: ${value} !important;`
    })
    .join("")
}

const toTokens = (config: Record<string, string>) => {
  return Object.entries(config).reduce((acc, [key, value]) => {
    return { ...acc, [key]: THEME.colors[value] ?? value }
  }, {})
}

const baseButtonStyles = {
  all: "unset",
  backgroundColor: THEME.colors.black100,
  border: "1px solid",
  color: THEME.colors.white100,
  cursor: "pointer",
  fontWeight: "normal",
  padding: `0 ${THEME.space[4]}`,
  textAlign: "center",
  transition:
    "color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
  whiteSpace: "nowrap",
  // Medium size
  ...THEME.textVariants[BUTTON_TEXT_SIZES.medium as TextVariant],
  ...BUTTON_SIZES.medium,
}

const baseButtonMixin = toStyle(baseButtonStyles)

const buttonVariants = {
  primaryBlack: css`
    ${toStyle(toTokens(BUTTON_VARIANTS.default.primaryBlack))}
    &:hover {
      ${toStyle(toTokens(BUTTON_VARIANTS.hover.primaryBlack))}
    }
  `,
  secondaryOutline: css`
    ${toStyle(toTokens(BUTTON_VARIANTS.default.secondaryOutline))}
    &:hover {
      ${toStyle(toTokens(BUTTON_VARIANTS.hover.secondaryOutline))}
    }
  `,
}

const modalDialogHeaderHeight = `calc(26px + (${THEME.space[2]} * 2))` // Logo is manually sized to 26px
const modalDialogFooterHeight = `calc(${BUTTON_SIZES.medium.height} + (${THEME.space[2]} * 2))`
const modalDialogFooterMobileHeight = `calc((${BUTTON_SIZES.medium.height} * 2) + (${THEME.space[2]} * 2) + ${THEME.space[1]})`

export const OneTrustConsentStyles = createGlobalStyle`
  #onetrust-consent-sdk {
    /* Modal Dialog */
    .ot-pc-header {
      ${toStyle({
        all: "unset",
        display: "flex",
        alignItems: "center",
        padding: `0 ${THEME.space[2]}`,
        height: modalDialogHeaderHeight,
      })}
    }

    .ot-pc-logo {
      /* Match logo height to design system modal */
      ${toStyle({
        width: "75px",
        height: "26px",
      })}
    }

    #close-pc-btn-handler {
      ${toStyle({
        top: 0,
        right: 0,
        height: modalDialogHeaderHeight,
        width: modalDialogHeaderHeight,
      })}
    }

    #ot-pc-content {
      ${toStyle({
        margin: 0,
        padding: `0 ${THEME.space[2]} ${THEME.space[2]} ${THEME.space[2]}`,
        width: "100%",
        top: modalDialogHeaderHeight,
        bottom: modalDialogFooterHeight,
      })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          bottom: modalDialogFooterMobileHeight,
        })}
      }
    }

    #ot-pc-title {
      ${toStyle({
        all: "unset",
        display: "block",
        marginBottom: THEME.space[2],
        ...THEME.textVariants.lg,
      })}
    }

    #ot-pc-desc {
      ${toStyle({
        all: "unset",
        display: "block",
        margin: `${THEME.space[2]} 0`,
        ...THEME.textVariants.sm,
      })}

      > a {
        ${toStyle({
          display: "block",
          marginTop: THEME.space[2],
        })}
      }
    }

    #accept-recommended-btn-handler {
      ${toStyle({
        ...baseButtonStyles,
        display: "block",
        width: "50%",
        margin: `0 0 ${THEME.space[2]} 0`,
      })}
      ${buttonVariants.primaryBlack}
    }

    #ot-category-title {
      ${toStyle({
        all: "unset",
        display: "block",
        margin: `${THEME.space[4]} 0 ${THEME.space[2]} 0`,
        ...THEME.textVariants.lg,
      })}
    }

    .ot-accordion-layout.ot-cat-item {
      ${toStyle({
        borderColor: THEME.colors.black10,
        borderRadius: 0,
      })}

      &:first-of-type {
        ${toStyle({
          marginTop: 0,
        })}
      }

      .ot-always-active-group {
        ${toStyle({
          width: "100%",
          padding: `${THEME.space[1]} ${THEME.space[2]}`,
        })}
      }

      .ot-always-active {
        ${toStyle({
          ...THEME.textVariants.xs,
          fontWeight: "normal",
          textTransform: "uppercase",
          color: THEME.colors.blue100,
        })}

        @media (max-width: ${THEME.breakpoints.sm}) {
          ${toStyle({
            display: "none",
          })}
        }
      }

      .ot-acc-hdr {
        ${toStyle({
          width: "100%",
          minHeight: "unset",
        })}
      }

      .ot-acc-txt {
        ${toStyle({
          padding: 0,
        })}
      }

      .ot-category-desc {
        ${toStyle({
          all: "unset",
          display: "block",
          color: THEME.colors.black60,
          padding: `0 ${THEME.space[2]} ${THEME.space[1]} ${THEME.space[2]}`,
          ...THEME.textVariants.xs,
        })}
      }

      /* Nested switches */
      .ot-subgrp-cntr {
        ${toStyle({
          all: "unset",
          display: "block",
          padding: 0,
        })}
      }

      .ot-subgrp {
        ${toStyle({
          display: "block",
          margin: 0,
          padding: `${THEME.space[1]} ${THEME.space[2]}`,
          borderTop: `1px solid ${THEME.colors.black10}`,
        })}

        > h5 {
          ${toStyle({
            all: "unset",
            display: "inline-block",
            ...THEME.textVariants.sm,
          })}
        }

        .ot-subgrp-tgl {
          ${toStyle({
            marginTop: 0,
          })}
        }

        .ot-subgrp-desc {
          ${toStyle({
            all: "unset",
            display: "block",
            marginTop: THEME.space[1],
            color: THEME.colors.black60,
            ...THEME.textVariants.xs,
          })}
        }
      }
    }

    /* Toggle = false */
    .ot-switch {
      .ot-switch-nob {
        ${toStyle({
          backgroundColor: THEME.colors.black15,
          border: 0,
        })}

        &:before {
          ${toStyle({
            backgroundColor: THEME.colors.white100,
            boxShadow: DROP_SHADOW,
            left: "2px",
            bottom: "2px",
          })}
        }
      }
    }

    /* Toggle = true */
    .category-switch-handler[checked] + .ot-switch,
    .cookie-subgroup-handler[checked] + .ot-switch {
      .ot-switch-nob {
        ${toStyle({
          backgroundColor: THEME.colors.black100,
        })}

        &:before {
          ${toStyle({
            boxShadow: "unset",
          })}
        }
      }
    }

    .ot-cat-header {
      ${toStyle({
        all: "unset",
        ...THEME.textVariants.sm,
      })}
    }

    .ot-pc-footer {
      ${toStyle({
        borderTop: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: modalDialogFooterHeight,
        boxShadow: DROP_SHADOW,
      })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          height: modalDialogFooterMobileHeight,
        })}
      }
    }

    .ot-btn-container {
      ${toStyle({
        display: "flex",
        padding: `0 ${THEME.space[2]}`,
        width: "100%",
      })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          display: "block",
          padding: `0 ${THEME.space[1]}`,
        })}
      }
    }

    .ot-pc-refuse-all-handler,
    .onetrust-close-btn-handler {
      ${toStyle({
        ...baseButtonStyles,
        flex: 1,
      })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          display: "block",
          width: "100%",
        })}
      }
    }

    .ot-pc-refuse-all-handler {
      ${buttonVariants.secondaryOutline}
      ${toStyle({ marginRight: THEME.space[0.5] })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({ marginRight: 0, marginBottom: THEME.space[1] })}
      }
    }

    .onetrust-close-btn-handler {
      ${buttonVariants.primaryBlack}
      ${toStyle({ marginLeft: THEME.space[0.5] })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({ marginLeft: 0 })}
      }
    }

    .ot-pc-footer-logo {
      ${toStyle({
        display: "none",
      })}
    }

    /* Banner */
    #onetrust-banner-sdk {
      ${toStyle({
        boxShadow: DROP_SHADOW,
      })}

      .ot-sdk-row {
        ${toStyle({
          display: "flex",
          padding: THEME.space[4],
        })}

        @media (max-width: ${THEME.breakpoints.sm}) {
          ${toStyle({
            flexDirection: "column",
            padding: THEME.space[2],
          })}
        }
      }
    }

    .ot-sdk-container {
      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          width: "100%",
        })}
      }
    }

    #onetrust-group-container {
      ${toStyle({
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      })}
    }

    #onetrust-button-group-parent {
      ${toStyle({
        all: "unset",
        display: "flex",
        alignItems: "center",
        paddingLeft: THEME.space[2],
      })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          paddingLeft: 0,
        })}
      }
    }

    #onetrust-policy {
      ${toStyle({
        margin: 0,
      })}
    }

    #onetrust-policy-title {
      ${toStyle({
        display: "block",
        float: "none",
        fontWeight: "normal",
        marginBottom: THEME.space["1"],
        ...THEME.textVariants.lg,
      })}
    }

    #onetrust-policy-text {
      ${toStyle({
        margin: 0,
        ...THEME.textVariants.sm,
      })}

      > a {
        ${toStyle({
          fontWeight: "normal",
        })}
      }
    }

    #onetrust-button-group#onetrust-button-group#onetrust-button-group {
      ${toStyle({
        all: "unset",
        display: "flex",
      })}

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          flexDirection: "column",
        })}
      }

      > button {
        ${baseButtonMixin}

        &:first-child {
          ${toStyle({ marginRight: THEME.space[1] })}
          ${buttonVariants.secondaryOutline}
        }

        &:last-child {
          ${toStyle({ marginLeft: THEME.space[1] })}
          ${buttonVariants.primaryBlack}
        }
      }

      @media (max-width: ${THEME.breakpoints.sm}) {
        ${toStyle({
          width: "100%",
          flexDirection: "column",
        })}

        > button {
          ${toStyle({
            margin: 0,
            width: "100%",
          })}

          &:first-child {
            ${toStyle({ marginTop: THEME.space[2], marginRight: 0 })},
          }

          &:last-child {
            ${toStyle({ marginTop: THEME.space[1], marginLeft: 0 })},
          }
        }
      }
    }
  }
`
