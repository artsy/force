import React from "react"
import { Motion, spring } from "react-motion"
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./utils/constants"
import { getMatrixPosition, getVisualPosition } from "./utils/helpers"
import styled from "styled-components"

function PuzzleTile(props) {
  const { tile, index, width, height, handleTileClick, imgUrl } = props
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
        <PuzzleList
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Is last tile?
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          onClick={() => handleTileClick(index)}
        >
          {!imgUrl && `${tile + 1}`}
        </PuzzleList>
      )}
    </Motion>
  )
}

const PuzzleList = styled.li`
  position: absolute;
  list-style: none;
  background: #ec6f66;
  display: grid;
  place-items: center;
  font-size: 20px;
`

export default PuzzleTile
