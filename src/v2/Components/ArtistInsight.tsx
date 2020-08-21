import { Link } from "@artsy/palette/dist/elements/Link"
import { Sans } from "@artsy/palette/dist/elements/Typography"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { Box } from "@artsy/palette/dist/elements/Box"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import React from "react"

import { AuctionIcon } from "@artsy/palette/dist/svgs/AuctionIcon"
import { BlueChipIcon } from "@artsy/palette/dist/svgs/BlueChipIcon"
import { PublicationIcon } from "@artsy/palette/dist/svgs/PublicationIcon"
import { FairIcon } from "@artsy/palette/dist/svgs/FairIcon"
import { UserMultiIcon } from "@artsy/palette/dist/svgs/UserMultiIcon"
import { InstitutionIcon } from "@artsy/palette/dist/svgs/InstitutionIcon"
import { UserSingleIcon } from "@artsy/palette/dist/svgs/UserSingleIcon"
import { TopEmergingIcon } from "@artsy/palette/dist/svgs/TopEmergingIcon"
import { EstablishedIcon } from "@artsy/palette/dist/svgs/EstablishedIcon"

interface ArtistInsightProps {
  type: string
  label: string
  value?: string
  entities?: ReadonlyArray<string>
}

const ICON_MAPPING = {
  HIGH_AUCTION: AuctionIcon,
  SOLO_SHOW: UserSingleIcon,
  GROUP_SHOW: UserMultiIcon,
  BIENNIAL: FairIcon,
  REVIEWED: PublicationIcon,
  COLLECTED: InstitutionIcon,
  BLUE_CHIP: BlueChipIcon,
  TOP_ESTABLISHED: EstablishedIcon,
  TOP_EMERGING: TopEmergingIcon,
}

@track<ArtistInsightProps>(props => ({
  context_module: Schema.ContextModule.ArtistInsights,
  context_submodule: props.type,
}))
export class ArtistInsight extends React.Component<ArtistInsightProps> {
  state = {
    expanded: false,
  }

  @track<ArtistInsightProps>(() => ({
    action_type: Schema.ActionType.Click,
    subject: "Read more",
    type: "Link",
  }))
  handleExpand() {
    this.setState({ expanded: true })
  }

  renderEntities() {
    const { entities } = this.props

    if (!entities || entities.length < 1) {
      return null
    } else if (this.state.expanded) {
      return (
        <Sans size="2" verticalAlign="top" color="black60">
          {entities.join(", ")}.
        </Sans>
      )
    } else {
      return (
        <Sans size="2" verticalAlign="top" color="black60" textAlign="left">
          {entities[0]}

          {entities.length > 1 && (
            <>
              , and{" "}
              <Link onClick={this.handleExpand.bind(this)}>
                {entities.length - 1}
                &nbsp;more
              </Link>
            </>
          )}
        </Sans>
      )
    }
  }

  renderIcon(insightType) {
    const Component = ICON_MAPPING[insightType]

    return <Component />
  }

  render() {
    const { label, type, value, entities } = this.props

    if (value || (entities && entities.length > 0)) {
      return (
        <Flex mt={1} width={"100%"}>
          <Flex pr={1}>{this.renderIcon(type)}</Flex>
          <Flex flexDirection="column">
            <Box>
              <Sans size="2">{label}</Sans>
              {value && (
                <Sans size="2" color="black60">
                  {value}
                </Sans>
              )}
              {this.renderEntities()}
            </Box>
          </Flex>
        </Flex>
      )
    }
  }
}
