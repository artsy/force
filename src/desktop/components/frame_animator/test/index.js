import sinon from "sinon"

const rewire = require("rewire")("../index")
const FrameAnimator = rewire.default

xdescribe("FrameAnimator", () => {
  beforeEach(() => {
    window.requestAnimationFrame = () => {}
    window.performance = {
      now: sinon.stub(),
    }
    window.performance.now.onCall(0).returns(0)
  })

  it("fires the callback within the requested duration", () => {
    const duration = 100
    const timestampWithinDuration = 99
    const callback = sinon.spy()

    const animator = new FrameAnimator(callback, { duration })
    animator._animatorFunction(timestampWithinDuration)

    callback.callCount.should.equal(1)
  })

  it("does not fire the callback after the duration is up", () => {
    const duration = 100
    const timestampAfterDuration = 101
    const callback = sinon.spy()

    const animator = new FrameAnimator(callback, { duration })
    animator._animatorFunction(timestampAfterDuration)

    callback.callCount.should.equal(0)
  })

  it("animates from the starting value", () => {
    const duration = 100
    const startValue = 42
    const endValue = 420
    const timestamp = 0
    const callback = sinon.spy()

    const animator = new FrameAnimator(callback, {
      duration,
      startValue,
      endValue,
    })
    animator._animatorFunction(timestamp)

    callback.callCount.should.equal(1)
    callback.getCall(0).args[0].should.equal(42)
  })

  it("animates to the ending value", () => {
    const duration = 100
    const startValue = 42
    const endValue = 420
    const timestamp = 100
    const callback = sinon.spy()

    const animator = new FrameAnimator(callback, {
      duration,
      startValue,
      endValue,
    })
    animator._animatorFunction(timestamp)

    callback.callCount.should.equal(1)
    callback.getCall(0).args[0].should.equal(420)
  })

  it("queues itself again with requestAnimationFrame", () => {
    const duration = 100
    const startValue = 42
    const endValue = 420
    const callback = sinon.spy()

    // stub a series of hi-res timestamp calls for requestAnimationFrame
    window.performance.now.onCall(1).returns(30) // re-queues
    window.performance.now.onCall(2).returns(60) // re-queues
    window.performance.now.onCall(3).returns(90) // re-queues
    window.performance.now.onCall(4).returns(120) // finishes

    // stub requestAnimationFrame itself
    sinon.stub(window, "requestAnimationFrame", fn => {
      const currentTimestamp = window.performance.now()
      fn(currentTimestamp)
    })

    const animator = new FrameAnimator(callback, {
      duration,
      startValue,
      endValue,
    })
    animator.start()

    callback.callCount.should.equal(3)
  })

  it("uses sensible defaults", () => {
    const callback = sinon.spy()
    const animator = new FrameAnimator(callback)

    // animate from 0 to 1 in 500ms
    animator._animatorFunction(0)
    animator._animatorFunction(500)

    callback.args.should.match([[0], [1]])
  })

  describe("easing function", () => {
    let easingFunctions
    let resetRewire

    beforeEach(() => {
      easingFunctions = {
        sinInOut: sinon.spy(),
        cubicInOut: sinon.spy(),
      }
      resetRewire = rewire.__set__("easingFunctions", easingFunctions)
    })

    afterEach(() => {
      resetRewire()
    })

    it("defaults to cubicInOut", () => {
      const callback = sinon.spy()
      const animator = new FrameAnimator(callback)
      animator._animatorFunction(0)
      easingFunctions.cubicInOut.callCount.should.equal(1)
    })

    it("can be configured by supplying a function name", () => {
      const callback = sinon.spy()
      const animator = new FrameAnimator(callback, {
        easing: "sinInOut",
      })
      animator._animatorFunction(0)
      easingFunctions.sinInOut.callCount.should.equal(1)
    })
  })
})
