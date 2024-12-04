export function buildHtmlTemplate({
  cdnUrl,
  content,
  disable,
  fontUrl,
  htmlWebpackPlugin,
  icons,
  imageCdnUrl,
  manifest,
  sd,
}) {
  // const headTags = !disable.scripts
  //   ? htmlWebpackPlugin.tags.headTags
  //       .map(originalTag => {
  //         const attributes = Object.entries(originalTag.attributes)
  //           .map(([key, value]) => `${key}="${cdnUrl}${value}"`)
  //           .join(" ")
  //         return `<script ${attributes}></script>`
  //       })
  //       .join("\n")
  //   : ""

  // const bodyTags = !disable.scripts
  //   ? htmlWebpackPlugin.tags.bodyTags
  //       .map(originalTag => {
  //         const attributes = Object.entries(originalTag.attributes)
  //           .map(([key, value]) => `${key}="${cdnUrl}${value}"`)
  //           .join(" ")
  //         return `<script ${attributes} async></script>`
  //       })
  //       .join("\n")
  //   : ""

  const segmentScript =
    !disable.segment && !sd.THIRD_PARTIES_DISABLED && sd.SEGMENT_WRITE_KEY
      ? `
    <script type="text/javascript" defer>
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
      }}();
    </script>
    `
      : ""

  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta charset="utf-8" />

      <!-- Preconnect to CDNs -->
      <link rel="preconnect" href="${cdnUrl}" crossorigin />
      <link rel="preconnect" href="${imageCdnUrl}" crossorigin />

      <!-- Create preload tags for most common fonts -->
      <link rel="preconnect" href="${fontUrl}" crossorigin />
      <link rel="preload" href="${fontUrl}/all-webfonts.css" as="style" />
      <link rel="preload" href="${fontUrl}/ll-unica77_regular.woff2" as="font" type="font/woff2" crossorigin />
      <link rel="preload" href="${fontUrl}/ll-unica77_medium.woff2" as="font" type="font/woff2" crossorigin />
      <link rel="preload" href="${fontUrl}/ll-unica77_italic.woff2" as="font" type="font/woff2" crossorigin />
      <link rel="icon" type="image/png" href="${icons.favicon}" sizes="any" />
      <link rel="icon" type="image/svg+xml" href="${icons.faviconSVG}" />
      <link rel="apple-touch-icon" href="${icons.appleTouchIcon}">
      <link rel="manifest" href="${manifest.webmanifest}">

      <link rel="search" type="application/opensearchdescription+xml" href="${
        manifest.openSearch
      }" title="Artsy" />

      <meta name="msapplication-config" content="${manifest.browserconfig}" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      <meta property="fb:admins" content="7961740" />
      <meta property="fb:app_id" content="308278682573501" />
      <meta property="fb:pages" content="342443413406" />

      <link type="text/css" rel="stylesheet" href="${fontUrl}/all-webfonts.css" />

      ${content.linkPreloadTags ? content.linkPreloadTags.join("") : ""}
      ${content.head || ""}
      ${content.style || ""}
      ${content.data || ""}
    </head>

    <body>
      <!-- Inject route-level bundle-split scripts from loadable-components -->
      <!-- Other scripts are injected via HTMLWebpackPlugin during webpack build time -->
      ${content.scripts || ""}

      <div id="react-modal-container"></div>
      <div id="root">${content.body || ""}</div>

      ${segmentScript}
    </body>
    </html>
  `
}
