import BasicCheckbox from './BasicCheckbox'
import PropTypes from 'prop-types'
import React from 'react'
import _, { contains } from 'underscore'
import { connect } from 'react-redux'
import { updateMediumParams } from 'desktop/apps/auction2/actions'

function MediumFilter (props) {
  const {
    aggregatedMediums,
    filterParams,
    initialMediumMap,
    updateMediumParamsAction
  } = props

  const mediumIds = filterParams.gene_ids
  const allMediums = { id: 'mediums-all', name: 'All' }
  const allMediumsSelected = mediumIds.length === 0

  // FIXME: Is this needed somehow?
  const aggregatedMediumIds = aggregatedMediums.map((agg) => agg.id)

  return (
    <div className='auction-medium-checkboxes'>
      <div className='auction-medium-checkboxes__title'>Medium</div>
      <BasicCheckbox
        key={allMediums.id}
        item={allMediums}
        onClick={updateMediumParamsAction}
        checked={allMediumsSelected}
      />
      {
        _.map(initialMediumMap, (initialAgg) => {
          const mediumSelected = contains(mediumIds, initialAgg.id)
          const includedMedium = _.find(aggregatedMediums, (agg) => agg.id === initialAgg.id)
          return (
            <BasicCheckbox
              key={initialAgg.id}
              item={{
                id: initialAgg.id,
                name: initialAgg.name,
                count: includedMedium && includedMedium.count
              }}
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

MediumFilter.propTypes = {
  aggregatedMediums: PropTypes.array.isRequired,
  filterParams: PropTypes.object.isRequired,
  initialMediumMap: PropTypes.array.isRequired,
  updateMediumParamsAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    aggregatedMediums: state.auctionArtworks.aggregatedMediums,
    filterParams: state.auctionArtworks.filterParams,
    initialMediumMap: state.auctionArtworks.initialMediumMap
  }
}

const mapDispatchToProps = {
  updateMediumParamsAction: updateMediumParams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediumFilter)
