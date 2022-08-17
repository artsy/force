import express from "express"
import { getENV } from "Utils/getENV"
import httpProxy from "http-proxy"
import { SITEMAP_BASE_URL } from "Server/config"

const sitemapsServerApp = express()

sitemapsServerApp.set("views", `${__dirname}/templates`)
sitemapsServerApp.set("view engine", "ejs")

const APP_URL = getENV("APP_URL")

const sitemapProxy = httpProxy.createProxyServer({
  target: SITEMAP_BASE_URL,
})

sitemapsServerApp
  .get("/robots.txt", (_req, res) => {
    res.type("text/plain")
    res.send(
      getENV("ENABLE_WEB_CRAWLING") ? ENABLED_ROBOTS_TXT : DISABLED_ROBOTS_TXT
    )
  })
  .get("/sitemap-misc.xml", (req, res) => {
    res.set("Content-Type", "text/xml")

    const urls = [
      { loc: APP_URL, priority: 1 },
      { loc: `${APP_URL}/about`, priority: 1 },
      { loc: `${APP_URL}/all-cities` },
      { loc: `${APP_URL}/art-appraisals` },
      { loc: `${APP_URL}/art-fairs` },
      { loc: `${APP_URL}/articles` },
      { loc: `${APP_URL}/artists`, priority: 1 },
      { loc: `${APP_URL}/artsy-education` },
      { loc: `${APP_URL}/auction-info` },
      { loc: `${APP_URL}/auction-partnerships` },
      { loc: `${APP_URL}/auctions` },
      { loc: `${APP_URL}/buyer-guarantee` },
      { loc: `${APP_URL}/buying-with-artsy` },
      { loc: `${APP_URL}/categories` },
      { loc: `${APP_URL}/collect`, priority: 1 },
      { loc: `${APP_URL}/conditions-of-sale` },
      { loc: `${APP_URL}/consign` },
      { loc: `${APP_URL}/contact` },
      { loc: `${APP_URL}/institution-partnerships` },
      { loc: `${APP_URL}/institutions` },
      { loc: `${APP_URL}/jobs` },
      { loc: `${APP_URL}/login` },
      { loc: `${APP_URL}/press/in-the-media` },
      { loc: `${APP_URL}/press/press-releases` },
      { loc: `${APP_URL}/privacy` },
      { loc: `${APP_URL}/security` },
      { loc: `${APP_URL}/sell` },
      { loc: `${APP_URL}/shows`, priority: 1 },
      { loc: `${APP_URL}/signup` },
      { loc: `${APP_URL}/terms` },
      { loc: `${APP_URL}/viewing-rooms` },
    ]

    res.render("misc", { urls })
  })
  .get(
    [
      "/sitemap-articles-:timestamp.xml",
      "/sitemap-articles.xml",
      "/sitemap-artist-images-:slug.xml",
      "/sitemap-artist-images.xml",
      "/sitemap-artist-series-:timestamp.xml",
      "/sitemap-artist-series.xml",
      "/sitemap-artists-:timestamp.xml",
      "/sitemap-artists.xml",
      "/sitemap-artworks-:timestamp.xml",
      "/sitemap-artworks.xml",
      "/sitemap-auctions.xml",
      "/sitemap-cities.xml",
      "/sitemap-collect.xml",
      "/sitemap-fairs-:timestamp.xml",
      "/sitemap-fairs.xml",
      "/sitemap-features-:timestamp.xml",
      "/sitemap-features.xml",
      "/sitemap-genes.xml",
      "/sitemap-images-:timestamp.xml",
      "/sitemap-images.xml",
      "/sitemap-partners-:timestamp.xml",
      "/sitemap-partners.xml",
      "/sitemap-shows-:timestamp.xml",
      "/sitemap-shows.xml",
      "/sitemap-tags.xml",
      "/sitemap-videos-:timestamp.xml",
      "/sitemap-videos.xml",
    ],
    (req, res) => {
      req.headers.host = new URL(SITEMAP_BASE_URL).host
      sitemapProxy.web(req, res)
    }
  )

const ENABLED_ROBOTS_TXT = `User-agent: *
Noindex: ?sort=
Noindex: ?dimension_range=
Disallow: /*?dns_source=
Disallow: /*?microsite=
Disallow: /*?from-show-guide=
Disallow: /search
Sitemap: ${APP_URL}/sitemap-articles.xml
Sitemap: ${APP_URL}/sitemap-artists.xml
Sitemap: ${APP_URL}/sitemap-artist-images.xml
Sitemap: ${APP_URL}/sitemap-artist-series.xml
Sitemap: ${APP_URL}/sitemap-artworks.xml
Sitemap: ${APP_URL}/sitemap-auctions.xml
Sitemap: ${APP_URL}/sitemap-cities.xml
Sitemap: ${APP_URL}/sitemap-collect.xml
Sitemap: ${APP_URL}/sitemap-fairs.xml
Sitemap: ${APP_URL}/sitemap-features.xml
Sitemap: ${APP_URL}/sitemap-genes.xml
Sitemap: ${APP_URL}/sitemap-images.xml
Sitemap: ${APP_URL}/sitemap-misc.xml
Sitemap: ${APP_URL}/sitemap-partners.xml
Sitemap: ${APP_URL}/sitemap-shows.xml
Sitemap: ${APP_URL}/sitemap-tags.xml
Sitemap: ${APP_URL}/sitemap-videos.xml`

const DISABLED_ROBOTS_TXT = `User-agent: *
Disallow: /`

export { sitemapsServerApp }
