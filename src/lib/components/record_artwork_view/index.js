import metaphysics from '../../../lib/metaphysics.coffee'
import query from './mutation'

export const recordArtworkView = (artwork_id, user) => {
  if (user === null) {
    return
  }
  const send = {
    query,
    variables: { artwork_id },
    req: { user },
  }
  // We don't need to do anything on success.
  metaphysics(send).catch(console.error.bind(console))
}
