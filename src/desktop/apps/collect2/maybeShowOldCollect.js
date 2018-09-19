export const maybeShowOldCollect = (_req, res, next) => {
  const { NEW_COLLECT_PAGE } = res.locals.sd

  if (NEW_COLLECT_PAGE === "old") {
    return next("route")
  } else {
    return next()
  }
}
