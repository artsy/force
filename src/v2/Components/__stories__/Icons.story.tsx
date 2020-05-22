import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { Box, Col, Flex, Grid, Row } from "@artsy/palette"
import * as svgs from "@artsy/palette"
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
              <svgs.BellIcon width="25" />
            </Col>
            <Col p={1} width="auto">
              <svgs.CheckIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.ChevronIcon width={40} height={40} />
            </Col>
            <Col p={1} width="auto">
              <svgs.CircleBlackCheckIcon width="25" height="25" />
            </Col>
            <Col p={1} width="auto">
              <svgs.CircleWhiteCheckIcon width="25" height="25" />
            </Col>
            <Col p={1} width="auto">
              <svgs.ClosedEyeIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.FilterIcon fill="black10" />
            </Col>
            <Col p={1} width="auto">
              <svgs.HeartIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.HelpIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.LocationIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.LosingBidIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.OpenEyeIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.PlusIcon width="25" height="25" />
            </Col>
            <Col p={1} width="auto">
              <svgs.WinningBidIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.BlueChipIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.SoloIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.GroupIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.BookIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.AuctionIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.FairIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.MuseumIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.TopEmergingIcon />
            </Col>
            <Col p={1} width="auto">
              <svgs.TopEstablishedIcon />
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
