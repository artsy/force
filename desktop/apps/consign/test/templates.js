import OrderedSets from '../../../collections/ordered_sets'
import fs from 'fs'
import jade from 'jade'
import jsonData from './fixture.json'
import moment from 'moment'
import path from 'path'
import { extend } from 'underscore'

describe('landing page', () => {
  let data

  const render = (filename, data) => {
    const file = `${path.resolve(__dirname, '../')}/templates/${filename}.jade`
    return jade.compile(
      fs.readFileSync(file),
      { filename: file }
    )(data)
  }

  before(() => {
    data = extend(
      jsonData, {
        sales: [],
        sd: {},
        recentlySold: [],
        inDemand: new OrderedSets([]),
        moment,
        asset: () => {}
      }
    )
  })

  it('hides the upcoming sales section if there are no sales', () => {
    const html = render('landing', data)
    html.should.not.containEql('consignments-upcoming-sales__sales__sale')
  })

  it('hides the upcoming sales section if sales is null', () => {
    data.sales = null
    const html = render('landing', data)
    html.should.not.containEql('consignments-upcoming-sales__sales__sale')
  })

  it('shows the upcoming sales section if there is a sale', () => {
    data.sales = [{ name: 'Sarah Evening Sale', start_at: moment.now() }]
    const html = render('landing', data)
    html.should.containEql('consignments-upcoming-sales__sales__sale')
  })
})
