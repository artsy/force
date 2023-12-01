import express from "express"
import { fetchQuery } from "react-relay"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { RSS_ARTICLES_QUERY } from "./queries/RssArticlesQuery"
import { RssArticlesQuery } from "__generated__/RssArticlesQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import {
  ARTSY_EDITORIAL_CHANNEL,
  GALLERY_PARTNER_UPDATES_CHANNEL,
} from "Server/config"

const rssServerApp = express()

rssServerApp.set("views", `${__dirname}/templates`)
rssServerApp.set("view engine", "ejs")

rssServerApp.get("/rss/news", async (req, res) => {
  const relayEnvironment = createRelaySSREnvironment({
    userAgent: req.header("User-Agent"),
  })

  const data = await fetchQuery<RssArticlesQuery>(
    relayEnvironment,
    RSS_ARTICLES_QUERY,
    { channelId: ARTSY_EDITORIAL_CHANNEL }
  ).toPromise()

  const articles = extractNodes(data?.articlesConnection)

  res.set("Content-Type", "application/rss+xml")
  res.render("news", {
    appUrl: getENV("APP_URL"),
    articles,
  })
})

rssServerApp.get("/rss/partner-updates", async (req, res) => {
  const relayEnvironment = createRelaySSREnvironment({
    userAgent: req.header("User-Agent"),
  })

  const data = await fetchQuery<RssArticlesQuery>(
    relayEnvironment,
    RSS_ARTICLES_QUERY,
    { channelId: GALLERY_PARTNER_UPDATES_CHANNEL }
  ).toPromise()

  const articles = extractNodes(data?.articlesConnection)

  res.set("Content-Type", "application/rss+xml")
  res.render("partnerUpdates", {
    appUrl: getENV("APP_URL"),
    articles,
  })
})

export { rssServerApp }
