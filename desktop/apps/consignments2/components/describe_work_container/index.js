import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { makeDescribeWorkDesktop } from '../describe_work_desktop'
import { makeDescribeWorkMobile } from '../describe_work_mobile'
import { pick } from 'underscore'

function DescribeWorkContainer (props) {
  const { isMobile, submission } = props
  const relevantInputs = pick(
    submission,
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
    'medium',
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
    submission: state.submissionFlow.submission
  }
}

export default connect(
  mapStateToProps
)(DescribeWorkContainer)

DescribeWorkContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  submission: PropTypes.object
}
