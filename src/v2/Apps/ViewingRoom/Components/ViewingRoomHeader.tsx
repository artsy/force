import React from "react"
import { Box, Flex, ResponsiveImage, Sans, color } from "@artsy/palette"
import { NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomHeader_viewingRoom } from "v2/__generated__/ViewingRoomHeader_viewingRoom.graphql"
import { resize } from "v2/Utils/resizer"

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
        }
        distanceToOpen
        distanceToClose
        status
      }
    `,
  }
)

/**
 * Header used for desktop layouts
 */
const ViewingRoomHeaderLarge: React.FC<ViewingRoomHeaderProps> = props => {
  const {
    viewingRoom: { image, title },
  } = props

  const heroImageURL = resize(image?.imageURLs?.normalized, {
    width: 1200,
    convert_to: "jpg",
  })

  return (
    <Flex
      style={{
        height: `calc(90vh - ${NAV_BAR_HEIGHT}px)`,
        borderBottom: `1px solid ${color("black10")}`,
      }}
    >
      <Box width="50%" style={{ overflow: "hidden" }}>
        <ResponsiveImage
          src={heroImageURL}
          lazyLoad={false}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        width="50%"
        style={{ position: "relative" }}
      >
        <Sans size="10" element="h1" unstable_trackIn>
          {title}
        </Sans>

        <RoomInfo {...props} />
      </Flex>
    </Flex>
  )
}

/**
 * Header used for mobile layouts
 */
const ViewingRoomHeaderSmall: React.FC<ViewingRoomHeaderProps> = props => {
  const {
    viewingRoom: { image, title },
  } = props

  const HeaderHeight = `calc(100vh - ${NAV_BAR_HEIGHT * 2.8}px)`
  const heroImageURL = resize(image?.imageURLs?.normalized, {
    width: 1200,
    convert_to: "jpg",
  })

  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height={HeaderHeight}
      style={{
        borderBottom: `1px solid ${color("black10")}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ResponsiveImage
        src={heroImageURL}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      />

      {/*
        Gradient overlay to raise text visibility
      */}
      <Box
        width="100%"
        height={HeaderHeight}
        position="absolute"
        top="0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      <Box position="absolute" bottom="20%">
        <Sans size="8" element="h1" color="white100">
          {title}
        </Sans>
      </Box>

      <RoomInfo {...props} />
    </Flex>
  )
}

const RoomInfo: React.FC<ViewingRoomHeaderProps> = props => {
  const {
    viewingRoom: {
      partner: { name },
      distanceToOpen,
      distanceToClose,
      status,
    },
  } = props

  const InfoText: React.FC = ({ children }) => (
    <Sans size={["3", "4"]} color={["white100", "black100"]}>
      {children}
    </Sans>
  )

  const TimingInfo: React.FC = () => {
    switch (status) {
      case "closed":
        return <InfoText>Closed</InfoText>
      case "live":
        if (distanceToClose === null) return null
        return <InfoText>Closes in {distanceToClose}</InfoText>
      case "scheduled":
        if (distanceToOpen === null) return null
        return <InfoText>Opens in {distanceToOpen}</InfoText>
      default:
        return null
    }
  }

  return (
    <Box position="absolute" left={0} bottom={0} width="100%">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        p={2}
      >
        <InfoText>{name}</InfoText>
        <TimingInfo />
      </Flex>
    </Box>
  )
}
