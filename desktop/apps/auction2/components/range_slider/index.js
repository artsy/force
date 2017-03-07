import { default as React, PropTypes } from 'react'
import { connect } from 'react-redux'
import Slider, { Range } from 'rc-slider'
import { updateEstimateRange, updateEstimateDisplay } from '../../actions'
import { formatMoney } from 'accounting'

function RangeSlider(props) {
  const {
    filterParams,
    minEstimateRangeDisplay,
    maxEstimateRangeDisplay,
    updateEstimateRangeAction,
    updateEstimateDisplayAction
  } = props

  const minEstimate = filterParams.ranges.estimate_range.min
  const maxEstimate = filterParams.ranges.estimate_range.max
  // TODO: Get currency from sale!
  const formattedMinDisplay = formatMoney(minEstimateRangeDisplay, { precision: 0 })
  const formattedMaxDisplay = formatMoney(maxEstimateRangeDisplay, { symbol: '', precision: 0 })
  return (
    <div className='auction2-range-slider'>
      <div className='auction2-range-slider__metadata'>
        <div className='auction2-range-slider__title'>Price</div>
        <div className='auction2-range-slider__caption'>{`${formattedMinDisplay} - ${formattedMaxDisplay}`}</div>
      </div>
      <Range
        allowCross={false}
        min={minEstimate}
        max={maxEstimate}
        step={50}
        defaultValue={[minEstimateRangeDisplay, maxEstimateRangeDisplay]}
        onChange={([min, max]) => updateEstimateDisplayAction(min, max)}
        onAfterChange={([min, max]) => updateEstimateRangeAction(min, max)}
      />
      <div className='auction2-range-slider__info'>Based on the estimate for the lot</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filterParams: state.auctionArtworks.filterParams,
    minEstimateRangeDisplay: state.auctionArtworks.minEstimateRangeDisplay,
    maxEstimateRangeDisplay: state.auctionArtworks.maxEstimateRangeDisplay
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEstimateRangeAction: (min, max) => dispatch(updateEstimateRange(min, max)),
    updateEstimateDisplayAction: (min, max) => dispatch(updateEstimateDisplay(min, max))
  }
}

const RangeSliderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeSlider)

export default RangeSliderContainer
