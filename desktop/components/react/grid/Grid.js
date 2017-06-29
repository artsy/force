import PropTypes from 'prop-types'
import React, { Component } from 'react'

/**
 * Temporary adaptation from Reaction Force:
 * https://github.com/artsy/reaction-force/blob/master/src/components/artwork_grid.tsx
 */
export default class Grid extends Component {
  static propTypes = {
    ArtworkBrick: PropTypes.func.isRequired,
    artworks: PropTypes.array,
    columns: PropTypes.number,
    columnMargin: PropTypes.number,
    rowMargin: PropTypes.number
  }

  static propTypes = {
    artworks: [],
    columns: 3,
    columnMargin: 10,
    rowMargin: 10
  }

  createGrid () {
    const { artworks, columns } = this.props

    const grid = []
    const gridRatioSums = []

    for (let i = 0; i < columns; i++) {
      grid.push([])
      gridRatioSums.push(0)
    }

    artworks.forEach(artwork => {
      if (artwork.image) {
        // Find section with lowest *inverted* aspect ratio sum, which is the
        // shortest column.
        let lowestRatioSum = Number.MAX_VALUE
        let sectionIndex = null

        for (let j = 0; j < gridRatioSums.length; j++) {
          const ratioSum = gridRatioSums[j]

          if (ratioSum < lowestRatioSum) {
            sectionIndex = j
            lowestRatioSum = ratioSum
          }
        }

        if (sectionIndex != null) {
          const section = grid[sectionIndex]
          section.push(artwork)

          // Keep track of total section aspect ratio
          const aspectRatio = artwork.image.aspect_ratio || 1 // Ensure we never divide by null/0

          // Invert the aspect ratio so that a lower value means a shorter section.
          gridRatioSums[sectionIndex] += 1 / aspectRatio
        }
      }
    })

    return grid
  }

  renderItems () {
    const {
      artworks,
      columns,
      columnMargin,
      rowMargin
    } = this.props

    const grid = this.createGrid(artworks, columns)
    const sections = []

    for (let i = 0; i < columns; i++) {
      const artworkComponents = []

      for (let j = 0; j < grid[i].length; j++) {
        const artwork = grid[i][j]

        const Artwork = (props) => <div {...props}>Artwork!</div>

        artworkComponents.push(
          <Artwork
            artwork={artwork}
            key={'artwork-' + j + '-' + artwork.__id}
          />
        )

        // Setting a marginBottom on the artwork component didn’t work, so using
        // a spacer view instead.
        if (j < grid[i].length - 1) {
          artworkComponents.push(
            <div
              style={{
                height: columnMargin
              }}
              key={'spacer-' + j + '-' + artwork.__id}
            />
          )
        }
      }

      const isAtEnd = i === columns - 1

      sections.push(
        <div
          style={{
            flex: 1,
            minWidth: 0,
            marginRight: isAtEnd ? 0 : rowMargin
          }}
          key={i}
        >
          {artworkComponents}
        </div>
      )
    }
    return sections
  }

  render () {
    const { ArtworkBrick, artworks, columns } = this.props

    return (
      <div>
        hey!
      </div>
    )
  }
}
