const observerMap = new Map()
const instanceMap = new Map()

/**
 * Default geometry returned by {@link intersect} when a test doesn't override
 * it. Sized so the target fits inside the root (400 < 800) — i.e. the
 * "short rail" case — which is what most consumers want. Tests covering tall
 * rails (target taller than root) pass explicit overrides.
 */
const defaultBoundingRect = (): DOMRectReadOnly =>
  ({
    height: 400,
    width: 100,
    top: 0,
    left: 0,
    bottom: 400,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }) as DOMRectReadOnly

const defaultRootBounds = (): DOMRectReadOnly =>
  ({
    height: 800,
    width: 400,
    top: 0,
    left: 0,
    bottom: 800,
    right: 400,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }) as DOMRectReadOnly

beforeEach(() => {
  // @ts-ignore
  global.IntersectionObserver = jest.fn((cb, options = {}) => {
    const instance = {
      thresholds: Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold],
      root: options.root,
      rootMargin: options.rootMargin,
      observe: jest.fn((element: Element) => {
        instanceMap.set(element, instance)
        observerMap.set(element, cb)
      }),
      unobserve: jest.fn((element: Element) => {
        instanceMap.delete(element)
        observerMap.delete(element)
      }),
      disconnect: jest.fn(),
    }
    return instance
  })
})

afterEach(() => {
  // @ts-ignore
  global.IntersectionObserver.mockReset()
  instanceMap.clear()
  observerMap.clear()
})

/**
 * Subset of {@link IntersectionObserverEntry} that tests can override on a
 * per-call basis. We expose only the fields consumers of the mock actually
 * need to control (ratio + geometry); everything else is filled in with
 * sensible defaults.
 */
export type IntersectOverrides = Partial<
  Pick<
    IntersectionObserverEntry,
    "intersectionRatio" | "boundingClientRect" | "rootBounds"
  >
>

/**
 * Manually trigger the IntersectionObserver callback registered for `element`.
 *
 * - `isIntersecting` controls the boolean flag and, when no ratio override is
 *   given, also drives the default `intersectionRatio` (1 when entering,
 *   0 when leaving — matching real-browser behavior).
 * - `overrides` lets a test simulate partial visibility or specific
 *   target/root geometry (used by rail impression tests to cover the
 *   "tall section" branch where `targetHeight > rootHeight`).
 *
 * No-op when nothing is observing `element` — tests don't need to guard for
 * teardown order.
 */
export function intersect(
  element: Element,
  isIntersecting: boolean,
  overrides: IntersectOverrides = {},
) {
  const cb = observerMap.get(element)
  if (!cb) return

  const boundingClientRect =
    overrides.boundingClientRect ?? defaultBoundingRect()
  const rootBounds = overrides.rootBounds ?? defaultRootBounds()

  // `intersectionRatio` can be 0, so check for `undefined` explicitly rather
  // than using `??` — a test passing `intersectionRatio: 0` should win over
  // the `isIntersecting ? 1 : 0` default.
  const intersectionRatio =
    overrides.intersectionRatio !== undefined
      ? overrides.intersectionRatio
      : isIntersecting
        ? 1
        : 0

  cb([
    {
      isIntersecting,
      target: element,
      intersectionRatio,
      boundingClientRect,
      rootBounds,
      // Real entries report the *clipped* visible rect; tests don't currently
      // distinguish it from boundingClientRect, so reuse the same object.
      intersectionRect: boundingClientRect,
      time: 0,
    } as IntersectionObserverEntry,
  ])
}

export function getObserverOf(element: Element): IntersectionObserver {
  return instanceMap.get(element)
}
