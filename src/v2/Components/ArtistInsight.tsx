import { Box, Flex, Link, Sans } from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import React from "react"

import {
  AuctionIcon,
  BlueChipIcon,
  BookIcon,
  FairIcon,
  GroupIcon,
  MuseumIcon,
  SoloIcon,
  TopEmergingIcon,
  TopEstablishedIcon,
} from "@artsy/palette"

interface ArtistInsightProps {
  type: string
  label: string
  value?: string
  entities?: ReadonlyArray<string>
}

const ICON_MAPPING = {
  HIGH_AUCTION: AuctionIcon,
  SOLO_SHOW: SoloIcon,
  GROUP_SHOW: GroupIcon,
  BIENNIAL: FairIcon,
  REVIEWED: BookIcon,
  COLLECTED: MuseumIcon,
  BLUE_CHIP: BlueChipIcon,
  TOP_ESTABLISHED: TopEstablishedIcon,
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
