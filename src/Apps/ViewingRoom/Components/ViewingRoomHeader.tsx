import { getStatus } from "Apps/ViewingRoom/Utils/getStatus"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { resized } from "Utils/resized"
import { Box, Flex, FullBleed, Image, Text, useTheme } from "@artsy/palette"
import type { ViewingRoomHeader_viewingRoom$data } from "__generated__/ViewingRoomHeader_viewingRoom.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomHeaderProps {
  viewingRoom: ViewingRoomHeader_viewingRoom$data
}

const ViewingRoomHeader: React.FC<
  React.PropsWithChildren<ViewingRoomHeaderProps>
> = props => {
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

const ViewingRoomHeaderLarge: React.FC<
  React.PropsWithChildren<ViewingRoomHeaderProps>
> = ({ viewingRoom }) => {
  const { desktop } = useNavBarHeight()

  const src = viewingRoom.image?.imageURLs?.normalized
  const img = src ? resized(src, { width: 1200 }) : null

  return (
    <FullBleed
      display="flex"
      borderBottom="1px solid"
      borderColor="mono30"
      height={`calc(90vh - ${desktop}px)`}
    >
      <Box bg="mono5" width="50%" height="100%">
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

const ViewingRoomHeaderSmall: React.FC<
  React.PropsWithChildren<ViewingRoomHeaderProps>
> = ({ viewingRoom }) => {
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
        <Text variant="xl" textAlign="center" as="h1" color="mono0" p={2}>
          {viewingRoom.title}
        </Text>
      </Box>

      <Text
        variant="sm-display"
        color="mono0"
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
