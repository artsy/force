import { default as React, PropTypes } from 'react'
import { connect } from 'react-redux'
import Slider, { Range } from 'rc-slider'
import { updateEstimateRange, updateEstimateDisplay } from '../../actions'

function RangeSlider(props) {
  const {
    filterParams,
    minEstimateRangeDisplay,
    maxEstimateRangeDisplay,
    updateEstimateRangeAction,
    updateEstimateDisplayAction
  } = props
  const currency = '$' // TODO get currency from sale
  return (
    <div className='auction2-range-slider'>
      <div className='auction2-range-slider__metadata'>
        <div className='auction2-range-slider__title'>Price</div>
        <div className='auction2-range-slider__caption'>{`${currency}${minEstimateRangeDisplay} - ${currency}${maxEstimateRangeDisplay}`}</div>
      </div>
      <Range
        allowCross={false}
        min={50}
        max={50000}
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
