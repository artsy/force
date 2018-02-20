export const index = (req, res, next) => {
  if (res.locals.sd.ONBOARDING_TEST === 'experiment') {
    next()
  } else {
    if (req.path === '/personalize') {
      return res.redirect('/personalize/collect')
    }
    if (req.user) {
      res.render('index')
    } else {
      res.redirect('/')
    }
  }
}
