import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import BasicCheckbox from '../basic_checkbox/index'
import { map, contains } from 'underscore'
import { updateMediumParams } from '../../actions'

function MediumFilter({ aggregatedMediums, filterParams, updateMediumParamsAction }) {
  const mediumIds = filterParams.gene_ids
  const allMediums = { id: 'mediums-all', name: 'All' }
  const allMediumsSelected = mediumIds.length == 0
  return (
    <div className={'auction2-medium-checkboxes'}>
      <div className={'auction2-medium-checkboxes__title'}>Medium</div>
      <BasicCheckbox
        key={allMediums.id}
        item={allMediums}
        onClick={updateMediumParamsAction}
        checked={allMediumsSelected}
      />
      {
        aggregatedMediums.map((agg) => {
          const mediumSelected = contains(mediumIds, agg.id)
          return <BasicCheckbox key={agg.id} item={agg} onClick={updateMediumParamsAction} checked={mediumSelected} />
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    aggregatedMediums: state.auctionArtworks.aggregatedMediums,
    filterParams: state.auctionArtworks.filterParams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMediumParamsAction: (mediumId) => dispatch(updateMediumParams(mediumId))
  }
}

const MediumFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediumFilter)

export default MediumFilterContainer
