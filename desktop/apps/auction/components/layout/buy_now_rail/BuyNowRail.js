import ChevronLeft from '../../../../../components/main_layout/public/icons/chevron-left.svg'
import ChevronRight from '../../../../../components/main_layout/public/icons/chevron-right.svg'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import block from 'bem-cn-lite'
import classNames from 'classnames'
import { Artwork } from '@artsy/reaction-force/dist/Components/Artwork'

export class BuyNowRail extends Component {
  static propTypes = {
    artworks: PropTypes.array.isRequired
  }

  static defaultProps = {
    artworks: []
  }

  state = {
    currArtworks: [],
    displayCount: 5,
    isSinglePage: false,
    page: 1
  }

  componentWillMount () {
    const { artworks } = this.props
    const { displayCount, page } = this.state
    const initialSlice = (page - 1) * displayCount

    const currArtworks = artworks.slice(
      initialSlice,
      initialSlice + displayCount
    )

    const isSinglePage = artworks.length <= displayCount

    this.setState({
      currArtworks,
      isSinglePage
    })
  }

  render () {
    const { isSinglePage, page } = this.state
    const b = block('auction-BuyNowRail')

    const leftPageClasses = classNames(
      String(b('page-left')),
      { disabled: page === 1 }
    )

    const rightPageClasses = classNames(
      String(b('page-right')),
      { disabled: isSinglePage }
    )

    return (
      <div className={b()}>
        <div className={b('title')}>
          Buy Now
        </div>
        <div className={b('content')}>
          <div
            className={leftPageClasses}
            onClick={this.handlePreviousPageClick}
          >
            <ChevronLeft />
          </div>
          <div className={b('artworks')}>
            {
              this.props.artworks.map(({ artwork }, key) => {
                return (
                  <div className={b('artwork')}>
                    <Artwork artwork={artwork} key={key} />
                  </div>
                )
              })
            }
          </div>
          <div
            className={rightPageClasses}
            onClick={this.handleNextPageClick}
          >
            <ChevronRight />
          </div>
        </div>
      </div>
    )
  }
}
