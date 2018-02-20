import React from 'react'
import queryString from 'query-string'
import merge from 'lodash.merge'
import { renderLayout } from '@artsy/stitch'

import adminOnly from '../../lib/admin_only'
import JSONPage from '../../components/json_page/es6'
import MiamiFairWeekPage from './components/MiamiFairWeekPage'

const SLUG = 'artsy-in-miami'
const MARKETING_MODAL_ID = 'ca12'

class EditableMiamFairWeekPage extends JSONPage {
  registerRoutes() {
    this.app.get(this.jsonPage.paths.show, this.show.bind(this))
    this.app.get(this.jsonPage.paths.show + '/data', adminOnly, this.data)
    this.app.get(this.jsonPage.paths.edit, adminOnly, this.edit)
    this.app.post(this.jsonPage.paths.edit, adminOnly, this.upload)
  }

  async show(req, res, next) {
    try {
      if (req.query['m-id'] !== MARKETING_MODAL_ID) {
        const queryStringAsString = queryString.stringify(merge({}, req.query, { 'm-id': MARKETING_MODAL_ID }))

        return res.redirect(`/${SLUG}?${queryStringAsString}`)
      }

      const data = await this.jsonPage.get()
      const layout = await renderLayout({
        basePath: __dirname,
        layout: '../../components/main_layout/templates/react_index.jade',
        config: {
          styledComponents: true
        },
        blocks: {
          head: 'templates/meta.jade',
          body: MiamiFairWeekPage
        },
        data: {
          ...res.locals,
          ...data,
          data
        }
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  }
}

export default new EditableMiamFairWeekPage({ name: SLUG, paths: { show: `/${SLUG}`, edit: `/${SLUG}/edit` }}).app