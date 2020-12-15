export function adminOnly(req, res, next) {
  if (!req.user || (req.user && req.user.get("type") !== "Admin")) {
    const err = new Error("You must be logged in as an admin")
    ;(err as any).status = 403
    next(err)
  } else {
    next()
  }
}
