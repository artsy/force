import { Box, Image, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"
import { useEventTiming } from "v2/Utils/Hooks/useEventTiming"
import { HomeFeaturedShow_show } from "v2/__generated__/HomeFeaturedShow_show.graphql"

interface HomeFeaturedShowProps {
  show: HomeFeaturedShow_show
}

const HomeFeaturedShow: React.FC<HomeFeaturedShowProps> = ({ show }) => {
  const currentTime = useCurrentTime({ syncWithServer: true })
  const { formattedTime } = useEventTiming({
    currentTime,
    startAt: show.startAt!,
    endAt: show.endAt!,
  })

  const image = show.coverImage?.cropped

  return (
    <RouterLink to={show.href ?? ""} display="block" textDecoration="none">
      {image ? (
        <Image
          src={image.src}
          srcSet={image.srcSet}
          width={image.width}
          height={image.height}
          lazyLoad
          alt=""
        />
      ) : (
        <Box bg="black30" width={325} height={230} />
      )}

      <Spacer mt={2} />

      <Text variant="lg" mr={1} lineClamp={2}>
        {show.name}
      </Text>

      <Text variant="sm" color="black60" lineClamp={1}>
        {show.partner?.name}
      </Text>

      <Text variant="sm" color="black60">
        {[show.formattedStartAt, show.formattedEndAt].filter(Boolean).join("–")}
        {formattedTime && (
          <>
            {" - "}
            {formattedTime}
          </>
        )}
      </Text>
    </RouterLink>
  )
}

export const HomeFeaturedShowFragmentContainer = createFragmentContainer(
  HomeFeaturedShow,
  {
    show: graphql`
      fragment HomeFeaturedShow_show on Show {
        name
        href
        startAt
        endAt
        formattedStartAt: startAt(format: "MMM D")
        formattedEndAt: endAt(format: "MMM D")
        partner {
          ... on Partner {
            name
          }
          ... on ExternalPartner {
            name
          }
        }
        coverImage {
          cropped(width: 325, height: 230) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)
