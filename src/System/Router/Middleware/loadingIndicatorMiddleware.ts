import { ActionTypes as FarceActionTypes } from "farce"
import { ActionTypes as FoundActionTypes } from "found"

export function loadingIndicatorMiddleware() {
  return _store => next => action => {
    const { type } = action

    switch (type) {
      case FarceActionTypes.NAVIGATE: {
        next(action)
        break
      }
      case FarceActionTypes.UPDATE_LOCATION: {
        next(action)
        break
      }
      case FoundActionTypes.RESOLVE_MATCH: {
        next(action)
        break
      }
      default:
        return next(action)
    }
  }
}
