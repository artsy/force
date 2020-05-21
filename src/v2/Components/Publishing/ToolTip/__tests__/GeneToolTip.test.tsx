import { SystemContextProvider } from "v2/Artsy"
import { FollowGeneButton } from "v2/Components/FollowButton/FollowGeneButton"
import { Genes } from "v2/Components/Publishing/Fixtures/Components"
import { wrapperWithContext } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import { GeneToolTip } from "../GeneToolTip"

describe("GeneTooltip", () => {
  const getWrapper = (props, context = {}) => {
    return mount(
      wrapperWithContext(
        {
          ...context,
          tooltipsData: {
            genes: [props.gene],
          },
        },
        {
          tooltipsData: PropTypes.object,
          onOpenAuthModal: PropTypes.func,
          user: PropTypes.object,
        },
        <SystemContextProvider user={(context as any).user}>
          <GeneToolTip gene={props.gene} />
        </SystemContextProvider>
      )
    )
  }

  it("Renders gene data", () => {
    const gene = Genes[0].gene
    const component = getWrapper({ gene })

    expect(component.text()).toMatch(gene.name)
  })

  describe("Open Auth Modal", () => {
    it("callback gets called when followButton is clicked", () => {
      const gene = Genes[0].gene
      const context = {
        onOpenAuthModal: jest.fn(),
        user: null,
      }
      const component = getWrapper({ gene }, context)
      component.find(FollowGeneButton).simulate("click")

      expect(context.onOpenAuthModal).toBeCalledWith("signup", {
        afterSignUpAction: {
          action: "follow",
          kind: "gene",
          objectId: "capitalist-realism",
        },
        contextModule: "intextTooltip",
        copy: "Sign up to follow categories",
        intent: "followGene",
      })
    })
  })
})
