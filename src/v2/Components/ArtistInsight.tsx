import { Box, Flex, Link, Sans, Text } from "@artsy/palette"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import * as React from "react";

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
  themeVersion?: any // FIXME
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

  getTextByTheme() {
    if (this.props.themeVersion === "v3") {
      return props => (
        <Text variant="sm" {...props}>
          {props.children}
        </Text>
      )
    } else {
      return props => (
        <Sans size="2" {...props}>
          {props.children}
        </Sans>
      )
    }
  }

  renderEntities() {
    const { entities } = this.props
    const TextWrapper = this.getTextByTheme()

    if (!entities || entities.length < 1) {
      return null
    } else if (this.state.expanded) {
      return (
        <TextWrapper verticalAlign="top" color="black60">
          {entities.join(", ")}.
        </TextWrapper>
      )
    } else {
      return (
        <TextWrapper verticalAlign="top" color="black60" textAlign="left">
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
        </TextWrapper>
      )
    }
  }

  renderIcon(insightType) {
    const Component = ICON_MAPPING[insightType]

    return <Component />
  }

  render() {
    const { label, type, value, entities } = this.props
    const TextWrapper = this.getTextByTheme()

    if (!(value || (entities && entities.length > 0))) {
      return null
    }

    return (
      <Flex
        mt={1}
        width={
          this.props.themeVersion === "v3"
            ? ["100%", "100%", "100%", "100%", "50%"]
            : "100%"
        }
        position="relative"
      >
        <Flex
          pr={1}
          top={this.props.themeVersion === "v2" ? 0 : "3px"}
          position="relative"
        >
          {this.renderIcon(type)}
        </Flex>
        <Flex flexDirection="column" pr={2}>
          <Box>
            <TextWrapper>{label}</TextWrapper>
            {value && <TextWrapper color="black60">{value}</TextWrapper>}
            {this.renderEntities()}
          </Box>
        </Flex>
      </Flex>
    )
  }
}
