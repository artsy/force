// Shared font configuration consumed by both `html.ts` (rendered into the
// document <head>) and `renderServerApp.tsx` (emitted as Link HTTP headers
// for early hints / preload).

const FONT_FACE_CSS = (fontUrl: string) => `
  @font-face {
    font-family: "ll-unica77";
    src: url("${fontUrl}/ll-unica77_regular.woff2") format("woff2"),
         url("${fontUrl}/ll-unica77_regular.woff")  format("woff");
    font-weight: normal; font-style: normal; font-display: fallback;
  }
  @font-face {
    font-family: "ll-unica77";
    src: url("${fontUrl}/ll-unica77_italic.woff2") format("woff2"),
         url("${fontUrl}/ll-unica77_italic.woff")  format("woff");
    font-weight: normal; font-style: italic; font-display: fallback;
  }
  @font-face {
    font-family: "ll-unica77";
    src: url("${fontUrl}/ll-unica77_medium.woff2") format("woff2"),
         url("${fontUrl}/ll-unica77_medium.woff")  format("woff");
    font-weight: bold; font-style: normal; font-display: fallback;
  }
  @font-face {
    font-family: "ll-unica77";
    src: url("${fontUrl}/ll-unica77_medium-italic.woff2") format("woff2"),
         url("${fontUrl}/ll-unica77_medium-italic.woff")  format("woff");
    font-weight: bold; font-style: italic; font-display: fallback;
  }
`

/**
 * Returns the markup to be rendered into the document <head>: preload hints
 * for the most common font weights plus inlined @font-face declarations.
 */
export const getFontTags = (fontUrl: string) => `
  <link rel="preload" href="${fontUrl}/ll-unica77_regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="${fontUrl}/ll-unica77_medium.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="${fontUrl}/ll-unica77_italic.woff2" as="font" type="font/woff2" crossorigin />
  <style>${FONT_FACE_CSS(fontUrl)}</style>
`

/**
 * Returns the corresponding `Link` HTTP header entries for early hints.
 */
export const getFontLinkHeaders = (fontUrl: string) => [
  `<${fontUrl}/ll-unica77_regular.woff2>; rel=preload; as=font; crossorigin`,
  `<${fontUrl}/ll-unica77_italic.woff2>; rel=preload; as=font; crossorigin`,
  `<${fontUrl}/ll-unica77_medium.woff2>; rel=preload; as=font; crossorigin`,
]
