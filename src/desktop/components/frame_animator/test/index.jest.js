import FrameAnimator from "../index"

describe("FrameAnimator", () => {
  beforeEach(() => {
    delete global.requestAnimationFrame
    global.requestAnimationFrame = () => {}

    delete global.performance
    global.performance = {
      now: jest.fn(() => {
        return 0
      }),
    }
  })

  it("fires the callback within the requested duration", () => {
    const duration = 100
    const timestampWithinDuration = 99
    const callback = jest.fn()

    const animator = new FrameAnimator(callback, { duration })
    animator._animatorFunction(timestampWithinDuration)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("does not fire the callback after the duration is up", () => {
    const duration = 100
    const timestampAfterDuration = 200
    const callback = jest.fn()

    const animator = new FrameAnimator(callback, { duration })
    animator._animatorFunction(timestampAfterDuration)

    expect(callback).not.toHaveBeenCalled()
  })

  it("animates from the starting value", () => {
    const duration = 100
    const startValue = 42
    const endValue = 420
    const timestamp = 0
    const callback = jest.fn()

    const animator = new FrameAnimator(callback, {
      duration,
      startValue,
      endValue,
    })
    animator._animatorFunction(timestamp)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(42)
  })

  it("animates to the ending value", () => {
    const duration = 100
    const startValue = 42
    const endValue = 420
    const timestamp = 100
    const callback = jest.fn()

    const animator = new FrameAnimator(callback, {
      duration,
      startValue,
      endValue,
    })
    animator._animatorFunction(timestamp)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(420)
  })

  it("queues itself again with requestAnimationFrame", () => {
    const duration = 100
    const startValue = 42
    const endValue = 420
    const callback = jest.fn()

    // stub a series of hi-res timestamp calls for requestAnimationFrame
    global.performance = {
      now: jest
        .fn()
        .mockImplementationOnce(() => 30) // re-queues
        .mockImplementationOnce(() => 60) // re-queues
        .mockImplementationOnce(() => 90) // re-queues
        .mockImplementationOnce(() => 120), // finishes
    }

    // stub requestAnimationFrame itself
    global.requestAnimationFrame = jest.fn(cb => {
      const currentTimestamp = global.performance.now()
      cb(currentTimestamp)
    })

    const animator = new FrameAnimator(callback, {
      duration,
      startValue,
      endValue,
    })
    animator.start()

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it("uses sensible defaults", () => {
    const callback = jest.fn()
    const animator = new FrameAnimator(callback)

    // animate from 0 to 1 in 500ms
    animator._animatorFunction(0)
    animator._animatorFunction(500)

    expect(callback.mock.calls).toEqual([[0], [1]])
  })

  xdescribe("easing function", () => {
    // needs mocking of ../easing

    it("defaults to cubicInOut", () => {
      const callback = jest.fn()
      const animator = new FrameAnimator(callback)
      animator._animatorFunction(0)
      // expect(easingFunctions.cubicInOut).toHaveBeenCalledTimes(1)
    })

    it("can be configured by supplying a function name", () => {
      const callback = jest.fn()
      const animator = new FrameAnimator(callback, {
        easing: "sinInOut",
      })
      animator._animatorFunction(0)
      // expect(easingFunctions.sinInOut).toHaveBeenCalledTimes(1)
    })
  })
})
