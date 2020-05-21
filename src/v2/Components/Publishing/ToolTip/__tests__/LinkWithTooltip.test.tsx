import { SystemContextProvider } from "v2/Artsy"
import { Artists, Genes } from "v2/Components/Publishing/Fixtures/Components"
import { wrapperWithContext } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import { defer } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {
  Background,
  Link,
  LinkWithTooltip,
  PrimaryLink,
} from "../LinkWithTooltip"
import { ToolTip } from "../ToolTip"

describe("LinkWithTooltip", () => {
  const context = {
    activeToolTip: null,
    tooltipsData: {
      artists: { "nick-mauss": Artists[0].artist },
      genes: { "capitalist-realism": Genes[0].gene },
    },
    onTriggerToolTip: jest.fn(),
  }

  const getWrapper = (testContext = context, passedProps = props) => {
    const { activeToolTip, tooltipsData, onTriggerToolTip } = testContext
    const { text, url, tracking } = passedProps

    return mount(
      wrapperWithContext(
        {
          activeToolTip,
          tooltipsData,
          onTriggerToolTip,
          relay: { environment: {} },
        },
        {
          activeToolTip: PropTypes.string,
          tooltipsData: PropTypes.object,
          onTriggerToolTip: PropTypes.func,
          relay: PropTypes.object,
        },
        <SystemContextProvider>
          <LinkWithTooltip url={url} tracking={tracking}>
            {text}
          </LinkWithTooltip>
        </SystemContextProvider>
      )
    )
  }

  let props
  let position

  beforeEach(() => {
    context.onTriggerToolTip = jest.fn()
    props = {
      url: "https://www.artsy.net/artist/nick-mauss",
      text: "Nick Mauss",
      tracking: {
        trackEvent: jest.fn(),
      },
    }

    position = {
      bottom: 1164.25,
      height: 22.25,
      left: 254.859375,
      right: 382.21875,
      top: 1142,
      width: 127.359375,
      x: 254.859375,
      y: 1142,
    }
  })

  it("Renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toBe("Nick Mauss")
    expect(wrapper.find(ToolTip).exists()).toBeFalsy()
  })

  it("#urlToEntityType extracts entity type from URL", () => {
    const wrapper = getWrapper()
      .childAt(0)
      .childAt(0)
      .instance() as LinkWithTooltip

    expect(wrapper.urlToEntityType()).toEqual({
      entityType: "artist",
      slug: "nick-mauss",
    })
  })

  it("#entityTypeToEntity correctly gets data from tooltips context", () => {
    const wrapper = getWrapper()
      .childAt(0)
      .childAt(0)
      .instance() as LinkWithTooltip

    expect(wrapper.entityTypeToEntity()).toEqual({
      entityType: "artist",
      entity: context.tooltipsData.artists["nick-mauss"],
    })
  })

  it("Displays a tooltip if context.activeToolTip is current item", () => {
    context.activeToolTip = "nick-mauss"
    const wrapper = getWrapper()

    expect(wrapper.find(ToolTip).exists()).toBe(true)
    expect(wrapper.text()).toMatch("American, b. 1980")
  })

  it("Calls context.onTriggerToolTip on hover", () => {
    context.activeToolTip = null
    const wrapper = getWrapper()
    wrapper.find(Link).simulate("mouseEnter")

    expect(context.onTriggerToolTip.mock.calls[0][0]).toBe("nick-mauss")
  })

  it("Tracks hover events", () => {
    context.activeToolTip = null
    const wrapper = getWrapper()
    wrapper.find(Link).simulate("mouseEnter")
    const tracking = props.tracking.trackEvent.mock.calls[0][0]

    expect(tracking.action).toBe("Viewed tooltip")
    expect(tracking.entity_id).toBe("5955005ceaaedc0017acdd1f")
    expect(tracking.entity_slug).toBe("nick-mauss")
    expect(tracking.entity_type).toBe("artist")
    expect(tracking.type).toBe("intext tooltip")
  })

  it("Tracks click events", () => {
    context.activeToolTip = null
    const wrapper = getWrapper()
    wrapper.find(PrimaryLink).simulate("click")
    const tracking = props.tracking.trackEvent.mock.calls[0][0]

    expect(tracking.action).toBe("Click")
    expect(tracking.flow).toBe("tooltip")
    expect(tracking.type).toBe("artist stub")
    expect(tracking.context_module).toBe("intext tooltip")
    expect(tracking.destination_path).toBe("/artist/nick-mauss")
  })

  it("Tracks click events from hover background", () => {
    context.activeToolTip = "nick-mauss"
    const wrapper = getWrapper()
    wrapper.find(Background).simulate("click")
    const tracking = props.tracking.trackEvent.mock.calls[0][0]

    expect(tracking.action).toBe("Click")
    expect(tracking.flow).toBe("tooltip")
    expect(tracking.type).toBe("artist stub")
    expect(tracking.context_module).toBe("intext tooltip")
    expect(tracking.destination_path).toBe("/artist/nick-mauss")
  })

  it("Sets tooltip position on mount", () => {
    const wrapper = getWrapper()
      .childAt(0)
      .childAt(0)
      .instance() as LinkWithTooltip
    expect(wrapper.state.position.left).toBe(0)
  })

  it("Calls #setupToolTipPosition on #componentDidMount", () => {
    const wrapper = getWrapper()
      .childAt(0)
      .childAt(0)
      .instance() as LinkWithTooltip
    wrapper.setupToolTipPosition = jest.fn()

    wrapper.componentDidMount()
    expect(wrapper.setupToolTipPosition).toBeCalledTimes(1)
  })

  it("Calls #onLeaveLink on mouseLeave", done => {
    context.activeToolTip = "nick-mauss"
    const wrapper = getWrapper()
    const instance = wrapper
      .childAt(0)
      .childAt(0)
      .instance() as LinkWithTooltip
    wrapper.find(Background).simulate("mouseLeave")

    expect(instance.state.maybeHideToolTip).toBe(true)
    defer(() => {
      setTimeout(() => {
        expect(context.onTriggerToolTip.mock.calls[0][0]).toBe(null)
        expect(instance.state.maybeHideToolTip).toBe(false)
        done()
      }, 750)
    })
  })

  it("#setupToolTipPosition sets state with link position and getOrientation", () => {
    const wrapper = getWrapper()
      .childAt(0)
      .childAt(0)
      .instance() as any
    wrapper.setState = jest.fn()
    wrapper.setupToolTipPosition()

    expect(wrapper.setState.mock.calls[0][0].position.top).toBe(0)
    expect(wrapper.setState.mock.calls[0][0].orientation).toBe("down")
  })

  describe("#getOrientation", () => {
    it("Returns 'down' if space above link is < 350", () => {
      position.top = 300
      const wrapper = getWrapper()
        .childAt(0)
        .childAt(0)
        .instance() as LinkWithTooltip
      const getOrientation = wrapper.getOrientation(position)

      expect(getOrientation).toBe("down")
    })

    it("Returns 'up' if space above link is > 350", () => {
      position.top = 500
      const wrapper = getWrapper()
        .childAt(0)
        .childAt(0)
        .instance() as LinkWithTooltip
      const getOrientation = wrapper.getOrientation(position)

      expect(getOrientation).toBe("up")
    })
  })

  describe("#getToolTipPosition", () => {
    it("Returns tooltip position for artist links", () => {
      const wrapper = getWrapper()
        .childAt(0)
        .childAt(0)
        .instance() as LinkWithTooltip
      wrapper.setState({ position })
      expect(wrapper.getToolTipPosition("artist").toolTipLeft).toBe(
        -116.3203125
      )
    })

    it("Returns tooltip position for gene links", () => {
      const wrapper = getWrapper()
        .childAt(0)
        .childAt(0)
        .instance() as LinkWithTooltip
      wrapper.setState({ position })
      expect(wrapper.getToolTipPosition("gene").toolTipLeft).toBe(-76.3203125)
    })

    it("Returns tooltip and arrow position for artist links at left window boundary", () => {
      position.x = 80
      position.width = 100
      position.left = 60
      const wrapper = getWrapper()
        .childAt(0)
        .childAt(0)
        .instance() as LinkWithTooltip
      wrapper.setState({ position })
      const { arrowLeft, toolTipLeft } = wrapper.getToolTipPosition("artist")

      expect(toolTipLeft).toBe(-70)
      expect(arrowLeft).toBe(60)
    })

    it("Returns a position for gene links at left window boundary", () => {
      position.x = 80
      position.width = 100
      position.left = 60
      const wrapper = getWrapper()
        .childAt(0)
        .childAt(0)
        .instance() as LinkWithTooltip
      wrapper.setState({ position })
      const { arrowLeft, toolTipLeft } = wrapper.getToolTipPosition("gene")

      expect(toolTipLeft).toBe(-70)
      expect(arrowLeft).toBe(60)
    })
  })
})
