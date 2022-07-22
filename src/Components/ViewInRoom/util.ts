import { remapValue } from "Utils/remapValue"
import { EIGHT_FEET_CM, EIGHT_FEET_PX } from "./ViewInRoomScale"

export const cmToPx = (cm: number) =>
  remapValue(cm, { min: 0, max: EIGHT_FEET_CM }, { min: 0, max: EIGHT_FEET_PX })
