import React from "react"
import { Motion, spring } from "react-motion"
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./utils/constants"
import { getMatrixPosition, getVisualPosition } from "./utils/helpers"

function PuzzleTile(props) {
  const { tile, index, width, height, handleTileClick, imgUrl } = props
  console.log("img in tile", imgUrl)
  const { row, col } = getMatrixPosition(index)
  const visualPos = getVisualPosition(row, col, width, height)
  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE * 1.25}px`,
    backgroundPosition: `${(100 / GRID_SIZE) * (tile % GRID_SIZE)}% ${
      (100 / GRID_SIZE) * Math.floor(tile / GRID_SIZE)
    }%`,
  }
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y),
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Is last tile?
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
            position: "absolute",
            listStyle: "none",
            background: "#ec6f66",
            placeItems: "center",
            fontSize: 20,
          }}
          onClick={() => handleTileClick(index)}
        >
          {!imgUrl && `${tile + 1}`}
        </li>
      )}
    </Motion>
  )
}

export default PuzzleTile
