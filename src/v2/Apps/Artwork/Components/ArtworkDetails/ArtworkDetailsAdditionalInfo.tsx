import {
  Col,
  Grid,
  HTML,
  ReadMore,
  Row,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { ArtworkDetailsAdditionalInfo_artwork } from "v2/__generated__/ArtworkDetailsAdditionalInfo_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { RequestConditionReportQueryRenderer } from "./RequestConditionReport"

export interface ArtworkDetailsAdditionalInfoProps {
  artwork: ArtworkDetailsAdditionalInfo_artwork
}

export class ArtworkDetailsAdditionalInfo extends React.Component<
  ArtworkDetailsAdditionalInfoProps
> {
  render() {
    const {
      category,
      series,
      publisher,
      manufacturer,
      image_rights,
      internalID,
      canRequestLotConditionsReport,
      framed,
      signatureInfo,
      conditionDescription,
      certificateOfAuthenticity,
    } = this.props.artwork

    const listItems = [
      {
        title: "Medium",
        value: category,
      },
      {
        title: "Condition",
        value: canRequestLotConditionsReport ? (
          <RequestConditionReportQueryRenderer artworkID={internalID} />
        ) : (
          conditionDescription && conditionDescription.details
        ),
      },

      {
        title: "Signature",
        value: signatureInfo && signatureInfo.details,
      },
      {
        title: "Certificate of authenticity",
        value: certificateOfAuthenticity && certificateOfAuthenticity.details,
      },
      {
        title: "Frame",
        value: framed && framed.details,
      },
      { title: "Series", value: series },
      { title: "Publisher", value: publisher },
      { title: "Manufacturer", value: manufacturer },
      { title: "Image rights", value: image_rights },
    ]

    const displayItems = listItems.filter(
      i => i.value != null && i.value !== ""
    )

    if (displayItems.length === 0) {
      return null
    }

    return (
      <StackableBorderBox p={2}>
        <Grid>
          {displayItems.map(({ title, value }, index) => (
            <Row
              key={`artwork-details-${index}`}
              pb={index === displayItems.length - 1 ? 0 : 1}
            >
              <Col xs={12} sm={6} md={6} lg={3}>
                <Text variant="mediumText" pr={2}>
                  {title}
                </Text>
              </Col>
              <Col xs={12} sm={6} md={6} lg={9}>
                <HTML variant="text" color="black60">
                  {React.isValidElement(value) ? (
                    value
                  ) : (
                    <ReadMore maxChars={140} content={value} />
                  )}
                </HTML>
              </Col>
            </Row>
          ))}
        </Grid>
      </StackableBorderBox>
    )
  }
}

export const ArtworkDetailsAdditionalInfoFragmentContainer = createFragmentContainer(
  ArtworkDetailsAdditionalInfo,
  {
    artwork: graphql`
      fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
        category
        series
        publisher
        manufacturer
        image_rights: imageRights
        canRequestLotConditionsReport
        internalID
        framed {
          label
          details
        }
        signatureInfo {
          label
          details
        }
        conditionDescription {
          label
          details
        }
        certificateOfAuthenticity {
          label
          details
        }
      }
    `,
  }
)
