import { Container } from "unstated"

interface State {
  excludeArtistIds?: string[]
}

export class FollowArtistPopoverState extends Container<State> {
  state = { excludeArtistIds: [] }

  constructor(props: State) {
    super()

    if (props && props.excludeArtistIds) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.state.excludeArtistIds = props.excludeArtistIds
    }
  }

  addArtist = (artistId: string) => {
    const { excludeArtistIds } = this.state
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    this.setState({ excludeArtistIds: excludeArtistIds.concat(artistId) })
  }
}
