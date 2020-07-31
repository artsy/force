/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const State = require("../index")

describe("State", function () {
  describe("context", function () {
    it("always includes a reference to itself", function () {
      const state = new State()
      return state.context.state.should.equal(state)
    })

    return describe("#inject", () =>
      xit("lets you inject additions to the context at any point", function () {
        const state = new State()
        state.inject({ foo: "bar", bar: { baz: "foo" } })
        state.inject({ baz: "qux" })
        Object.keys(state.context).should.eql(["state", "foo", "bar", "baz"])
        state.context.foo.should.equal("bar")
        state.context.bar.should.eql({ baz: "foo" })
        return state.context.baz.should.equal("qux")
      }))
  })

  describe("single path", function () {
    beforeEach(function () {
      return (this.state = new State({
        steps: ["first", "second", "third", "fourth"],
      }))
    })

    describe("#current", () =>
      it("returns the first step in the path", function () {
        return this.state.current().should.equal("first")
      }))

    return describe("#next", () =>
      it("moves through the steps; stopping at the end", function () {
        this.state.next().should.equal("second")
        this.state.current().should.equal("second")
        this.state.next().should.equal("third")
        this.state.isEnd().should.be.false()
        this.state.next().should.equal("fourth")
        this.state.isEnd().should.be.true()
        return this.state.next().should.equal("fourth")
      }))
  })

  describe("complex path", function () {
    beforeEach(function () {
      return (this.state = new State({
        decisions: {
          first_decision() {
            return false
          },
          second_decision() {
            return true
          },
          dependent_decision({ some_dependency }) {
            return some_dependency
          },
        },

        steps: [
          "first",
          "second",
          {
            first_decision: {
              true: ["true_first", "true_second"],
              false: [
                "false_first",
                {
                  second_decision: {
                    true: [
                      "false_true_first",
                      {
                        dependent_decision: {
                          true: ["false_true_true_first"],
                          false: ["false_true_false_first"],
                        },
                      },
                    ],
                    false: ["false_false_first"],
                  },
                },
              ],
            },
          },
          "fourth",
        ],
      }))
    })

    describe("#next", () =>
      it("moves through the states; making decisions and stopping at the end", function () {
        this.state.current().should.equal("first")
        this.state.next().should.equal("second")
        this.state.next().should.equal("false_first") // Makes first_decision
        this.state.next().should.equal("false_true_first") // Makes second_decision

        // Inject dependencies at a later time
        this.state.inject({ some_dependency: false })
        this.state.next().should.equal("false_true_false_first") // Makes dependent_decision

        return this.state.next().should.equal("fourth")
      }))

    return describe("#position; #total", function () {
      beforeEach(function () {
        return (this.state = new State({
          decisions: {
            on() {
              return "and_on"
            },
          },

          steps: [
            "first",
            "second",
            {
              on: {
                and_on: ["third", "fourth"],
              },
            },
          ],
        }))
      })

      return it("keeps track of the position", function () {
        this.state.current().should.equal("first")
        this.state.position().should.equal(1)
        // `total` can only be reliably displayed when on the terminal leaf of a step tree
        this.state.total().should.equal(3)
        this.state.isEnd().should.be.false()

        this.state.next().should.equal("second")
        this.state.position().should.equal(2)
        this.state.total().should.equal(3)
        this.state.isEnd().should.be.false()

        this.state.next().should.equal("third")
        this.state.position().should.equal(3)
        this.state.total().should.equal(4)
        this.state.isEnd().should.be.false()

        this.state.next().should.equal("fourth")
        this.state.position().should.equal(4)
        this.state.total().should.equal(4)
        return this.state.isEnd().should.be.true()
      })
    })
  })

  describe("resumable paths", function () {
    beforeEach(function () {
      return (this.state = new State({
        decisions: {
          second() {
            return true
          },

          fourth() {
            return false
          },

          sub_fourth() {
            return true
          },
        },

        steps: [
          "first",
          {
            second: {
              true: ["second′"],
            },
          },
          "third",
          {
            fourth: {
              false: [
                "fourth′",
                {
                  sub_fourth: {
                    true: ["fourth″"],
                  },
                },
              ],
            },
          },
          "fifth",
        ],
      }))
    })

    return it("resumes the primary path after travelling down multiple sub-paths", function () {
      this.state.current().should.equal("first")
      this.state.isEnd().should.be.false()
      this.state.next().should.equal("second′")
      this.state.isEnd().should.be.false()
      this.state.next().should.equal("third")
      this.state.isEnd().should.be.false()
      this.state.next().should.equal("fourth′")
      this.state.isEnd().should.be.false()
      this.state.next().should.equal("fourth″")
      this.state.isEnd().should.be.false()
      this.state.next().should.equal("fifth")
      return this.state.isEnd().should.be.true()
    })
  })

  return describe("conditional steps", function () {
    beforeEach(function () {
      return (this.state = new State({
        decisions: {
          should_skip() {
            return true
          },

          should_not_skip() {
            return true
          },
        },

        steps: [
          "first",
          { should_skip: { false: ["skip_this_second"] } },
          { should_not_skip: { true: ["land_on_this_second"] } },
          "third",
        ],
      }))
    })

    return it("skips the second step", function () {
      this.state.current().should.equal("first")
      this.state.next().should.equal("land_on_this_second")
      this.state.next().should.equal("third")
      return this.state.isEnd().should.be.true()
    })
  })
})
