import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import { Image, ResponsiveBox, Text } from "@artsy/palette"
import type { ViewingRoomCard_viewingRoom$data } from "__generated__/ViewingRoomCard_viewingRoom.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomCardProps {
  viewingRoom: ViewingRoomCard_viewingRoom$data
}

const ViewingRoomCard: React.FC<
  React.PropsWithChildren<ViewingRoomCardProps>
> = ({ viewingRoom }) => {
  const { coverImage, title, href, exhibitionPeriod } = viewingRoom

  const coverImageURL = cropped(coverImage?.imageURLs?.normalized ?? "", {
    height: 222,
    width: 263,
  })

  return (
    <RouterLink to={href} textDecoration="none">
      {coverImage && (
        <ResponsiveBox aspectWidth={263} aspectHeight={222} maxWidth="100%">
          <Image
            {...coverImageURL}
            alt={title}
            width="100%"
            height="100%"
            lazyLoad
          />
        </ResponsiveBox>
      )}
      {coverImage && title && href && exhibitionPeriod && (
        <Text
          as="h5"
          textTransform="capitalize"
          color="mono100"
          variant="sm-display"
          mt={1}
        >
          Viewing Room
        </Text>
      )}
      {title && (
        <Text as="h4" variant="lg-display" color="mono100">
          {title}
        </Text>
      )}
      {exhibitionPeriod && (
        <Text as="h6" textTransform="capitalize" color="mono60" variant="sm">
          {exhibitionPeriod}
        </Text>
      )}
    </RouterLink>
  )
}

export const ViewingRoomCardFragmentContainer = createFragmentContainer(
  ViewingRoomCard,
  {
    viewingRoom: graphql`
      fragment ViewingRoomCard_viewingRoom on ViewingRoom {
        href
        title
        exhibitionPeriod
        coverImage: image {
          imageURLs {
            normalized
          }
          width
          height
        }
      }
    `,
  }
)
