import { composeReducers } from '../compose_reducers'
import u from 'updeep'

describe('components/react/utils/compose_reducers.js', () => {
  it('composes multiple reducer fns together', () => {
    const initialState = {
      firstName: '',
      middleName: 's',
      lastName: ''
    }

    const firstName = (state, action) => u({ firstName: action.payload.firstName }, state)
    const lastName = (state, action) => u({ lastName: action.payload.lastName }, state)
    const reducer = composeReducers(firstName, lastName)

    const expected = {
      firstName: 'william',
      lastName: 'burroughs'
    }

    const state = reducer(initialState, {
      payload: {
        ...expected
      }
    })

    state.should.eql({
      ...initialState,
      ...expected
    })
  })
})
