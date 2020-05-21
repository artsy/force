import { compact, last, uniq } from "lodash"
import { DateTime } from "luxon"
import url from "url"
import { ArticleData, DateFormat } from "../Publishing/Typings"

const APP_URL = process.env.APP_URL || "https://www.artsy.net"

/**
 * Matches for Email / Instant Articles
 */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * The quality to request from image CDN
 */
export const GLOBAL_IMAGE_QUALITY = 80

/**
 * TODO: Eventually remove sizeMe
 */
export const SIZE_ME_REFRESH_RATE = 500

/**
 * Relative path to article
 */
export const getArticleHref = slug => `/article/${slug}`

/**
 * Absolute path to article
 */
export const getArticleFullHref = slug => `${APP_URL}/article/${slug}`

/**
 * Get the pre-slug part of URL
 */

export const getPreSlugPath = layout => {
  return ["standard", "feature", "classic"].includes(layout)
    ? "article"
    : layout
}

/**
 * Relative path to editorial entity
 */

export const getEditorialHref = (layout, slug) => {
  const layoutType = getPreSlugPath(layout)
  return `/${layoutType}/${slug}`
}

/**
 * Absolute path to editorial entity
 */
export const getFullEditorialHref = (layout, slug) => {
  const layoutType = getPreSlugPath(layout)
  return `${APP_URL}/${layoutType}/${slug}`
}

/**
 * Absolute path to artsy entity
 */
export const getFullArtsyHref = slug => `${APP_URL}/${slug}`

/**
 * ByLine helpers
 * TODO: Move this into some kind of utils folder
 */
export const getAuthorByline = (authors, isEditoral = true) => {
  const authorCount = Number(authors && authors.length)

  if (authorCount === 1) {
    return (authors[0] && authors[0].name) || ""
  } else if (authorCount > 1) {
    const names = authors.reduce((prev, curr, i) => {
      let delim
      const len = authors.length
      if (i === len - 1) {
        delim = " and "
      } else if (i === 0) {
        delim = ""
      } else {
        delim = ", "
      }
      return prev + delim + curr.name
    }, "")
    return names

    // No Author
  } else if (isEditoral) {
    return "Artsy Editors"
  }
}

export const getDate = (date, format: DateFormat = "default") => {
  const today = DateTime.local()
  const dateTime = DateTime.fromISO(date).setZone("America/New_York")
  const isToday = today.hasSame(dateTime, "day")
  const isThisYear = today.hasSame(dateTime, "year")
  const amPm = dateTime.hour >= 12 ? "pm" : "am"
  const minutes = dateTime.minute < 10 ? "0" + dateTime.minute : dateTime.minute
  const monthDay = `${dateTime.monthShort} ${dateTime.day}`
  const monthDayYear = `${dateTime.monthShort} ${dateTime.day}, ${dateTime.year}`
  let hour
  if (dateTime.hour > 12) {
    hour = dateTime.hour - 12
  } else if (dateTime.hour === 0) {
    hour = 12
  } else {
    hour = dateTime.hour
  }
  const time = `${hour}:${minutes}${amPm}`

  switch (format) {
    case "monthDay":
      return monthDay
    case "monthYear":
      return `${dateTime.monthShort} ${dateTime.year}`
    case "condensed":
      return monthDayYear
    case "verbose":
      const day = isToday ? "Today" : monthDayYear
      return `${day} at ${time}`
    case "news":
      return isToday ? "Today" : isThisYear ? monthDay : monthDayYear
    default:
      return `${dateTime.monthShort} ${dateTime.day}, ${dateTime.year} ${time}`
  }
}

export const getCurrentUnixTimestamp = () => DateTime.local().toMillis()

export const getMediaDate = article => {
  const { published_at, scheduled_publish_at, media } = article
  const { release_date } = media

  if (release_date) {
    return release_date
  } else {
    return published_at || scheduled_publish_at
  }
}

export const formatTime = time => {
  let minutes = Math.floor(time / 60) % 60
  let seconds = Math.floor(time % 60)
  minutes = minutes <= 0 ? 0 : minutes
  seconds = seconds <= 0 ? 0 : seconds

  const minutesStr = minutes < 10 ? "0" + minutes : minutes
  const secondsStr = seconds < 10 ? "0" + seconds : seconds
  return minutesStr + ":" + secondsStr
}

interface SlugsFromArticle {
  artists: string[]
  genes: string[]
}

export const getArtsySlugsFromArticle = (
  article: ArticleData
): SlugsFromArticle => {
  const articleBody = article.sections
    ? article.sections
        .map(section => {
          if (section.type === "text") {
            return section.body
          }
        })
        .join()
    : ""

  const artists = uniq(getArtsySlugsFromHTML(articleBody, "artist"))
  const genes = uniq(getArtsySlugsFromHTML(articleBody, "gene"))

  return {
    artists,
    genes,
  }
}

export const getArtsySlugsFromHTML = (
  html: string,
  model: string
): string[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  const slugs: string[] = []
  doc.querySelectorAll("a").forEach(anchor => {
    const href = anchor.getAttribute("href")
    if (href && href.match(`artsy.net/${model}`)) {
      slugs.push(last(url.parse(href).pathname.split("/")))
    }
  })

  return compact(slugs)
}
