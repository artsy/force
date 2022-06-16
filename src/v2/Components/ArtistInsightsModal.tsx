import { Link, Sans, Separator, Serif } from "@artsy/palette"

import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { Modal } from "v2/Components/Modal/Modal"
import { Component } from "react";

@track(() => ({
  context_module: Schema.ContextModule.ArtistInsights,
}))
export class ArtistInsightsModal extends Component {
  state = {
    showModal: false,
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: "Learn more",
    type: "Link",
  }))
  handleOpen() {
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <>
        <Modal
          onClose={this.handleClose.bind(this)}
          show={this.state.showModal}
          style={{
            maxHeight: 540,
            overflowX: "scroll",
          }}
        >
          <Serif size="5" textAlign="center" weight="semibold">
            Artist Insights
          </Serif>
          <Serif
            size="2"
            mt={1}
            textAlign="center"
            color="black60"
            lineHeight="24px"
          >
            Artist Insights exists to help art buyers understand the cultural
            significance of artists on Artsy. We aim to contextualize artists
            career trajectories within the greater art market.
          </Serif>
          <Separator mt={3} />
          <Serif size="2" mt={3}>
            Carefully considered methodologies.
          </Serif>
          <Serif size="2" mt={1} color="black60" lineHeight="24px">
            Artist Insights maps selected curatorial achievements - including
            exhibition, biennial inclusion, accession, and exhibition review -
            by globally influential and relevant institutions, biennials, and
            art publications, focusing on contemporary art. The working lexicon
            of major institutions, biennials and art publications is defined
            through the collaboration of various Artsy teams, including
            Collector Relations, Editorial, GFI (Galleries, Fairs, and
            Institutions), and The Art Genome Project.
          </Serif>
          <Serif size="2" mt={3}>
            Data backed by credible sources.
          </Serif>
          <Serif size="2" mt={1} color="black60" lineHeight="24px">
            In recent years, many institutions like the Museum of Modern Art
            (MoMA) and the Tate launched initiatives to make structured data
            from their exceptional collections available to all. We use this
            data when available. In addition, our art historical research team
            manually researches primary sources available online to inform
            Artist Insights. Research is ongoing and data is updated
            periodically. If you have feedback about data accuracy or
            methodology,{" "}
            <Link href="mailto:support@artsy.net">let us know</Link>.
          </Serif>
        </Modal>
        <Sans size="2" color="black60">
          <Link onClick={this.handleOpen.bind(this)}>Learn more</Link> about
          artist insights.
        </Sans>
      </>
    )
  }
}
