import * as React from "react"
import { Box, Flex, FullBleed, Image, Text, TEXT_SHADOW } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomHeader_viewingRoom } from "v2/__generated__/ViewingRoomHeader_viewingRoom.graphql"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { resized } from "v2/Utils/resized"
import { RouterLink } from "v2/System/Router/RouterLink"
import { getStatus } from "../Utils/getStatus"

interface ViewingRoomHeaderProps {
  viewingRoom: ViewingRoomHeader_viewingRoom
}

const ViewingRoomHeader: React.FC<ViewingRoomHeaderProps> = props => {
  return (
    <>
      <Media greaterThanOrEqual="sm">
        <ViewingRoomHeaderLarge {...props} />
      </Media>

      <Media lessThan="sm">
        <ViewingRoomHeaderSmall {...props} />
      </Media>
    </>
  )
}

export const ViewingRoomHeaderFragmentContainer = createFragmentContainer(
  ViewingRoomHeader,
  {
    viewingRoom: graphql`
      fragment ViewingRoomHeader_viewingRoom on ViewingRoom {
        image {
          imageURLs {
            normalized
          }
        }
        title
        partner {
          name
          href
        }
        distanceToOpen
        distanceToClose
        status
      }
    `,
  }
)

const ViewingRoomHeaderLarge: React.FC<ViewingRoomHeaderProps> = ({
  viewingRoom,
}) => {
  const { desktop } = useNavBarHeight()

  const img = resized(viewingRoom.image?.imageURLs?.normalized!, {
    width: 1200,
  })

  return (
    <FullBleed
      display="flex"
      borderBottom="1px solid"
      borderColor="black30"
      height={`calc(90vh - ${desktop}px)`}
    >
      <Box bg="black5" width="50%" height="100%">
        <Image
          src={img.src}
          srcSet={img.srcSet}
          alt=""
          width="100%"
          height="100%"
          decoding="async"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="50%"
      >
        <Text as="h1" textAlign="center" variant="xl" p={2}>
          {viewingRoom.title}
        </Text>

        <Text
          variant="sm-display"
          display="flex"
          position="absolute"
          width="100%"
          bottom={0}
          p={2}
          justifyContent="space-between"
        >
          {viewingRoom.partner && (
            <RouterLink to={viewingRoom.partner.href!} textDecoration="none">
              {viewingRoom.partner.name}
            </RouterLink>
          )}

          <h3>
            {getStatus({
              status: viewingRoom.status,
              distanceToOpen: viewingRoom.distanceToOpen,
              distanceToClose: viewingRoom.distanceToClose,
            })}
          </h3>
        </Text>
      </Flex>
    </FullBleed>
  )
}

const ViewingRoomHeaderSmall: React.FC<ViewingRoomHeaderProps> = ({
  viewingRoom,
}) => {
  const { mobile } = useNavBarHeight()

  const img = resized(viewingRoom.image?.imageURLs?.normalized!, {
    width: 1200,
  })

  return (
    <FullBleed
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      position="relative"
      height={`calc(80vh - ${mobile}px)`}
    >
      <Image
        src={img.src}
        srcSet={img.srcSet}
        alt=""
        width="100%"
        height="100%"
        decoding="async"
        style={{ objectFit: "cover" }}
      />

      <Box
        position="absolute"
        top={0}
        width="100%"
        height="100%"
        background="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 100%)"
      />

      <Box position="absolute" bottom="20%" style={{ textShadow: TEXT_SHADOW }}>
        <Text variant="xl" textAlign="center" as="h1" color="white100" p={2}>
          {viewingRoom.title}
        </Text>
      </Box>

      <Text
        variant="sm-display"
        color="white100"
        display="flex"
        position="absolute"
        width="100%"
        bottom={0}
        p={2}
        justifyContent="space-between"
      >
        {viewingRoom.partner && (
          <RouterLink to={viewingRoom.partner.href!} textDecoration="none">
            {viewingRoom.partner.name}
          </RouterLink>
        )}

        <h3>
          {getStatus({
            status: viewingRoom.status,
            distanceToOpen: viewingRoom.distanceToOpen,
            distanceToClose: viewingRoom.distanceToClose,
          })}
        </h3>
      </Text>
    </FullBleed>
  )
}
