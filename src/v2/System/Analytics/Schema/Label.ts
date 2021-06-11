import { Label as _Label } from "./Values"

export interface Label {
  /**
   * The label of element being iteracted with
   */
  label: _Label

  /**
   * The notification count as seen in the NavBar
   */
  new_notification_count: string | number
}
