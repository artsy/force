import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { Range } from 'rc-slider'
import { connect } from 'react-redux'
import { formatMoney } from 'accounting'
import { updateEstimateRange, updateEstimateDisplay } from 'desktop/apps/auction/actions/artworkBrowser'

function RangeSlider (props) {
  const {
    formattedMaxDisplay,
    formattedMinDisplay,
    isAbsoluteMax,
    maxEstimate,
    maxEstimateRangeDisplay,
    minEstimate,
    minEstimateRangeDisplay,
    updateEstimateDisplayAction,
    updateEstimateRangeAction
  } = props

  const b = block('auction2-RangeSlider')

  return (
    <div className={b()}>
      <div className={b('metadata')}>
        <div className={b('title')}>
          Price
        </div>

        <div className={b('caption')}>
          {
            `${formattedMinDisplay} - ${formattedMaxDisplay}${isAbsoluteMax ? '+' : ''}`
          }
      </div>
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
      <div className={b('info')}>
        Based on the estimate for the lot
      </div>
    </div>
  )
}

RangeSlider.propTypes = {
  formattedMaxDisplay: PropTypes.string.isRequired,
  formattedMinDisplay: PropTypes.string.isRequired,
  isAbsoluteMax: PropTypes.bool.isRequired,
  maxEstimate: PropTypes.number.isRequired,
  minEstimate: PropTypes.number.isRequired,
  minEstimateRangeDisplay: PropTypes.number.isRequired,
  maxEstimateRangeDisplay: PropTypes.number.isRequired,
  updateEstimateDisplayAction: PropTypes.func.isRequired,
  updateEstimateRangeAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    artworkBrowser: {
      filterParams,
      maxEstimateRangeDisplay,
      minEstimateRangeDisplay,
      symbol
    }
  } = state

  const minEstimate = filterParams.ranges.estimate_range.min
  const formattedMinDisplay = formatMoney(minEstimateRangeDisplay, { symbol, precision: 0 })
  const maxEstimate = filterParams.ranges.estimate_range.max
  const isAbsoluteMax = maxEstimate === maxEstimateRangeDisplay
  const formattedMaxDisplay = formatMoney(maxEstimateRangeDisplay, { symbol: '', precision: 0 })

  return {
    formattedMaxDisplay,
    formattedMinDisplay,
    isAbsoluteMax,
    maxEstimate,
    maxEstimateRangeDisplay,
    minEstimate,
    minEstimateRangeDisplay
  }
}

const mapDispatchToProps = {
  updateEstimateRangeAction: updateEstimateRange,
  updateEstimateDisplayAction: updateEstimateDisplay
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeSlider)
