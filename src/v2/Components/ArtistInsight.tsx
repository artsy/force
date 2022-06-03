import { BlueChipIcon, Box, Flex, Link, Sans, Text } from "@artsy/palette"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import * as React from "react"

interface ArtistInsightProps {
  type: string
  label: string
  value?: string
  entities?: ReadonlyArray<string>
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
        <Text variant="sm" verticalAlign="top" color="black60">
          {entities.join(", ")}.
        </Text>
      )
    } else {
      return (
        <Text variant="sm" verticalAlign="top" color="black60" textAlign="left">
          {/* {entities[0]} */}

          {/* {entities.length > 1 && (
            <>
              , and{" "}
              <Link onClick={this.handleExpand.bind(this)}>
                {entities.length - 1}
                &nbsp;more
              </Link>
            </>
          )} */}
        </Text>
      )
    }
  }

  render() {
    const { label, value, entities } = this.props

    if (!(value || (entities && entities.length > 0))) {
      return null
    }

    return (
      <Flex mt={1} width={["100%", "100%", "100%", "100%", "50%"]}>
        <BlueChipIcon mr={2} />
        <Box>
          <Text variant="sm">{label}</Text>
          {value && (
            <Text variant="sm" color="black60">
              {value}
            </Text>
          )}
          {this.renderEntities()}
        </Box>
      </Flex>
    )
  }
}
