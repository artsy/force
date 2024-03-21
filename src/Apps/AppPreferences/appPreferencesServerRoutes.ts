import {
  AppPreferences,
  appPreferencesSchema,
  DEFAULT_PREFERENCES,
} from "Apps/AppPreferences/useAppPreferences"
import { Router } from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"

const APP_PREFERENCES_COOKIE_NAME = "APP_PREFERENCES"
const APP_PREFERENCES_COOKIE_CONFIGURATION = {
  maxAge: 1000 * 60 * 60 * 24 * 365,
  httpOnly: false,
  secure: true,
}

const appPreferencesServerRoutes = Router()

export const appPreferencesGet = (req: ArtsyRequest, res: ArtsyResponse) => {
  const preferences = getAppPreferences(req)
  res.send(preferences)
}

export const appPreferencesPost = (req: ArtsyRequest, res: ArtsyResponse) => {
  const body = req.body

  if (Object.keys(body).length === 0) {
    res.status(400).send({
      error: "No preferences provided",
    })
    return
  }

  try {
    const previousPreferences = getAppPreferences(req)

    const updatedPreferences = appPreferencesSchema.validateSync(
      { ...previousPreferences, ...body },
      { stripUnknown: true }
    )

    const payload = JSON.stringify(updatedPreferences)

    res.cookie(
      APP_PREFERENCES_COOKIE_NAME,
      payload,
      APP_PREFERENCES_COOKIE_CONFIGURATION
    )

    res.send(body)
  } catch (error) {
    console.error(error)
    res.status(400).send({
      error: "Invalid preferences provided",
    })
  }
}

appPreferencesServerRoutes
  .get("/api/app-preferences", appPreferencesGet)
  .post("/api/app-preferences", appPreferencesPost)

export { appPreferencesServerRoutes }

export const getAppPreferences = (req: ArtsyRequest): AppPreferences => {
  try {
    const value = req.cookies[APP_PREFERENCES_COOKIE_NAME]

    return appPreferencesSchema.validateSync(value, {
      stripUnknown: true,
    })
  } catch (error) {
    return DEFAULT_PREFERENCES
  }
}
