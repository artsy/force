import * as React from "react"
import { Box, Flex, FullBleed, Image, Text, useTheme } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomHeader_viewingRoom$data } from "__generated__/ViewingRoomHeader_viewingRoom.graphql"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { resized } from "Utils/resized"
import { RouterLink } from "System/Components/RouterLink"
import { getStatus } from "Apps/ViewingRoom/Utils/getStatus"

interface ViewingRoomHeaderProps {
  viewingRoom: ViewingRoomHeader_viewingRoom$data
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

  const src = viewingRoom.image?.imageURLs?.normalized
  const img = src ? resized(src, { width: 1200 }) : null

  return (
    <FullBleed
      display="flex"
      borderBottom="1px solid"
      borderColor="black30"
      height={`calc(90vh - ${desktop}px)`}
    >
      <Box bg="black5" width="50%" height="100%">
        {img && (
          <Image
            src={img.src}
            srcSet={img.srcSet}
            alt=""
            width="100%"
            height="100%"
            decoding="async"
            style={{ objectFit: "cover" }}
          />
        )}
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
            <RouterLink to={viewingRoom.partner.href} textDecoration="none">
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

  const src = viewingRoom.image?.imageURLs?.normalized
  const img = src ? resized(src, { width: 1200 }) : null

  const { theme } = useTheme()

  const background =
    theme.name === "light"
      ? "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 100%)"
      : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.33) 100%)"

  return (
    <FullBleed
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      position="relative"
      height={`calc(80vh - ${mobile}px)`}
    >
      {img && (
        <Image
          src={img.src}
          srcSet={img.srcSet}
          alt=""
          width="100%"
          height="100%"
          decoding="async"
          style={{ objectFit: "cover" }}
        />
      )}

      <Box
        position="absolute"
        top={0}
        width="100%"
        height="100%"
        background={background}
      />

      <Box
        position="absolute"
        bottom="20%"
        style={{ textShadow: theme.effects.textShadow }}
      >
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
          <RouterLink to={viewingRoom.partner.href} textDecoration="none">
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
