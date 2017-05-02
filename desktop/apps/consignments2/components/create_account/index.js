import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function CreateAccount ({ incrementStepAction }) {
  return (
    <div className='consignments2-submission-create-account'>
      <div
        className='consignments2-submission-create-account__next-button avant-garde-button-black'
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
)(CreateAccount)

CreateAccount.propTypes = {
  incrementStepAction: PropTypes.func.isRequired
}
