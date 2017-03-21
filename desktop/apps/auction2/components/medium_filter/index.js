import { updateMediumParams } from '../../actions'
import BasicCheckbox from '../basic_checkbox'
import React from 'react';
import { connect } from 'react-redux'
import _, { contains, find } from 'underscore'

function MediumFilter(props) {
  const {
    aggregatedMediums,
    filterParams,
    mediumMap,
    updateMediumParamsAction
  } = props
  const mediumIds = filterParams.gene_ids
  const allMediums = { id: 'mediums-all', name: 'All' }
  const allMediumsSelected = mediumIds.length == 0
  const aggregatedMediumIds = aggregatedMediums.map((agg) => agg.id)

  return (
    <div className='auction2-medium-checkboxes'>
      <div className='auction2-medium-checkboxes__title'>Medium</div>
      <BasicCheckbox
        key={allMediums.id}
        item={allMediums}
        onClick={updateMediumParamsAction}
        checked={allMediumsSelected}
      />
      {
        _.map(mediumMap, (name, id) => {
          const mediumSelected = contains(mediumIds, id)
          const includedMedium = aggregatedMediums.find((agg) => agg.id === id)
          return (
            <BasicCheckbox
              key={id}
              item={{id, name, count: includedMedium && includedMedium.count}}
              onClick={updateMediumParamsAction}
              checked={mediumSelected}
              disabled={includedMedium === undefined}
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    aggregatedMediums: state.auctionArtworks.aggregatedMediums,
    filterParams: state.auctionArtworks.filterParams,
    mediumMap: state.auctionArtworks.mediumMap
  }
}

const mapDispatchToProps = {
  updateMediumParamsAction: updateMediumParams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediumFilter)
