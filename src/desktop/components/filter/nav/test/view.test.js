/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")

describe("FilterNav", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      const FilterNav = require("../view")
      this.view = new FilterNav({
        el: $(`\
<nav class="filter-nav filter-artworks-nav">
   <a class="filter-button filter-nav-all is-active">All Works</a>
   <div class="filter-dropdown is-active">
      <div class="filter-nav-main-text">Price</div>
      <div class="filter-nav-active-text">$1,000 to $5,000</div>
      <div class="icon-arrow-down"></div>
      <nav style=""><a data-attr="price_range" data-val=""><span class="filter-dropdown-text">All Works</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="-1:1000" class=""><span class="filter-dropdown-text">Under $1,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="1000:5000" class="is-active"><span class="filter-dropdown-text">$1,000 to $5,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="5000:10000"><span class="filter-dropdown-text">$5,000 to $10,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="10000:50000"><span class="filter-dropdown-text">$10,000 to $50,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="50000:1000000000000"><span class="filter-dropdown-text">Over $50,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="-1:1000000000000"><span class="filter-dropdown-text">All For Sale</span><span class="filter-dropdown-count">(1228)</span><span class="icon-check"></span></a></nav>
   </div>
   <div class="filter-dropdown is-active">
      <div class="filter-nav-main-text">Size</div>
      <div class="filter-nav-active-text">Small</div>
      <div class="icon-arrow-down"></div>
      <nav style=""><a data-attr="dimension" data-val=""><span class="filter-dropdown-text">All Sizes</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="dimension" data-val="24" class="is-active"><span class="filter-dropdown-text">Small</span><span class="filter-dropdown-count">(17)</span><span class="icon-check"></span></a><a data-attr="dimension" data-val="48"><span class="filter-dropdown-text">Medium</span><span class="filter-dropdown-count">(5)</span><span class="icon-check"></span></a><a data-attr="dimension" data-val="84"><span class="filter-dropdown-text">Large</span><span class="filter-dropdown-count">(87)</span><span class="icon-check"></span></a></nav>
   </div>
</nav>\
`),
        params: new Backbone.Model(),
      })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("#clearActive", () =>
    it("clears active things when params change", function () {
      this.view.$(".filter-dropdown").addClass("is-active")
      this.view.params.trigger("change")
      return this.view
        .$(".filter-dropdown")
        .hasClass("is-active")
        .should.not.be.ok()
    }))

  describe("#renderActiveParams", () =>
    it("renders active params", function () {
      this.view.params.set({ price_range: "5000:10000" })
      this.view.renderActiveParams()
      this.view.$(".filter-dropdown").hasClass("is-active").should.be.ok()
      this.view
        .$(".filter-nav-active-text")
        .text()
        .should.containEql("$5,000 to $10,000")
      return this.view.$("nav a").hasClass("is-active").should.be.ok()
    }))

  describe("#highlightAll", () =>
    it("highlights all works when the params arent specific", function () {
      this.view.params.clear()
      return this.view.$(".filter-nav-all").hasClass("is-active").should.be.ok()
    }))

  describe("#filterAttr", () =>
    it("sets price", function () {
      this.view.filterAttr({
        currentTarget: $(
          "<div data-attr='price_range' data-val='-1:1000'></div>"
        ),
      })
      return this.view.params.get("price_range").should.equal("-1:1000")
    }))

  return describe("#highlightDropdownAlls", () =>
    it("makes the all nav active when there is no param set", function () {
      this.view.params.clear()
      this.view.highlightDropdownAlls()
      return this.view
        .$(".filter-dropdown nav a")
        .first()
        .hasClass("is-active")
        .should.be.ok()
    }))
})
