import { get } from "./get"
import jwt_decode from "jwt-decode"

export function getUser(user: User | null | undefined): User | null {
  let _user = user

  if (_user === undefined) {
    const id = process.env.USER_ID
    const type = process.env.USER_TYPE || "User"
    const accessToken = process.env.USER_ACCESS_TOKEN
    const labFeatures = process.env.USER_LAB_FEATURES

    if (id && accessToken) {
      _user = {
        id,
        accessToken,
        type,
      }

      if (labFeatures) {
        _user.lab_features = labFeatures.split(",")
      }
    }
  }

  return _user
}

export function userHasLabFeature(user: User, featureName: string): boolean {
  const lab_features = get(user, u => u?.lab_features, [])
  return lab_features ? lab_features.includes(featureName) : false
}

export function userIsAdmin(user?: User): boolean {
  const isAdmin = Boolean(user && user.type === "Admin" ? true : false)
  return isAdmin
}

export function userIsTeam(user?: User): boolean {
  const isTeam = Boolean(
    user && user.roles && user.roles.includes("team") ? true : false
  )
  return isTeam
}

export function userHasAccessToPartner(user: User, partnerId: string): boolean {
  const token = get(user, u => u?.accessToken)
  if (!token) {
    return false
  }
  const decodedToken = jwt_decode(token)
  return (
    decodedToken &&
    decodedToken.partner_ids &&
    decodedToken.partner_ids.includes(partnerId)
  )
}
