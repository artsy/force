import { BorderBox, Box, Flex, Sans } from "@artsy/palette"
import { SelectedExhibitions_exhibitions } from "v2/__generated__/SelectedExhibitions_exhibitions.graphql"
import { Link } from "found"
import { groupBy, toPairs } from "lodash"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"

const MIN_FOR_SELECTED_EXHIBITIONS = 3
export const MIN_EXHIBITIONS = 2

export type Year = string

export interface SelectedExhibitionsProps {
  border?: boolean
  collapsible?: boolean
  exhibitions: SelectedExhibitions_exhibitions
  artistID?: string
  totalExhibitions?: number
  ViewAllLink?: JSX.Element
  Container?: (props: { children: JSX.Element }) => JSX.Element
}
export const SelectedExhibitions: SFC<SelectedExhibitionsProps> = props => {
  return props.exhibitions.length === 0 ? null : (
    <>
      <Media at="xs">
        <SelectedExhibitionsContainer collapsible {...props} />
      </Media>
      <Media greaterThan="xs">
        <SelectedExhibitionsContainer {...props} />
      </Media>
    </>
  )
}

export const isCollapsed = props => props.collapsible && !props.expanded

export interface ExhibitionsHeadlineProps {
  exhibitionCount: number
  expanded: boolean
  collapsible: boolean
  onShowClicked: (event: React.MouseEvent<HTMLElement>) => void
}
export const ExhibitionsHeadline: SFC<ExhibitionsHeadlineProps> = props => (
  <Flex justifyContent="space-between" mb={isCollapsed(props) ? 0 : 1}>
    <Sans size="2" weight="medium">
      {props.exhibitionCount < MIN_FOR_SELECTED_EXHIBITIONS
        ? "Exhibitions"
        : "Selected exhibitions"}
      {isCollapsed(props) ? ` (${props.exhibitionCount})` : ""}
    </Sans>
    {isCollapsed(props) && (
      <div
        onClick={props.onShowClicked}
        style={{ cursor: "pointer" }}
        className="showLink"
      >
        <Sans size="2" color="black60" ml={2}>
          Show
        </Sans>
      </div>
    )}
  </Flex>
)

export interface ExhibitionYearListProps {
  year: Year
  exhibitions: SelectedExhibitions_exhibitions
}
export const ExhibitionYearList: SFC<ExhibitionYearListProps> = props => {
  return (
    <Flex>
      <Sans size="2">{props.year}</Sans>
      <Flex flexDirection="column">
        {props.exhibitions.map((exhibition, index) => (
          <Box key={exhibition.name + "-" + index} display="inline" ml={1}>
            <Sans size="2" display="inline" verticalAlign="top">
              {exhibition.name}
              {", "}
            </Sans>
            {exhibition.partner && (
              <Sans
                size="2"
                display="inline"
                verticalAlign="top"
                color="black60"
              >
                {exhibition.partner.name}
              </Sans>
            )}
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

interface FullExhibitionListProps {
  exhibitions: SelectedExhibitions_exhibitions
  artistID: string
  totalExhibitions: number
  ViewAllLink?: JSX.Element
}
const FullExhibitionList: SFC<FullExhibitionListProps> = props => {
  const {
    ViewAllLink = <Link to={`/artist/${props.artistID}/cv`}>View all</Link>,
  } = props
  return (
    <React.Fragment>
      {toPairs(groupBy(props.exhibitions, ({ start_at }) => start_at))
        .reverse()
        .map(([year, exhibitions]) => (
          <ExhibitionYearList
            key={year}
            year={year}
            exhibitions={exhibitions.reverse()}
          />
        ))}
      {props.totalExhibitions > MIN_FOR_SELECTED_EXHIBITIONS && (
        <Sans size="2" color="black60">
          {ViewAllLink}
        </Sans>
      )}
    </React.Fragment>
  )
}

export interface SelectedExhibitionsContainerProps
  extends SelectedExhibitionsProps {
  border?: boolean
  collapsible?: boolean
}

export class SelectedExhibitionsContainer extends React.Component<
  SelectedExhibitionsContainerProps
  > {
  static defaultProps = {
    border: true,
  }

  state = {
    expanded: false,
  }

  render() {
    if (
      !this.props.exhibitions.length ||
      this.props.totalExhibitions < MIN_EXHIBITIONS
    ) {
      return null
    }

    let Container

    if (this.props.Container) {
      Container = this.props.Container
    } else if (this.props.border) {
      Container = BorderBox
    } else {
      Container = Box
    }

    return (
      <Container>
        <Flex flexDirection="column">
          <ExhibitionsHeadline
            expanded={this.state.expanded}
            collapsible={this.props.collapsible}
            exhibitionCount={this.props.exhibitions.length}
            onShowClicked={() => this.setState({ expanded: true })}
          />
          {!isCollapsed({
            expanded: this.state.expanded,
            ...this.props,
          }) && (
              <FullExhibitionList
                artistID={this.props.artistID}
                exhibitions={this.props.exhibitions}
                totalExhibitions={this.props.totalExhibitions}
                ViewAllLink={this.props.ViewAllLink}
              />
            )}
        </Flex>
      </Container>
    )
  }
}

export const SelectedExhibitionFragmentContainer = createFragmentContainer(
  SelectedExhibitions,
  {
    exhibitions: graphql`
      fragment SelectedExhibitions_exhibitions on Show @relay(plural: true) {
        partner {
          ... on ExternalPartner {
            name
          }
          ... on Partner {
            name
          }
        }
        name
        start_at: startAt(format: "YYYY")
        cover_image: coverImage {
          cropped(width: 800, height: 600) {
            url
          }
        }
        city
      }
    `,
  }
)
