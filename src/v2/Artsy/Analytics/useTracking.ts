import { useTracking as _useTracking } from "react-tracking"
import { Trackables } from "./Schema"

// TODO: Update @types/react-tracking with an interface rather than aliasing
export const useTracking = () => _useTracking<Trackables>()
