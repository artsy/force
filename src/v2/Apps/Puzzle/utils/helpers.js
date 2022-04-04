import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants"

export function isSolvable(tiles) {
  let product = 1
  for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j)
    }
  }
  return Math.round(product) === 1
}

export function isSolved(tiles) {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false
    }
  }
  return true
}

// Get the linear index from a row/col pair.
export function getIndex(row, col) {
  return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10)
}

// Get the row/col pair from a linear index.
export function getMatrixPosition(index) {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  }
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  }
}

export function shuffle(tiles) {
  const shuffledTiles = [
    ...tiles
      .filter(t => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ]
  return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles)
}

export function canSwap(srcIndex, destIndex) {
  const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex)
  const { row: destRow, col: destCol } = getMatrixPosition(destIndex)
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1
}

export function swap(tiles, src, dest) {
  const tilesResult = [...tiles]
  ;[tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]]
  return tilesResult
}

export function updateURLParameter(url, param, paramVal) {
  let newAdditionalURL = ""
  let tempArray = url.split("?")
  let baseURL = tempArray[0]
  let additionalURL = tempArray[1]
  let temp = ""
  if (additionalURL) {
    tempArray = additionalURL.split("&")
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] !== param) {
        newAdditionalURL += temp + tempArray[i]
        temp = "&"
      }
    }
  }

  let rows_txt = temp + "" + param + "=" + paramVal
  return baseURL + "?" + newAdditionalURL + rows_txt
}
