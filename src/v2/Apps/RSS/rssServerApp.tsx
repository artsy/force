import express from "express"
import { fetchQuery } from "relay-runtime"
import { createRelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"
import { RSS_PARTNER_UPDATES_QUERY } from "./queries/RssPartnerUpdatesQuery"
import { RssPartnerUpdatesQuery } from "v2/__generated__/RssPartnerUpdatesQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { getENV } from "v2/Utils/getENV"
import { GALLERY_PARTNER_UPDATES_CHANNEL } from "config"

const rssServerApp = express()

rssServerApp.set("views", `${__dirname}/templates`)
rssServerApp.set("view engine", "ejs")

rssServerApp.get("/rss/partner-updates", async (req, res) => {
  const relayEnvironment = createRelaySSREnvironment({
    userAgent: req.header("User-Agent"),
  })

  const { articlesConnection } = await fetchQuery<RssPartnerUpdatesQuery>(
    relayEnvironment,
    RSS_PARTNER_UPDATES_QUERY,
    { channelId: GALLERY_PARTNER_UPDATES_CHANNEL }
  )

  const articles = extractNodes(articlesConnection)

  res.set("Content-Type", "application/rss+xml")
  res.render("partnerUpdates", {
    appUrl: getENV("APP_URL"),
    articles,
  })
})

export { rssServerApp }
