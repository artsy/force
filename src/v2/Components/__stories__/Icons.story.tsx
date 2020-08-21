import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { Grid } from "@artsy/palette/dist/elements/Grid"
import { Col, Row } from "@artsy/palette/dist/elements/Grid"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { Box } from "@artsy/palette/dist/elements/Box"
import { AuctionIcon } from "@artsy/palette/dist/svgs/AuctionIcon"
import { BellIcon } from "@artsy/palette/dist/svgs/BellIcon"
import { BlueChipIcon } from "@artsy/palette/dist/svgs/BlueChipIcon"
import { PublicationIcon } from "@artsy/palette/dist/svgs/PublicationIcon"
import { CheckIcon } from "@artsy/palette/dist/svgs/CheckIcon"
import { ChevronIcon } from "@artsy/palette/dist/svgs/ChevronIcon"
import { CheckCircleFillIcon } from "@artsy/palette/dist/svgs/CheckCircleFillIcon"
import { EyeClosedIcon } from "@artsy/palette/dist/svgs/EyeClosedIcon"
import { FairIcon } from "@artsy/palette/dist/svgs/FairIcon"
import { FilterIcon } from "@artsy/palette/dist/svgs/FilterIcon"
import { UserMultiIcon } from "@artsy/palette/dist/svgs/UserMultiIcon"
import { HeartIcon } from "@artsy/palette/dist/svgs/HeartIcon"
import { QuestionCircleIcon } from "@artsy/palette/dist/svgs/QuestionCircleIcon"
import { MapPinIcon } from "@artsy/palette/dist/svgs/MapPinIcon"
import { CloseCircleIcon } from "@artsy/palette/dist/svgs/CloseCircleIcon"
import { InstitutionIcon } from "@artsy/palette/dist/svgs/InstitutionIcon"
import { EyeOpenedIcon } from "@artsy/palette/dist/svgs/EyeOpenedIcon"
import { AddCircleFillIcon } from "@artsy/palette/dist/svgs/AddCircleFillIcon"
import { UserSingleIcon } from "@artsy/palette/dist/svgs/UserSingleIcon"
import { TopEmergingIcon } from "@artsy/palette/dist/svgs/TopEmergingIcon"
import { EstablishedIcon } from "@artsy/palette/dist/svgs/EstablishedIcon"
import { CheckCircleIcon } from "@artsy/palette/dist/svgs/CheckCircleIcon"
import icons, { IconName } from "../../Assets/Icons"
import CircleIcon from "../CircleIcon"
import Icon from "../Icon"
import Title from "../Title"

storiesOf("Components/Icons", module).add("All Icons", () => {
  const iconNames = Object.keys(icons).sort()

  return (
    <Box p={1}>
      <Grid>
        <Row>
          <Title>SVG Icons</Title>
        </Row>
        <Row>
          <Flex flexDirection="row" flexWrap="wrap">
            <Col p={1} width="auto">
              <BellIcon width="25" />
            </Col>
            <Col p={1} width="auto">
              <CheckIcon />
            </Col>
            <Col p={1} width="auto">
              <ChevronIcon width={40} height={40} />
            </Col>
            <Col p={1} width="auto">
              <CheckCircleFillIcon width="25" height="25" />
            </Col>
            <Col p={1} width="auto">
              <CheckCircleIcon width="25" height="25" />
            </Col>
            <Col p={1} width="auto">
              <EyeClosedIcon />
            </Col>
            <Col p={1} width="auto">
              <FilterIcon fill="black10" />
            </Col>
            <Col p={1} width="auto">
              <HeartIcon />
            </Col>
            <Col p={1} width="auto">
              <QuestionCircleIcon />
            </Col>
            <Col p={1} width="auto">
              <MapPinIcon />
            </Col>
            <Col p={1} width="auto">
              <CloseCircleIcon />
            </Col>
            <Col p={1} width="auto">
              <EyeOpenedIcon />
            </Col>
            <Col p={1} width="auto">
              <AddCircleFillIcon width="25" height="25" />
            </Col>
            <Col p={1} width="auto">
              <CheckCircleIcon />
            </Col>
            <Col p={1} width="auto">
              <BlueChipIcon />
            </Col>
            <Col p={1} width="auto">
              <UserSingleIcon />
            </Col>
            <Col p={1} width="auto">
              <UserMultiIcon />
            </Col>
            <Col p={1} width="auto">
              <PublicationIcon />
            </Col>
            <Col p={1} width="auto">
              <AuctionIcon />
            </Col>
            <Col p={1} width="auto">
              <FairIcon />
            </Col>
            <Col p={1} width="auto">
              <InstitutionIcon />
            </Col>
            <Col p={1} width="auto">
              <TopEmergingIcon />
            </Col>
            <Col p={1} width="auto">
              <EstablishedIcon />
            </Col>
          </Flex>
        </Row>

        <Row>
          <Title>Normal Icons</Title>
        </Row>

        <Row>
          <Flex flexDirection="row" flexWrap="wrap">
            {iconNames.map(iconName => (
              <Col p={1} width="auto">
                <Icon
                  name={iconName as IconName}
                  color="black"
                  title={iconName}
                />
              </Col>
            ))}
          </Flex>
        </Row>

        <Row>
          <Title>Large Icons</Title>
        </Row>
        <Row>
          {iconNames.map(iconName => (
            <Col p={1} width="auto">
              <Icon name={iconName as IconName} fontSize="60px" color="black" />
            </Col>
          ))}
        </Row>

        <Row>
          <Title>Circle Icons</Title>
        </Row>
        <Row>
          {iconNames.map(iconName => (
            <Col p={1} width="auto">
              <CircleIcon name={iconName as IconName} color="black" />
            </Col>
          ))}
        </Row>

        <Row>
          <Title>Large Circle Icons</Title>
        </Row>
        <Row>
          {iconNames.map(iconName => (
            <Col p={1} width="auto">
              <CircleIcon
                name={iconName as IconName}
                color="black"
                fontSize="60px"
              />
            </Col>
          ))}
        </Row>

        <Row>
          <Title>Colors</Title>
        </Row>
        <Row>
          <Col p={1} width="auto">
            <Icon name="logo" color="#6E1FFF" fontSize="60px" />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon name="logo" color="#6E1FFF" fontSize="60px" />
          </Col>
        </Row>

        <Row>
          <Title>Circle Icons with Different Scale</Title>
        </Row>
        <Row>
          <Col p={1} width="auto">
            <CircleIcon
              name="check"
              color="black"
              fontSize="60px"
              ratio={0.7}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="check"
              color="black"
              fontSize="60px"
              ratio={0.6}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="check"
              color="black"
              fontSize="60px"
              ratio={0.5}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="check"
              color="black"
              fontSize="60px"
              ratio={0.4}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="check"
              color="black"
              fontSize="60px"
              ratio={0.3}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="heart-small"
              color="black"
              fontSize="60px"
              ratio={0.7}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="heart-small"
              color="black"
              fontSize="60px"
              ratio={0.6}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="heart-small"
              color="black"
              fontSize="60px"
              ratio={0.5}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="heart-small"
              color="black"
              fontSize="60px"
              ratio={0.4}
            />
          </Col>
          <Col p={1} width="auto">
            <CircleIcon
              name="heart-small"
              color="black"
              fontSize="60px"
              ratio={0.3}
            />
          </Col>
        </Row>
      </Grid>
    </Box>
  )
})
