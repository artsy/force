import { Box, BoxProps } from "@artsy/palette"
import * as React from "react"
import { useEffect } from "react"
import { useRef } from "react"
import styled from "styled-components"

const roomWidth = 6578
const roomHeight = 1368
const roomRatio = roomWidth / roomHeight

export const ROOM_WALL_HEX = "#dfdbd8"

const Room = styled(Box)`
  position: absolute;
  width: ${roomWidth}px;
  height: ${roomHeight}px;
  top: 50%;
  left: 50%;
  margin-top: -${roomHeight / 2}px;
  margin-left: -${roomWidth / 2}px;
  background: ${ROOM_WALL_HEX} url("https://files.artsy.net/images/room.jpeg")
    bottom center no-repeat;
`

interface ViewInRoomRoomProps extends BoxProps {
  onMount(): void
}

export const ViewInRoomRoom: React.FC<ViewInRoomRoomProps> = ({
  onMount,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    onMount()

    if (!ref.current) return

    const { current: room } = ref

    const scale = () => {
      const viewportRatio = window.innerWidth / window.innerHeight
      const sx =
        viewportRatio > roomRatio
          ? window.innerWidth / roomWidth
          : window.innerHeight / roomHeight

      room.style.transform = `scale(${sx})`
    }

    window.addEventListener("resize", scale)
    scale()

    return () => {
      window.removeEventListener("resize", scale)
    }
  }, [onMount])

  return <Room ref={ref as any} {...rest} />
}
