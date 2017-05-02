import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function DescribeWork ({ incrementStepAction }) {
  return (
    <div className='consignments2-submission-describe-work'>
      <div
        className='consignments2-submission-describe-work__next-button avant-garde-button-black'
        onClick={incrementStepAction}
      >
        Next
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  incrementStepAction: incrementStep
}

export default connect(
  null,
  mapDispatchToProps
)(DescribeWork)

DescribeWork.propTypes = {
  incrementStepAction: PropTypes.func.isRequired
}
