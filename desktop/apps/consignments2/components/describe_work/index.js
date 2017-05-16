import CheckboxInput from '../checkbox_input'
import PropTypes from 'prop-types'
import React from 'react'
import RadioInput from '../radio_input'
import SelectInput from '../select_input'
import TextInput from '../text_input'
import block from 'bem-cn'
import { connect } from 'react-redux'
import {
  incrementStep,
  updateAuthenticityCertificate,
  updateDepth,
  updateDimensionsMetric,
  updateEdition,
  updateHeight,
  updateLocation,
  updateMedium,
  updateProvenance,
  updateSignature,
  updateTitle,
  updateWidth,
  updateYear
} from '../../client/actions'

function DescribeWork (props) {
  const {
    authenticity_certificate,
    depth,
    dimensions_metric,
    edition,
    height,
    incrementStepAction,
    location,
    medium,
    provenance,
    signature,
    title,
    width,
    updateAuthenticityCertificateAction,
    updateDepthAction,
    updateDimensionsMetricAction,
    updateEditionAction,
    updateHeightAction,
    updateLocationAction,
    updateMediumAction,
    updateProvenanceAction,
    updateSignatureAction,
    updateTitleAction,
    updateWidthAction,
    updateYearAction,
    year
  } = props

  const b = block('consignments2-submission-describe-work')

  const nextEnabled =
    (title && title.length > 0) &&
    (year && year.length > 0) &&
    (height && height.length > 0) &&
    (width && width.length > 0) &&
    (location && location.length > 0)

  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'title'}
            instructions={'If the title is unknown, please enter your best guess.'}
            label={'Title'}
            onKeyUp={updateTitleAction}
            value={title}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <SelectInput
            item={'medium'}
            label={'Medium'}
            onClick={updateMediumAction}
            options={['painting', 'sculpture', 'print']}
            value={medium}
          />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'year'} label={'Year'} onKeyUp={updateYearAction} value={year} />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput item={'height'} label={'Height'} onKeyUp={updateHeightAction} value={height} />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'width'} label={'Width'} onKeyUp={updateWidthAction} value={width} />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'depth'} label={'Depth'} onKeyUp={updateDepthAction} value={depth} />
        </div>
        <div className={b('row-item')}>
          <SelectInput
            item={'dimension_metric'}
            label={'Units'}
            onClick={updateDimensionsMetricAction}
            options={['in', 'cm']}
            value={dimensions_metric}
          />
        </div>
      </div>
      <div className={b('row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <CheckboxInput
            item={'edition'}
            label={'This is an edition'}
            onClick={updateEditionAction}
            selected={edition}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <RadioInput
            item={'signature'}
            label={'Is this work signed?'}
            onClick={updateSignatureAction}
            options={{yes: true, no: false}}
            selected={signature}
            value={signature}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <RadioInput
            item={'authenticity_certificate'}
            label={'Does this work come with a certificate of authenticity?'}
            onClick={updateAuthenticityCertificateAction}
            options={{yes: true, no: false}}
            selected={authenticity_certificate}
            value={authenticity_certificate}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'provenance'}
            label={'Provenance'}
            instructions={'Where did you acquire this work?'}
            onKeyUp={updateProvenanceAction}
            value={provenance}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'location'}
            instructions={'What city is the work located in?'}
            onKeyUp={updateLocationAction}
            value={location}
          />
        </div>
      </div>
      <div
        className={b('next-button').mix('avant-garde-button-black')}
        disabled={!nextEnabled}
        onClick={incrementStepAction}
      >
        Next
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    submissionFlow: {
      inputs
    }
  } = state

  const {
    authenticity_certificate,
    depth,
    dimensions_metric,
    edition,
    height,
    location,
    medium,
    provenance,
    signature,
    title,
    width,
    year
  } = inputs

  return {
    authenticity_certificate,
    depth,
    dimensions_metric,
    edition,
    height,
    location,
    medium,
    provenance,
    signature,
    title,
    width,
    year
  }
}

const mapDispatchToProps = {
  incrementStepAction: incrementStep,
  updateAuthenticityCertificateAction: updateAuthenticityCertificate,
  updateDepthAction: updateDepth,
  updateDimensionsMetricAction: updateDimensionsMetric,
  updateEditionAction: updateEdition,
  updateHeightAction: updateHeight,
  updateLocationAction: updateLocation,
  updateMediumAction: updateMedium,
  updateProvenanceAction: updateProvenance,
  updateSignatureAction: updateSignature,
  updateTitleAction: updateTitle,
  updateWidthAction: updateWidth,
  updateYearAction: updateYear
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DescribeWork)

DescribeWork.propTypes = {
  authenticity_certificate: PropTypes.bool.isRequired,
  depth: PropTypes.string,
  dimensions_metric: PropTypes.string,
  edition: PropTypes.bool.isRequired,
  height: PropTypes.string,
  incrementStepAction: PropTypes.func.isRequired,
  location: PropTypes.string,
  medium: PropTypes.string,
  provenance: PropTypes.string,
  signature: PropTypes.bool.isRequired,
  title: PropTypes.string,
  updateAuthenticityCertificateAction: PropTypes.func.isRequired,
  updateDepthAction: PropTypes.func.isRequired,
  updateDimensionsMetricAction: PropTypes.func.isRequired,
  updateEditionAction: PropTypes.func.isRequired,
  updateHeightAction: PropTypes.func.isRequired,
  updateLocationAction: PropTypes.func.isRequired,
  updateMediumAction: PropTypes.func.isRequired,
  updateProvenanceAction: PropTypes.func.isRequired,
  updateSignatureAction: PropTypes.func.isRequired,
  updateTitleAction: PropTypes.func.isRequired,
  updateWidthAction: PropTypes.func.isRequired,
  updateYearAction: PropTypes.func.isRequired,
  width: PropTypes.string,
  year: PropTypes.string
}
