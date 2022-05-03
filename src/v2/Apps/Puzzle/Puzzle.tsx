import { ArtsyMarkIcon, Button, Flex, Text } from "@artsy/palette"
import React, { useEffect, useState } from "react"
import { PuzzleShareYourScore } from "./PuzzleShareYourScore"
import PuzzleTile from "./PuzzleTile"
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./utils/constants"
import { canSwap, shuffle, swap, isSolved } from "./utils/helpers"

const Puzzle = () => {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()])
  const [isStarted, setIsStarted] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [time, setTime] = useState(0)
  const [movesCount, setMovesCount] = useState(0)
  const [intervalId, setIntervalId] = useState(0)
  const moment = require("moment")

  useEffect(() => {
    const artOfTheDayUrl = `https://artsy-public.s3.amazonaws.com/artworks-of-the-day/${moment().format(
      "YYYY-MM-DD"
    )}.json`
    fetch(artOfTheDayUrl)
      .then(response => response.json())
      .then(data => {
        setImgUrl(data[0].images[0].image_urls.square)
      })
  }, [])

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
    if (isStarted) {
      setMovesCount(count => count + 1)
    }
  }

  const handleShuffleClick = () => {
    shuffleTiles()
    setTime(0)
    setMovesCount(0)
  }

  const handleStartClick = () => {
    shuffleTiles()
    const newIntervalId = setInterval(() => {
      setTime(prevTime => prevTime + 10)
    }, 10)
    // @ts-ignore:
    setIntervalId(newIntervalId)
    setIsStarted(true)
  }

  // Mock score
  const handleClickOnSolve = () => {
    setTiles([...Array(TILE_COUNT).keys()])
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(0)
    }
    setTime(36300)
    setMovesCount(27)
  }

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE)
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE)

  const hasWon = isSolved(tiles)

  return (
    <Flex flexDirection="column" mt={2}>
      <Flex mx={2} mb={1} alignItems="center">
        <ArtsyMarkIcon height={40} width={40} name="Artsy" />
        <Flex flexDirection="column" ml="auto">
          <Text variant="lg" ml="auto">
            {("0" + Math.floor((time / 360000) % 60)).slice(-2) + " "} :{" "}
            {("0" + Math.floor((time / 60000) % 60)).slice(-2) + " "} :{" "}
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
          </Text>
          <Text variant="xl" ml="auto">
            {movesCount}
          </Text>
        </Flex>
      </Flex>
      <Flex
        position="relative"
        width={BOARD_SIZE}
        height={BOARD_SIZE}
        alignSelf="center"
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
      </Flex>
      {hasWon && isStarted && (
        <>
          <Text variant="lg" mt={2} textAlign="center">
            Puzzle solved!!
          </Text>
          <Flex mt={2} justifyContent="space-between" mx={2}>
            <Button size="small" onClick={() => {}}>
              About this Artwork
            </Button>
            <PuzzleShareYourScore
              // imgUrl={imgUrl}
              movesCount={movesCount}
              time={time}
            />
          </Flex>
        </>
      )}
      <Flex mt={2} justifyContent="center">
        {!isStarted ? (
          <Button onClick={() => handleStartClick()}>Start</Button>
        ) : (
          <Button onClick={() => handleShuffleClick()}>Restart</Button>
        )}
      </Flex>

      <Text onClick={() => handleClickOnSolve()} mt={4}>
        Solve it now
      </Text>
    </Flex>
  )
}

export default Puzzle
