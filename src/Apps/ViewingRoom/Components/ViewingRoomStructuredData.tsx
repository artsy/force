import { StructuredData } from "Components/Seo/StructuredData"
import { getENV } from "Utils/getENV"
import type { ViewingRoomStructuredData_viewingRoom$key } from "__generated__/ViewingRoomStructuredData_viewingRoom.graphql"
import { graphql, useFragment } from "react-relay"

interface ViewingRoomStructuredDataProps {
  viewingRoom: ViewingRoomStructuredData_viewingRoom$key
}

export const ViewingRoomStructuredData: React.FC<
  React.PropsWithChildren<ViewingRoomStructuredDataProps>
> = props => {
  const viewingRoom = useFragment(
    VIEWING_ROOM_STRUCTURD_DATA_FRAGMENT,
    props.viewingRoom
  )

  const url = `${getENV("APP_URL")}${viewingRoom.href}`

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@type": "ExhibitionEvent",
        name: viewingRoom.title,
        description: viewingRoom.introStatement ?? undefined,
        startDate: viewingRoom.startAt ?? undefined,
        endDate: viewingRoom.endAt ?? undefined,
        url,
        image: viewingRoom.image?.imageURLs?.normalized ?? undefined,
        location: {
          "@type": "VirtualLocation",
          url,
        },
        organizer: viewingRoom.partner?.name
          ? {
              "@type": "Organization",
              name: viewingRoom.partner.name,
              url: `${getENV("APP_URL")}${viewingRoom.partner.href}`,
            }
          : undefined,
      }}
    />
  )
}

const VIEWING_ROOM_STRUCTURD_DATA_FRAGMENT = graphql`
  fragment ViewingRoomStructuredData_viewingRoom on ViewingRoom {
    title
    href
    introStatement
    startAt
    endAt
    status
    image {
      imageURLs {
        normalized
      }
    }
    partner {
      name
      href
    }
  }
`
