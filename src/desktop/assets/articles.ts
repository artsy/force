import $ from "jquery"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

$(() => {
  if (location.pathname === "/news") {
    return require("../apps/articles/client/news")
  } else if (
    location.pathname ===
    "/" + (sd.SECTION != null ? sd.SECTION.slug : undefined)
  ) {
    return require("../apps/articles/client/section.coffee").init()
  }
})
