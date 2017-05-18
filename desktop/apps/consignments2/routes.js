import Items from '../../collections/items'
import JSONPage from '../../components/json_page'
import markdown from '../../components/util/markdown'
import { extend } from 'underscore'

const landing = new JSONPage({ name: 'consignments2/landing' })

export const landingPage = async (req, res, next) => {
  const recentlySold = new Items([], { item_type: 'Artwork' })
  const inDemand = new Items([], { item_type: 'Artist' })

  try {
    const data = await landing.get()
    const { recently_sold, in_demand } = data.sections
    recentlySold.id = recently_sold.set.id
    inDemand.id = in_demand.set.id

    await recentlySold.fetch({ cache: true })
    await inDemand.fetch({ cache: true })

    res.locals.sd.RECENTLY_SOLD = recentlySold.toJSON()

    const pageData = extend(data, {
      recentlySold: recentlySold,
      inDemand: inDemand,
      markdown: markdown
    })
    res.render('landing', pageData)
  } catch (e) {
    next(e)
  }
}

export const submissionFlow = async (req, res, next) => {
  res.render('submission_flow', { user: req.user })
}

export const submissionUpload = async (req, res, next) => {
  res.locals.sd.SUBMISSION_ID = req.params.id
  res.render('submission_flow', { user: req.user })
}
