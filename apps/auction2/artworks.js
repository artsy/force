// reducer.js
const initialState = {
  artworks: [],
  isFetching: false,
  listView: false
}

function auctionsReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_ARTWORKS_REQUEST:
    return {
      ...state,
      isFetching: true
    }
  case FETCH_ARTWORKS_SUCCESS:
    return {
      ...state,
      artworks: action.payload.artworks,
      isFetching: false
    }
  }
}

export const rootReducer = combineReducers({
  auctions: auctionsReducer
})

// actions.js
const fetchArworkRequest = () => ({ type: 'FETCH_ARTWORK_REQUEST' })
const fetchArworkSuccess = (payload) => ({ type: 'FETCH_ARTWORK_SUCCESS', payload })

export default function fetchArtworks() {
  return async (dispatch) => {
    dispatch(fetchArtworksRequest())

    try {
      const response = await api.fetch()

      dispatch(fetchArtworksSuccess({
        payload: {
          artworks: response.data.artworks
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}

// MyComponent.js
import fetchArtworks from 'actions/fetchArtworks'

function MyComponent ({ artworks, dispatch }) {
  return (
    <div>
      { isFetching
        ? <Loader />
        : <div>
            <ul>
              {artworks.map(artwork => {
                return (
                  <img src={artwork.src} />
                )
              })}
            </ul>

            <button onClick={() => dispatch(fetchArtworks())}>
              Load artwork!
            </button>
          </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  artworks: state.auctions.artworks,
  isFetching: state.auctions.isFetching
})

export default connect(mapStateToProps)(MyComponent)


// App.js
const store = createStore(rootReducer, initialState, applyMiddleware(createLogger(), thunk)),

ReactDOM.render(
  <Provider store={store}>
    <MyComponent />
  </Provider>
)