import $ from "jquery"
import { data as sd } from "sharify"

$(() => {
  if (location.pathname === "/articles") {
    return require("../apps/articles/client/magazine.coffee").init()
  } else if (location.pathname === "/news") {
    return require("../apps/articles/client/news")
  } else if (
    location.pathname ===
    "/" + (sd.SECTION != null ? sd.SECTION.slug : undefined)
  ) {
    return require("../apps/articles/client/section.coffee").init()
  } else if (
    location.pathname ===
    "/" + (sd.CHANNEL != null ? sd.CHANNEL.slug : undefined)
  ) {
    return require("../apps/articles/client/team_channel.coffee").init()
  }
})
