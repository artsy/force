import { Box, Col, Flex, Grid, Row } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import React from "react"
import { FilterSidebar } from "./FilterSidebar"
import { GridItem } from "./GridItem"
import { Header } from "./Header"

export const SearchResultsSkeleton: React.FC<any> = props => {
  return (
    <AppContainer>
      <Box style={{ minWidth: 320 }} mx={2}>
        <Header />
        <Flex>
          <FilterSidebar />
          <Box width={["100%", "75%"]}>
            <Grid fluid>
              <Row>
                <Col xs="6" sm="6" md="6" lg="4">
                  <GridItem height={200} />
                  <GridItem height={400} />
                  <GridItem height={240} />
                </Col>
                <Col xs="6" sm="6" md="6" lg="4">
                  <GridItem height={300} />
                  <GridItem height={200} />
                  <GridItem height={320} />
                </Col>
                <Col xs="6" sm="6" md="6" lg="4">
                  <GridItem height={240} />
                  <GridItem height={400} />
                </Col>
              </Row>
            </Grid>
          </Box>
        </Flex>
      </Box>
    </AppContainer>
  )
}
