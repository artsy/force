import { SystemContextProvider } from "v2/Artsy"
import { Artists, Genes } from "v2/Components/Publishing/Fixtures/Components"
import { wrapperWithContext } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import { ArtistToolTip } from "../ArtistToolTip"
import { GeneToolTip } from "../GeneToolTip"
import { ToolTip } from "../ToolTip"

describe("ToolTip", () => {
  const getWrapper = props => {
    const tooltipsData = { artists: [], genes: [] }

    tooltipsData[`${props.model}s`].push(props.entity)
    return wrapperWithContext(
      {
        tooltipsData,
      },
      {
        tooltipsData: PropTypes.object,
      },
      <SystemContextProvider>
        <ToolTip model={props.model} entity={props.entity} />
      </SystemContextProvider>
    )
  }

  // FIXME: Reenable when React 16.4.5 is release
  // (still seeing this error at React 16.5.0)
  // https://github.com/facebook/react/issues/13150#issuecomment-411134477

  // describe("snapshots", () => {
  //   it("Renders an artist properly", () => {
  //     const entity = Artists[0].artist
  //     const component = renderer
  //       .create(getWrapper({ entity, model: "artist" }))
  //       .toJSON()
  //     expect(component).toMatchSnapshot()
  //   })

  //   it("Renders a gene properly", () => {
  //     const entity = Genes[0].gene
  //     const component = renderer
  //       .create(getWrapper({ entity, model: "gene" }))
  //       .toJSON()
  //     expect(component).toMatchSnapshot()
  //   })
  // })

  it("Renders an artist", () => {
    const entity = Artists[0].artist
    const component = mount(getWrapper({ entity, model: "artist" }))

    expect(component.find(ArtistToolTip).length).toBe(1)
    expect(component.text()).toMatch(Artists[0].artist.name)
  })

  it("Renders a gene", () => {
    const entity = Genes[0].gene
    const component = mount(getWrapper({ entity, model: "gene" }))

    expect(component.find(GeneToolTip).length).toBe(1)
    expect(component.text()).toMatch(Genes[0].gene.name)
  })
})
