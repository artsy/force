export interface HTMLProps {
  cdnUrl: string
  content: {
    body?: string
    sharifyData?: string
    head?: string
    linkPreloadTags?: string[]
    scripts?: string
    style?: string
  }
  disable: {
    analytics: boolean
    segment: boolean
    stripe: boolean
    scripts: boolean
    thirdParties: boolean
  }
  env: string
  fontUrl: string
  icons: {
    appleTouchIcon: string
    favicon: string
    faviconSVG: string
  }
  imageCdnUrl: string
  manifest: {
    browserconfig: string
    openSearch: string
    webmanifest: string
  }
}

export function buildHtmlTemplate({
  cdnUrl,
  content,
  disable,
  fontUrl,
  icons,
  imageCdnUrl,
  manifest,
}: HTMLProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta charset="utf-8" />

      <!-- Preconnect to CDNs -->
      <link rel="preconnect" href="${cdnUrl}" crossorigin />
      <link rel="preconnect" href="${imageCdnUrl}" />

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

      <script>window.__artsyInitialReferrer = document.referrer; console.log("Setting window.__artsyInitialReferrer to", document.referrer);</script>

      ${content.linkPreloadTags ? content.linkPreloadTags.join("") : ""}
      ${content.head || ""}
      ${content.style || ""}
      ${content.sharifyData || ""}
    </head>

    <body>

      ${(() => {
        if (!disable.segment) {
          return `
              <script defer type="text/javascript">
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";}}();
              </script>
            `
        }
      })()}

      ${content.scripts || ""}

      <div id="react-modal-container"></div>
      <div id="root">${content.body || ""}</div>
    </body>
    </html>
  `
}
