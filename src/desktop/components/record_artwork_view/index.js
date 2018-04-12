import metaphysics from '../../../lib/metaphysics.coffee'
import mutation from './mutation'
import CurrentUser from '../../models/current_user.coffee'

export const recordArtworkView = (artworkId) => {
  if (CurrentUser.orNull() === null) {
    return
  }
  const send = {
    query: mutation,
    variables: { artwork_id: artworkId },
    req: { user: CurrentUser.orNull() },
  }
  // We don't need to do anything on success.
  metaphysics(send).catch(console.error.bind(console))
}
