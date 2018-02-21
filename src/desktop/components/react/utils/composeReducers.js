/**
 * Utility for taking multiple reducers and composing them together. Useful in
 * contexts where you want to break a large reducer switch up into little chunks
 * or "merge" a reducer from a separate component into a larger reducer state slice.
 *
 * @example
 *
 * import { combineReducers } from 'redux'
 * import { composeReducers } from 'components/react/utils/composeReducers'
 *
 * function reducerA(state, action) { ... }
 * function reducerB(state, action) { ... }
 *
 * const rootReducer = combineReducers({
 *   someAppState: composeReducers(reducerA, reducerB)
 * })
 *
 * @param  {Arguments} args Reducers to combine and iterate over
 * @return {Function} A reducer function that produces new state
 */
export function composeReducers(...args) {
  return (state, action) => {
    return args.reduce((update, arg) => arg(update, action), state)
  }
}
