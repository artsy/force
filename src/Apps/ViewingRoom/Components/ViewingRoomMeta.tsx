import { getENV } from "Utils/getENV"
import { cropped } from "Utils/resized"
import type { ViewingRoomMeta_viewingRoom$data } from "__generated__/ViewingRoomMeta_viewingRoom.graphql"
import type * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomMetaProps {
  viewingRoom: ViewingRoomMeta_viewingRoom$data
}

const ViewingRoomMeta: React.FC<
  React.PropsWithChildren<ViewingRoomMetaProps>
> = ({ viewingRoom }) => {
  const title = `${viewingRoom.title} | Artsy`
  const href = `${getENV("APP_URL")}${viewingRoom.href}`
  const description = viewingRoom.pullQuote
  const src = viewingRoom.image?.imageURLs?.normalized
    ? cropped(viewingRoom.image?.imageURLs?.normalized, {
        width: 1200,
        height: 675,
      }).src
    : null

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />

      {description && (
        <>
          <Meta name="description" content={description} />
          <Meta property="og:description" content={description} />
          <Meta property="twitter:description" content={description} />
        </>
      )}

      {href && (
        <>
          <Link rel="canonical" href={href} />
          <Meta property="og:url" content={href} />
        </>
      )}

      {src && (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={src} />
        </>
      )}

      {!src && <Meta property="twitter:card" content="summary" />}

      <Meta property="twitter:site" content="@artsy" />
      <Meta property="og:type" content="website" />
      <Meta name="robots" content="noindex, nofollow" />
    </>
  )
}

export const ViewingRoomMetaFragmentContainer = createFragmentContainer(
  ViewingRoomMeta,
  {
    viewingRoom: graphql`
      fragment ViewingRoomMeta_viewingRoom on ViewingRoom {
        title
        href
        pullQuote
        image {
          imageURLs {
            normalized
          }
        }
      }
    `,
  }
)
