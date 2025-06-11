import { MetaTags } from "Components/MetaTags"
import type * as React from "react"

const TITLE = "Art Gallery Shows and Museum Exhibitions | Artsy"
const DESCRIPTION =
  "Explore Artsy’s comprehensive listing of current gallery shows and museum exhibitions from around the world."

interface ShowsMetaProps {
  cityName?: string
  pathname?: string
}

export const ShowsMeta: React.FC<React.PropsWithChildren<ShowsMetaProps>> = ({
  cityName,
  pathname = "/shows",
}) => {
  const title = cityName ? `${cityName} ${TITLE}` : TITLE
  const description = cityName
    ? `Explore shows in ${cityName} on Artsy. ${DESCRIPTION}`
    : DESCRIPTION

  return (
    <MetaTags title={title} description={description} pathname={pathname} />
  )
}
