/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { resolve } = require("path")
const fs = require("fs")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const FilterDropdownView = require("../filter_dropdown_view.coffee")
const PartnerFilterFacet = require("../../filter_facet/partner_filter_facet.coffee")
const FilterParams = require("../../parameters/filter_params.coffee")

describe("FilterDropdownView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("filter dropdown", function () {
    beforeEach(function (done) {
      $.fn.typeahead = sinon.stub()
      this.params = new Backbone.Model({
        category: "painting",
        location: "location-1",
        type: "gallery",
      })
      this.aggregations = new Backbone.Model()

      this.facet = new PartnerFilterFacet({
        allItems: [
          { id: "location-1", name: "Location 1" },
          { id: "location-2", name: "Location 2" },
          { id: "location-3", name: "Location 3" },
          { id: "location-4", name: "Location 4" },
        ],
        facetName: "location",
        displayName: "Locations",
        aggregations: this.aggregations,
      })

      return benv.render(
        resolve(__dirname, "../template.jade"),
        { facet: this.facet, params: this.params },
        () => {
          this.dropdown = new FilterDropdownView({
            params: this.params,
            facet: this.facet,
            el: $(".partners-facet-dropdown"),
          })
          this.$input = this.dropdown.$input
          return done()
        }
      )
    })

    describe("#initialize", () =>
      it("sets up typeahead", function () {
        this.$input.typeahead.args[0][1].source.should.be.an.instanceOf(
          Function
        )
        this.$input.typeahead.args[0][1].name.should.equal("location")
        this.$input.typeahead.args[0][1].templates.suggestion.should.be.an.instanceOf(
          Function
        )
        this.$input.typeahead.args[0][1].template.should.equal("custom")
        return this.$input.typeahead.args[0][1].displayKey.should.equal("name")
      }))

    describe("#selected", function () {
      it("blurs the input", function () {
        this.$input.focus()
        this.dropdown.selected(
          { target: this.$input },
          { id: "location-2", name: "Location 2" },
          {}
        )
        return this.$input.is(":focus").should.be.false()
      })

      it("updates params to new value", function () {
        this.dropdown.selected(
          { target: this.$input },
          { id: "location-2", name: "Location 2" },
          {}
        )
        return this.params.attributes.should.deepEqual({
          category: "painting",
          location: "location-2",
          type: "gallery",
        })
      })

      return it("unsets the param key if the suggestion has no id (the All Items suggestion)", function () {
        this.dropdown.selected(
          { target: this.$input },
          this.$input,
          { name: "All Locations" },
          {}
        )
        return this.params.attributes.should.deepEqual({
          category: "painting",
          type: "gallery",
        })
      })
    })

    describe("#inputFocus", function () {
      beforeEach(function () {
        this.stub = sinon.stub()
        this.dropdown.typeahead = { input: { trigger: this.stub } }
        return this.$input.attr("placeholder", "foo bar")
      })

      it("updates placeholder for focus", function () {
        this.dropdown.inputFocus()
        return this.$input.attr("placeholder").should.equal("Search Locations")
      })

      return it("triggers immediate display of all results", function () {
        this.dropdown.inputFocus()
        return this.stub.args[0].should.deepEqual(["queryChanged", ""])
      })
    })

    describe("#inputBlur", function () {
      beforeEach(function () {
        return this.$input.attr("placeholder", "foo bar")
      })

      return it("clears the input", function () {
        this.dropdown.inputBlur()
        this.$input.typeahead.args[1].should.deepEqual(["val", ""])
        return this.$input.attr("placeholder").should.equal("Location 1")
      })
    })

    return describe("#setPlaceholder", function () {
      beforeEach(function () {
        return this.$input.attr("placeholder", "foo bar")
      })

      describe("no selection", function () {
        beforeEach(function () {
          return this.params.unset("location", { silent: true })
        })

        it("with focus", function () {
          this.dropdown.setPlaceholder(true)
          this.$input.attr("placeholder").should.equal("Search Locations")
          return this.$input.hasClass("no-selection").should.be.true()
        })

        return it("without focus", function () {
          this.dropdown.setPlaceholder(false)
          this.$input.attr("placeholder").should.equal("All Locations")
          return this.$input.hasClass("no-selection").should.be.true()
        })
      })

      return describe("with selection", function () {
        beforeEach(function () {
          return this.params.set({ location: "location-2", silent: true })
        })

        it("with focus", function () {
          this.dropdown.setPlaceholder(true)
          this.$input.attr("placeholder").should.equal("Search Locations")
          return this.$input.hasClass("no-selection").should.be.false()
        })

        return it("without focus", function () {
          this.dropdown.setPlaceholder(false)
          this.$input.attr("placeholder").should.equal("Location 2")
          return this.$input.hasClass("no-selection").should.be.false()
        })
      })
    })
  })

  return describe("search dropdown", function () {
    beforeEach(function (done) {
      $.fn.typeahead = sinon.stub()
      this.params = new Backbone.Model({
        category: "painting",
        location: "location-1",
        type: "gallery",
      })
      this.aggregations = new Backbone.Model()

      this.facet = new PartnerFilterFacet({
        allItems: [
          { id: "location-1", name: "Location 1" },
          { id: "location-2", name: "Location 2" },
          { id: "location-3", name: "Location 3" },
          { id: "location-4", name: "Location 4" },
        ],
        facetName: "term",
        displayName: "Name",
        aggregations: this.aggregations,
        search: true,
      })

      return benv.render(
        resolve(__dirname, "../template.jade"),
        { facet: this.facet, params: this.params },
        () => {
          this.dropdown = new FilterDropdownView({
            params: this.params,
            facet: this.facet,
            el: $(".partners-facet-dropdown"),
          })
          this.$input = this.dropdown.$input
          sinon.stub(this.dropdown, "goToProfile")
          return done()
        }
      )
    })

    describe("#initialize", () =>
      it("sets up typeahead", function () {
        this.$input.typeahead.args[0][1].source.should.be.an.instanceOf(
          Function
        )
        this.$input.typeahead.args[0][1].name.should.equal("term")
        this.$input.typeahead.args[0][1].templates.suggestion.should.be.an.instanceOf(
          Function
        )
        this.$input.typeahead.args[0][1].template.should.equal("custom")
        return this.$input.typeahead.args[0][1].displayKey.should.equal("name")
      }))

    return describe("#selected", function () {
      it("blurs the input", function () {
        this.$input.focus()
        this.dropdown.selected(
          { target: this.$input },
          {
            id: "location-2",
            name: "Location 2",
            profile: { href: "location-2" },
          },
          {}
        )
        return this.$input.is(":focus").should.be.false()
      })

      return it("redirects to profile page", function () {
        this.dropdown.selected(
          { target: this.$input },
          {
            id: "location-2",
            name: "Location 2",
            profile: { href: "/partner-profile-url" },
          },
          {}
        )
        return this.dropdown.goToProfile.args[0][0].should.equal(
          "/partner-profile-url"
        )
      })
    })
  })
})
