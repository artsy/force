export const setReferer = ({ req, res }) => {
  res.locals.sd.AUTHENTICATION_REFERER = req.header("Referer") || req.hostname
  return { req, res }
}
