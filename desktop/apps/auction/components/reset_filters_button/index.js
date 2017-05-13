import PropTypes from 'prop-types'
import React from 'react'
import { resetFilters } from '../../client/actions'
import { connect } from 'react-redux'

function ResetFiltersButton ({ resetFiltersAction }) {
  return (
    <a className='auction-reset-filters-button' onClick={resetFiltersAction}>
      Reset Filters
    </a>
  )
}

ResetFiltersButton.propTypes = {
  resetFiltersAction: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  resetFiltersAction: resetFilters
}

export default connect(
  null,
  mapDispatchToProps
)(ResetFiltersButton)
