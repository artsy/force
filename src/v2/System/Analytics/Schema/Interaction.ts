import { ActionName, ActionType } from "./Values"

/**
 * An interaction event is one that is triggered by a user in _some_ way. This
 * could be either an active action, such as a click, or a passive action, such
 * as hovering over a UI element.
 *
 * Some actions lead to results, such as following an artist, in which case the
 * action name is used to tie the interaction and result events together.
 */
export interface Interaction {
  /**
   * The type of interaction that this event represents. E.g. `Click`.
   *
   * NOTE: In the old Force schema, this was the event’s name.
   */
  action_type: ActionType

  /**
   * In case the interaction will lead to a result, this should be the action
   * name that will be used to associate the interaction to the result.
   */
  action_name?: ActionName

  /**
   * A description of the UI element that describes it inside the page/module.
   * This is e.g. the label of the UI element.
   */
  subject?: string

  /**
   * In case of a link, the location that it points to.
   *
   * NOTE: This is old Force schema.
   */
  destination_path?: string

  /*
   * Flow
   */
  flow?: string
}

export interface AuthenticationInteraction extends Interaction {
  /*
   * The action taken that prompted user to signup or login.
   */
  intent?: string

  /*
   *  The type of action that triggered the modal (eg: click, timed)
   */
  trigger?: string
}
