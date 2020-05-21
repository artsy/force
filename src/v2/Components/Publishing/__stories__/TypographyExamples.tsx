import { avantgarde, garamond, unica } from "v2/Assets/Fonts"
import React from "react"
import styled from "styled-components"

export const Typography = () => {
  return (
    <div>
      <GaramondS50>Garamond s50: 50px / 1.1em</GaramondS50>
      <GaramondS40>Garamond s40: 40px / 1.1em</GaramondS40>
      <GaramondS37>Garamond s37: 37px / 1.2em</GaramondS37>
      <GaramondS34>Garamond s34: 34px / 1.5em</GaramondS34>
      <GaramondS30>Garamond s30: 30px / 1.25em</GaramondS30>
      <GaramondS28>Garamond s28: 28px / 1.5em</GaramondS28>
      <GaramondS23>Garamond s23: 23px / 1.5em</GaramondS23>
      <GaramondS19>Garamond s19: 19px / 1.1em</GaramondS19>
      <GaramondS17>Garamond s17: 17px / 1.1em</GaramondS17>
      <GaramondS15>Garamond s15: 15px / 1.25em</GaramondS15>
      <GaramondS11>Garamond s11: 11px / 1.1em</GaramondS11>
      <hr />
      <br />
      <AvantGardeS13>Avant Garde s13: 13px / 1.65em</AvantGardeS13>
      <AvantGardeS11>Avant Garde s11: 11px / 1.65em</AvantGardeS11>
      <hr />
      <UnicaS120>Unica s120: 120px / 1.1em</UnicaS120>
      <UnicaS100>Unica s100: 100px / 1.1em</UnicaS100>
      <UnicaS80>Unica s80: 80px / 1.1em</UnicaS80>
      <UnicaS67>Unica s67: 67px / 1em</UnicaS67>
      <UnicaS65>Unica s65: 65px / 1em</UnicaS65>
      <UnicaS45>Unica s45: 45px / 1.1em</UnicaS45>
      <UnicaS40>Unica s40: 40px / 1.1em</UnicaS40>
      <UnicaS34>Unica s34: 34px / 1.1em</UnicaS34>
      <UnicaS32>Unica s32: 32px / 1.1em</UnicaS32>
      <UnicaS19>Unica s19: 19px / 1.5em</UnicaS19>
      <UnicaS16>Unica s16: 16px / 1.1em</UnicaS16>
      <UnicaS14>Unica s14: 14px / 1.1em</UnicaS14>
      <UnicaS12>Unica s12: 12px / 1.1em</UnicaS12>
    </div>
  )
}

const GaramondS11 = styled.div`
  ${garamond("s11")};
  margin-bottom: 20px;
`
const GaramondS15 = styled.div`
  ${garamond("s15")};
  margin-bottom: 20px;
`
const GaramondS17 = styled.div`
  ${garamond("s17")};
  margin-bottom: 20px;
`
const GaramondS19 = styled.div`
  ${garamond("s19")};
  margin-bottom: 20px;
`
const GaramondS23 = styled.div`
  ${garamond("s23")};
  margin-bottom: 20px;
`
const GaramondS28 = styled.div`
  ${garamond("s28")};
  margin-bottom: 20px;
`
const GaramondS30 = styled.div`
  ${garamond("s30")};
  margin-bottom: 20px;
`
const GaramondS34 = styled.div`
  ${garamond("s34")};
  margin-bottom: 20px;
`
const GaramondS37 = styled.div`
  ${garamond("s37")};
  margin-bottom: 20px;
`
const GaramondS40 = styled.div`
  ${garamond("s40")};
  margin-bottom: 20px;
`
const GaramondS50 = styled.div`
  ${garamond("s50")};
  margin-bottom: 20px;
`

const AvantGardeS11 = styled.div`
  ${avantgarde("s11")};
  margin-bottom: 20px;
`
const AvantGardeS13 = styled.div`
  ${avantgarde("s13")};
  margin-bottom: 20px;
`

const UnicaS12 = styled.div`
  ${unica("s12")};
  margin-bottom: 20px;
`
const UnicaS14 = styled.div`
  ${unica("s14")};
  margin-bottom: 20px;
`
const UnicaS16 = styled.div`
  ${unica("s16")};
  margin-bottom: 20px;
`
const UnicaS19 = styled.div`
  ${unica("s19")};
  margin-bottom: 20px;
`
const UnicaS32 = styled.div`
  ${unica("s32")};
  margin-bottom: 20px;
`
const UnicaS34 = styled.div`
  ${unica("s34")};
  margin-bottom: 20px;
`
const UnicaS40 = styled.div`
  ${unica("s40")};
  margin-bottom: 20px;
`
const UnicaS45 = styled.div`
  ${unica("s45")};
  margin-bottom: 20px;
`
const UnicaS65 = styled.div`
  ${unica("s65")};
  margin-bottom: 20px;
`
const UnicaS67 = styled.div`
  ${unica("s67")};
  margin-bottom: 20px;
`
const UnicaS80 = styled.div`
  ${unica("s80")};
  margin-bottom: 20px;
`
const UnicaS100 = styled.div`
  ${unica("s100")};
  margin-bottom: 20px;
`
const UnicaS120 = styled.div`
  ${unica("s120")};
  margin-bottom: 20px;
`
