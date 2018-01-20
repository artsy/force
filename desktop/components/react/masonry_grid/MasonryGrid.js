import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'underscore'
import styled from 'styled-components'
import { Reveal } from './Reveal'

export default class MasonryGrid extends Component {
  static propTypes = {
    items: PropTypes.array,
    className: PropTypes.string,
    columnCount: PropTypes.number,
    columnMargin: PropTypes.number,
    getDisplayComponent: PropTypes.func.isRequired,
    getAspectRatio: PropTypes.func.isRequired,
    mask: PropTypes.bool,
    rowMargin: PropTypes.number,
    style: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    items: [],
    className: '',
    columnCount: 3,
    columnMargin: 20,
    mask: false,
    rowMargin: 20,
    style: {}
  }

  createGrid () {
    const { items, columnCount, getAspectRatio } = this.props
    const grid = []
    const gridRatioSums = []

    _(columnCount).times(() => {
      grid.push([])
      gridRatioSums.push(0)
    })

    items.forEach(artwork => {
      // Find section with lowest *inverted* aspect ratio sum, which is the
      // shortest column.
      let lowestRatioSum = Number.MAX_VALUE
      let sectionIndex = null

      gridRatioSums.forEach((ratioSum, j) => {
        if (ratioSum < lowestRatioSum) {
          sectionIndex = j
          lowestRatioSum = ratioSum
        }
      })

      if (sectionIndex != null) {
        const section = grid[sectionIndex]
        section.push(artwork)

        // Keep track of total section aspect ratio
        const aspectRatio = getAspectRatio(artwork) || 1 // Ensure we never divide by null/0

        // Invert the aspect ratio so that a lower value means a shorter section.
        gridRatioSums[sectionIndex] += 1 / aspectRatio
      }
    })

    return grid
  }

  renderItems () {
    const {
      items,
      columnCount,
      columnMargin,
      getDisplayComponent,
      rowMargin
    } = this.props

    const grid = this.createGrid(items, columnCount)
    const sections = []

    _(columnCount).times(i => {
      const displayComponents = []
      const rows = grid[i]

      rows.forEach((row, j) => {
        const artwork = grid[i][j]

        displayComponents.push(
          <div key={`column-${i}-row-${j}`}>
            {getDisplayComponent(artwork)}
          </div>
        )

        // Setting a marginBottom on the artwork component didn’t work, so using
        // a spacer view instead.
        const addSpacer = j < rows.length - 1

        if (addSpacer) {
          displayComponents.push(
            <div
              className='grid-item'
              style={{
                height: columnMargin
              }}
              key={`column-${i}-spacer-${j}`}
            />
          )
        }
      })

      const isLastColumn = i === columnCount - 1

      sections.push(
        <div
          style={{
            flex: 1,
            minWidth: 0,
            marginRight: isLastColumn ? 0 : rowMargin
          }}
          key={i}
        >
          {displayComponents}
        </div>
      )
    })

    return sections
  }

  render () {
    const { className, items, mask, style, title } = this.props
    const isRevealExpanded = mask && items.length <= 2

    return (
      <Container>
        <Reveal isEnabled={mask} isExpanded={isRevealExpanded} >
          {title &&
            <Title>
              {title}
            </Title>
          }

          <div
            className={className}
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              ...style
            }}>
            {this.renderItems()}
          </div>
        </Reveal>
      </Container>
    )
  }
}

// margin-bottom: 40px;
const Container = styled.div`
  a {
    text-decoration: none;
  }
`

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`
