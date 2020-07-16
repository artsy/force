import React from "react"
import sinon from "sinon"
import { mount } from "enzyme"
import { Header } from "../header"
import { PartnerInline } from "@artsy/reaction/dist/Components/Publishing/Partner/PartnerInline"
import Icon from "@artsy/reaction/dist/Components/Icon"

xdescribe("Gucci Header", () => {
  const props = {
    title: "Artists For Gender Equality",
    partner_logo: "http://partner.com/logo.jpg",
    partner_url: "http://partner.com",
  }

  it("Renders the ParnerInline block, title and menu link", () => {
    const component = mount(<Header {...props} />)
    component.find(PartnerInline).length.should.eql(1)
    component.html().should.containEql("Artists For Gender Equality")
    component.html().should.containEql('href="/articles"')
    component.html().should.containEql("Back to Editorial")
  })

  xit("Hides the title and menu link if isMobile", () => {
    props.isMobile = true
    const component = mount(<Header {...props} />)
    component.find(PartnerInline).length.should.eql(1)
    component.html().should.not.containEql("Artists For Gender Equality")
    component.html().should.not.containEql('href="/articles"')
    component.html().should.not.containEql("Back to Editorial")
  })

  it("Shows a menu icon if isMobile and has onOpenMenu", () => {
    props.onOpenMenu = sinon.stub()
    const component = mount(<Header {...props} />)
    component.find(Icon).length.should.eql(2)
  })

  it("Hides the menu icon if isMobile and no onOpenMenu", () => {
    delete props.onOpenMenu
    const component = mount(<Header {...props} />)
    component.find(Icon).length.should.eql(1)
  })

  it("Calls onOpenMenu when clicking menu icon", () => {
    props.onOpenMenu = sinon.stub()
    const component = mount(<Header {...props} />)
    component.find(Icon).at(1).simulate("click")
    props.onOpenMenu.called.should.eql(true)
  })
})
