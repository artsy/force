/*
Copyright 2010-2016 Mike Bostock
Copyright 2001 Robert Penner
All rights reserved.

Adapted from https://github.com/d3/d3-ease

License: https://github.com/d3/d3-ease/blob/master/LICENSE
*/

export const quadInOut = t => ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2

export const cubicInOut = t =>
  ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2

export const sinInOut = t => (1 - Math.cos(Math.PI * t)) / 2
