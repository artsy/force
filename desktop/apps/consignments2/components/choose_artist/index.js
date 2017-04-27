import React from 'react'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function ChooseArtist({ incrementStepAction }) {
  return (
    <div className='consignments2-submission-choose-artist'>
      <div
        className='consignments2-submission-choose-artist__next-button avant-garde-button-black'
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
)(ChooseArtist)
