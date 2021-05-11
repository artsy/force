import { Container } from "unstated"

interface State {
  excludeArtistIds?: string[]
}

export class FollowArtistPopoverState extends Container<State> {
  state = { excludeArtistIds: [] }

  constructor(props: State) {
    super()

    if (props && props.excludeArtistIds) {
      // @ts-expect-error STRICT_NULL_CHECK
      this.state.excludeArtistIds = props.excludeArtistIds
    }
  }

  addArtist = (artistId: string) => {
    const { excludeArtistIds } = this.state
    // @ts-expect-error STRICT_NULL_CHECK
    this.setState({ excludeArtistIds: excludeArtistIds.concat(artistId) })
  }
}
