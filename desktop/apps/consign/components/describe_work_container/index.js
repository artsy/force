import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { formattedLocation } from '../../helpers'
import { makeDescribeWorkDesktop } from '../describe_work_desktop'
import { makeDescribeWorkMobile } from '../describe_work_mobile'
import { isEmpty, pick } from 'underscore'

function DescribeWorkContainer (props) {
  const { isMobile, phone, submission } = props
  const location = formattedLocation(submission.location_city, submission.location_state, submission.location_country)
  const populatedSubmission = isEmpty(submission)
    ? { signature: true, authenticity_certificate: true, phone }
    : { ...submission, location, phone }
  const relevantInputs = pick(
    populatedSubmission,
    'artist_id',
    'authenticity_certificate',
    'category',
    'depth',
    'dimensions_metric',
    'edition',
    'edition_number',
    'edition_size',
    'height',
    'id',
    'location',
    'medium',
    'phone',
    'provenance',
    'signature',
    'title',
    'width',
    'year'
  )

  const DescribeWorkForm = isMobile ? makeDescribeWorkMobile(relevantInputs) : makeDescribeWorkDesktop(relevantInputs)

  return (
    <DescribeWorkForm />
  )
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.submissionFlow.isMobile,
    phone: state.submissionFlow.user.phone,
    submission: state.submissionFlow.submission
  }
}

export default connect(
  mapStateToProps
)(DescribeWorkContainer)

DescribeWorkContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  submission: PropTypes.object
}
