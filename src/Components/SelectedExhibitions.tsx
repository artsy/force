import {
  BorderBox,
  Box,
  Clickable,
  Flex,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { SelectedExhibitions_exhibitions$data } from "__generated__/SelectedExhibitions_exhibitions.graphql"
import { Link } from "found"
import { groupBy, toPairs } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { ArtworkDefinitionList } from "Apps/Artwork/Components/ArtworkDefinitionList"

const MIN_FOR_SELECTED_EXHIBITIONS = 3
export const MIN_EXHIBITIONS = 2

export type Year = string

export interface SelectedExhibitionsProps {
  border?: boolean
  collapsible?: boolean
  exhibitions: SelectedExhibitions_exhibitions$data
  artistID?: string
  totalExhibitions?: number
  ViewAllLink?: JSX.Element
  Container?: (props: { children: JSX.Element }) => JSX.Element
}

export const SelectedExhibitions: React.FC<SelectedExhibitionsProps> = props => {
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

export const ExhibitionsHeadline: React.FC<ExhibitionsHeadlineProps> = props => (
  <Flex justifyContent="space-between" mb={isCollapsed(props) ? 0 : 1}>
    <Text variant="xs" fontWeight="bold">
      {props.exhibitionCount < MIN_FOR_SELECTED_EXHIBITIONS
        ? "Exhibitions"
        : "Selected exhibitions"}

      {isCollapsed(props) ? ` (${props.exhibitionCount})` : ""}
    </Text>

    {isCollapsed(props) && (
      <Clickable onClick={props.onShowClicked}>
        <Text variant="xs" color="black60" ml={2}>
          Show
        </Text>
      </Clickable>
    )}
  </Flex>
)

export interface ExhibitionYearListProps {
  year: Year
  exhibitions: SelectedExhibitions_exhibitions$data
}

export const ExhibitionYearList: React.FC<ExhibitionYearListProps> = ({
  year,
  exhibitions,
}) => {
  return (
    <ArtworkDefinitionList term={year}>
      {exhibitions.map((exhibition, index) => (
        <React.Fragment key={exhibition.name + "-" + index}>
          <Text variant="xs">
            {exhibition.name}
            {exhibition.partner && (
              <>
                ,&nbsp;
                <Box as="span" color="black60">
                  {exhibition.partner.name}
                </Box>
              </>
            )}
          </Text>
        </React.Fragment>
      ))}
    </ArtworkDefinitionList>
  )
}

interface FullExhibitionListProps {
  exhibitions: SelectedExhibitions_exhibitions$data
  artistID: string
  totalExhibitions: number
  ViewAllLink?: JSX.Element
}

const FullExhibitionList: React.FC<FullExhibitionListProps> = props => {
  const {
    ViewAllLink = <Link to={`/artist/${props.artistID}/cv`}>View all</Link>,
  } = props

  return (
    <Join separator={<Spacer y={1} />}>
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
        <ArtworkDefinitionList term="">{ViewAllLink}</ArtworkDefinitionList>
      )}
    </Join>
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
      (this.props.totalExhibitions ?? 0) < MIN_EXHIBITIONS
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
            collapsible={this.props.collapsible ?? false}
            exhibitionCount={this.props.exhibitions.length}
            onShowClicked={() => this.setState({ expanded: true })}
          />

          {!isCollapsed({ expanded: this.state.expanded, ...this.props }) && (
            <FullExhibitionList
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              artistID={this.props.artistID}
              exhibitions={this.props.exhibitions}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
