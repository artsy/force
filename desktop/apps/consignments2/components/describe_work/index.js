import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function DescribeWork ({ incrementStepAction }) {
  const b = block('consignments2-submission-describe-work')

  return (
    <div className={b()}>
      <div
        className={b('next-button').mix('avant-garde-button-black')}
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
