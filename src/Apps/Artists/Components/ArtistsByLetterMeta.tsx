import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { getPageNumber } from "Utils/url"
import type * as React from "react"
import { Title } from "react-head"

const TITLE = "Modern and Contemporary Artists"

export const ArtistsByLetterMeta: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const {
    match: { params, location },
  } = useRouter()

  if (!params.letter) return <Title>{TITLE}</Title>

  const page = getPageNumber(location)
  const title = buildTitle(params.letter, page)
  const description = `Research and discover artists starting with ${params.letter.toUpperCase()} on Artsy. Find works for sale, biographies, CVs, and auction results.`
  const pathname = buildPathname(params.letter, page)

  return (
    <MetaTags title={title} description={description} pathname={pathname} />
  )
}

const buildPathname = (letter: string, page: number): string => {
  const basePath = `/artists/artists-starting-with-${letter}`
  const isPagedContent = page > 1

  return isPagedContent ? `${basePath}?page=${page}` : basePath
}

const buildTitle = (letter: string, page: number): string => {
  const baseTitle = `Artists Starting with ${letter.toUpperCase()} | ${TITLE}`
  const isPagedContent = page > 1

  return isPagedContent ? `${baseTitle} - Page ${page}` : baseTitle
}
