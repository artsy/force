import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function ChooseArtist ({ incrementStepAction }) {
  const b = block('consignments2-submission-choose-artist')

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
)(ChooseArtist)

ChooseArtist.propTypes = {
  incrementStepAction: PropTypes.func.isRequired
}
