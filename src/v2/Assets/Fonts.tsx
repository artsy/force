import { css } from "styled-components"

const GaramondSizes = {
  s11: {
    size: "11px",
    height: "1.1em",
  },
  s14: {
    size: "14px",
    height: "18px",
  },
  s15: {
    size: "15px",
    height: "1.25em",
  },
  s16: {
    size: "16px",
    height: "1.4em",
  },
  s17: {
    size: "17px",
    height: "1.1em",
  },
  s18: {
    size: "18px",
    height: "1.4em",
  },
  s19: {
    size: "19px",
    height: "1.5em",
  },
  s23: {
    size: "23px",
    height: "1.5em",
  },
  s28: {
    size: "28px",
    height: "1.2em",
  },
  s30: {
    size: "30px",
    height: "1.25em",
  },
  s34: {
    size: "34px",
    height: "1.1em",
  },
  s37: {
    size: "37px",
    height: "1.2em",
  },
  s40: {
    size: "40px",
    height: "1.1em",
  },
  s50: {
    size: "50px",
    height: "1.1em",
  },
}

const UnicaSizes = {
  s10: {
    size: "10px",
    height: "1.4em",
  },
  s12: {
    size: "12px",
    height: "1.4em",
  },
  s14: {
    size: "14px",
    height: "1.4em",
  },
  s16: {
    size: "16px",
    height: "1.1em",
  },
  s18: {
    size: "18px",
    height: "1.1em",
  },
  s19: {
    size: "19px",
    height: "1.5em",
  },
  s25: {
    size: "25px",
    height: "1.1em",
  },
  s32: {
    size: "32px",
    height: "1.1em",
  },
  s34: {
    size: "34px",
    height: "1.1em",
  },
  s40: {
    size: "40px",
    height: "1.1em",
  },
  s45: {
    size: "45px",
    height: "1.2em",
  },
  s65: {
    size: "65px",
    height: "1em",
  },
  s67: {
    size: "67px",
    height: "1em",
  },
  s80: {
    size: "80px",
    height: "1.1em",
  },
  s100: {
    size: "100px",
    height: "1.1em",
  },
  s120: {
    size: "120px",
    height: "1.1em",
  },
}

const AvantGardeSizes = {
  s11: {
    size: "11px",
    height: "1.65em",
  },
  s13: {
    size: "13px",
    height: "1.65em",
  },
}

const fontFamily = {
  unica: {
    regular: "Unica77LLWebRegular",
    italic: "Unica77LLWebItalic",
    medium: "Unica77LLWebMedium",
    mediumItalic: "Unica77LLWebMediumItalic",
  },
  avantgarde: {
    regular:
      "'ITC Avant Garde Gothic W04','AvantGardeGothicITCW01D 731075', AvantGardeGothicITCW01Dm, Helvetica, sans-serif",
  },
  garamond: {
    regular:
      "'Adobe Garamond W08', 'adobe-garamond-pro', 'AGaramondPro-Regular', 'Times New Roman', Times, serif",
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
