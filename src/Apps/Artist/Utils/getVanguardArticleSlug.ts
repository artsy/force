import { vanguardArticleSlugs } from "Apps/Artist/Utils/vanguardArticleSlugs"

export const getVanguardArticleSlug = (artistSlug: string): string | null => {
  return vanguardArticleSlugs[artistSlug] ?? null
}
