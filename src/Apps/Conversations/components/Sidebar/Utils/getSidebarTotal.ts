import { isServer } from "Utils/device"

export const SIDEBAR_FETCH_PAGE_SIZE = 10

export const getSidebarTotal = () => {
  if (isServer) {
    return SIDEBAR_FETCH_PAGE_SIZE
  }
  // TODO: This is a hack to get the current sidebar total, outside of normal
  // next.js query params flow. The reason: We can not silently push to the
  // url bar using next.router.push without triggering a fetch. So we use
  // history.pushState to trigger things silently, then pluck it out here.
  const searchParams = new URLSearchParams(window.location.search)
  const sidebarTotal =
    searchParams.get("sidebarTotal") ?? SIDEBAR_FETCH_PAGE_SIZE

  return sidebarTotal
}
