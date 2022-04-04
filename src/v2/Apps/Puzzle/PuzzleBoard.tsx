import React, { useState } from "react"
import PuzzleTile from "./PuzzleTile"
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./utils/constants"
import { canSwap, shuffle, swap, isSolved } from "./utils/helpers"

function PuzzleBoard({ imgUrl }) {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()])
  const [isStarted, setIsStarted] = useState(false)
  console.log("is started:", isStarted)

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles)
  }

  const swapTiles = tileIndex => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      )
      setTiles(swappedTiles)
    }
  }

  const handleTileClick = index => {
    swapTiles(index)
  }

  const handleShuffleClick = () => {
    shuffleTiles()
  }

  const handleStartClick = () => {
    shuffleTiles()
    setIsStarted(true)
  }

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE)
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE)

  const hasWon = isSolved(tiles)

  return (
    <>
      <ul
        style={{
          position: "relative",
          padding: 0,
          width: BOARD_SIZE,
          height: BOARD_SIZE,
        }}
      >
        {tiles.map((tile, index) => (
          <PuzzleTile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
      {!isStarted ? (
        <button onClick={() => handleStartClick()} style={{ display: "block" }}>
          Start game
        </button>
      ) : (
        <button
          onClick={() => handleShuffleClick()}
          style={{ display: "block" }}
        >
          Restart game
        </button>
      )}
    </>
  )
}

export default PuzzleBoard
