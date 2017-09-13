# FrameAnimator

`FrameAnimator` is a class representing an animatable value and a callback that acts on it.

Can be used to transition any value over any duration, but particularly useful in animating UI elements that can't be handled via CSS transitions.

Uses the `Window.requestAnimationFrame` API in order to be as smooth and buttery as possible as well as CPU- and battery-friendly.

### Example 1: Log out values from 0 to 1, over a half-second interval.

```js
const myLogger = new FrameAnimator(value => console.log(value))
myLogger.start()
```

![ex1](https://user-images.githubusercontent.com/140521/30332030-5388c40a-97a7-11e7-929f-92172afbe831.gif)


### Example 2: Animate the window scroll position over 3/4 of a second, easing out with a sine function.

```js
const startingScrollPosition = 0
const endingScrollPosition = 1000
const durationInMilliseconds = 750
const easingFunction = 'sinOut'

const myAnimator = new FrameAnimator(value => window.scrollTo(0,value), {
  startValue: startingScrollPosition,
  endValue: endingScrollPosition,
  duration: durationInMilliseconds,
  easing: easingFunction
})

myAnimator.start()
```

![ex2](https://user-images.githubusercontent.com/140521/30332029-531d6566-97a7-11e7-85bc-33b94b6fb495.gif)
