import React from 'react'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function CreateAccount({ incrementStep }) {
  return (
    <div className='consignments2-submission-create-account'>
      <div
        className='consignments2-submission-create-account__next-button avant-garde-button-black'
        onClick={incrementStep}
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

