import { css } from "styled-components"

const GaramondSizes = {
  s11: {
    height: "1.1em",
    size: "11px",
  },
  s14: {
    height: "18px",
    size: "14px",
  },
  s15: {
    height: "1.25em",
    size: "15px",
  },
  s16: {
    height: "1.4em",
    size: "16px",
  },
  s17: {
    height: "1.1em",
    size: "17px",
  },
  s18: {
    height: "1.4em",
    size: "18px",
  },
  s19: {
    height: "1.5em",
    size: "19px",
  },
  s23: {
    height: "1.5em",
    size: "23px",
  },
  s28: {
    height: "1.2em",
    size: "28px",
  },
  s30: {
    height: "1.25em",
    size: "30px",
  },
  s34: {
    height: "1.1em",
    size: "34px",
  },
  s37: {
    height: "1.2em",
    size: "37px",
  },
  s40: {
    height: "1.1em",
    size: "40px",
  },
  s50: {
    height: "1.1em",
    size: "50px",
  },
}

const UnicaSizes = {
  s10: {
    height: "1.4em",
    size: "10px",
  },
  s12: {
    height: "1.4em",
    size: "12px",
  },
  s14: {
    height: "1.4em",
    size: "14px",
  },
  s16: {
    height: "1.1em",
    size: "16px",
  },
  s100: {
    size: "100px",
    height: "1.1em",
  },
  s18: {
    height: "1.1em",
    size: "18px",
  },
  s120: {
    height: "1.1em",
    size: "120px",
  },
  s19: {
    height: "1.5em",
    size: "19px",
  },
  s25: {
    height: "1.1em",
    size: "25px",
  },
  s32: {
    height: "1.1em",
    size: "32px",
  },
  s34: {
    height: "1.1em",
    size: "34px",
  },
  s40: {
    height: "1.1em",
    size: "40px",
  },
  s45: {
    height: "1.2em",
    size: "45px",
  },
  s65: {
    height: "1em",
    size: "65px",
  },
  s67: {
    height: "1em",
    size: "67px",
  },
  s80: {
    height: "1.1em",
    size: "80px",
  },
}

const AvantGardeSizes = {
  s11: {
    height: "1.65em",
    size: "11px",
  },
  s13: {
    height: "1.65em",
    size: "13px",
  },
}

const fontFamily = {
  avantgarde: {
    regular:
      "'ITC Avant Garde Gothic W04','AvantGardeGothicITCW01D 731075', AvantGardeGothicITCW01Dm, Helvetica, sans-serif",
  },
  garamond: {
    regular:
      "'Adobe Garamond W08', 'adobe-garamond-pro', 'AGaramondPro-Regular', 'Times New Roman', Times, serif",
  },
  unica: {
    italic: "Unica77LLWebItalic",
    medium: "Unica77LLWebMedium",
    mediumItalic: "Unica77LLWebMediumItalic",
    regular: "Unica77LLWebRegular",
  },
}

export const unica = (size: keyof typeof UnicaSizes, family = "regular") => {
  const evaluatedSize = UnicaSizes[size]
  return css`
    font-family: ${fontFamily.unica[family]}, Arial, serif;
    -webkit-font-smoothing: antialiased;
    font-size: ${evaluatedSize.size};
    line-height: ${evaluatedSize.height};
  `
}

export const avantgarde = (size: keyof typeof AvantGardeSizes) => {
  return css`
    font-family: ${fontFamily.avantgarde.regular};
    -webkit-font-smoothing: antialiased;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: ${AvantGardeSizes[size].size};
    line-height: ${AvantGardeSizes[size].height};
  `
}

export const garamond = (size: keyof typeof GaramondSizes) => {
  return css`
    font-family: ${fontFamily.garamond.regular};
    font-size: ${GaramondSizes[size].size};
    line-height: ${GaramondSizes[size].height};
    -webkit-font-smoothing: antialiased;
  `
}
