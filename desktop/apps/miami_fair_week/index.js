import React from 'react'
import { renderLayout } from '@artsy/stitch'

import adminOnly from '../../lib/admin_only'
import JSONPage from '../../components/json_page/es6'
import MiamiFairWeekPage from './components/MiamiFairWeekPage'

class EditableMiamFairWeekPage extends JSONPage {
  registerRoutes() {
    this.app.get(this.jsonPage.paths.show, adminOnly, this.show.bind(this))
    this.app.get(this.jsonPage.paths.show + '/data', adminOnly, this.data)
    this.app.get(this.jsonPage.paths.edit, adminOnly, this.edit)
    this.app.post(this.jsonPage.paths.edit, adminOnly, this.upload)
  }

  async show(req, res, next) {
    try {
      const data = await this.jsonPage.get()
      const layout = await renderLayout({
        basePath: __dirname,
        layout: '../../components/main_layout/templates/react_index.jade',
        config: {
          styledComponents: true
        },
        blocks: {
          body: MiamiFairWeekPage
        },
        data: {
          ...res.locals,
          data
        }
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  }
}

// This smells... For some reason 'export default' doesn't work when this file is required by a coffeescript file.
export default new EditableMiamFairWeekPage({
  name: 'miami-fair-week',
  paths: {
    show: '/miami-fair-week',
    edit: '/miami-fair-week/edt'
  }
}).app