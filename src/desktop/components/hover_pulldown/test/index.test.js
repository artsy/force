/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")

describe("activatePulldowns", function () {
  describe("#activatePulldown", function () {
    before(done =>
      benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        $("body").html(`\
<span class="hover-pulldown">
More
<div class="hover-pulldown-menu">
  <a href="#">About Artsy</a>
</div>
</span>\
`)
        return done()
      })
    )

    after(() => benv.teardown())

    describe("touch devices", function () {
      before(function () {
        const activatePulldowns = rewire("../index")
        activatePulldowns.__set__("isTouchDevice", () => true)
        return activatePulldowns()
      })

      it("sets the data-mode of the elements", () =>
        $(".hover-pulldown").attr("data-mode").should.equal("touch"))

      it("inserts a backdrop and activates the element when tapped", function () {
        $(".hover-pulldown-backdrop").should.have.lengthOf(0)

        $(".hover-pulldown").click()
        $(".hover-pulldown-backdrop").should.have.lengthOf(1)

        return $(".hover-pulldown").data("state").should.equal("active")
      })

      it("removes the backdrop and deactivates the element when tapped off", function () {
        $(".hover-pulldown").click()
        $(".hover-pulldown").attr("data-state").should.equal("active")
        $(".hover-pulldown-backdrop").click()
        $(".hover-pulldown").attr("data-state").should.equal("inactive")
        return $(".hover-pulldown-backdrop").should.have.lengthOf(0)
      })

      return it("only adds one backdrop despite being tapped multiple times", function () {
        $(".hover-pulldown").click()
        $(".hover-pulldown").click()
        $(".hover-pulldown").click()
        return $(".hover-pulldown-backdrop").should.have.lengthOf(1)
      })
    })

    return describe("non-touch devices", function () {
      before(function () {
        const activatePulldowns = rewire("../index")
        activatePulldowns.__set__("isTouchDevice", () => false)
        return activatePulldowns()
      })

      return it("sets the data-mode of the elements", () =>
        $(".hover-pulldown").attr("data-mode").should.equal("hover"))
    })
  })

  return describe("#dismissStatic", function () {
    before(done =>
      benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        $("body").html(`\
<span class="hover-pulldown" data-state='static' data-cookie='monster'>
More

<div class="hover-pulldown-static">
  A description of the contents of 'More'
</div>

<div class="hover-pulldown-menu">
  <a href="#">About Artsy</a>
</div>
</span>\
`)
        return done()
      })
    )

    after(() => benv.teardown())

    beforeEach(function () {
      const activatePulldowns = rewire("../index")
      activatePulldowns.__set__(
        "Cookies",
        (this.Cookies = { set: sinon.stub(), get: sinon.stub() })
      )
      return activatePulldowns()
    })

    afterEach(() => $(".hover-pulldown").off())

    it("checks on and ticks the dismissal", function () {
      this.Cookies.get.args[0][0].should.equal("monster")
      return this.Cookies.set.args[0].should.eql([
        "monster",
        1,
        { expires: 31536000 },
      ])
    })

    return it("sets the dismissal limit on mouseenter", function () {
      $(".hover-pulldown").trigger("mouseenter")
      return this.Cookies.set.args[1].should.eql([
        "monster",
        15,
        { expires: 31536000 },
      ])
    })
  })
})
