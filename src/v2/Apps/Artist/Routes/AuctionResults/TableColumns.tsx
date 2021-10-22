import { Col, Row, Sans } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"

export const TableColumns = () => {
  return (
    <>
      <Media between={["sm", "lg"]}>
        <SmallTableColumns />
      </Media>
      <Media greaterThanOrEqual="lg">
        <LargeTableColumns />
      </Media>
    </>
  )
}

const LargeTableColumns = () => {
  return (
    <Row>
      <Col sm={5}>
        <Sans size="2" weight="medium">
          Work
        </Sans>
      </Col>
      <Col sm={3}>
        <Sans size="2" weight="medium">
          Sale
        </Sans>
      </Col>
      <Col sm={4}>
        <Sans size="2" weight="medium">
          Price
        </Sans>
      </Col>
    </Row>
  )
}

const SmallTableColumns = () => {
  return (
    <Row>
      <Col col={6}>
        <Sans size="2" weight="medium">
          Work
        </Sans>
      </Col>
      <Col col={6}>
        <Sans size="2" weight="medium">
          Price
        </Sans>
      </Col>
    </Row>
  )
}
