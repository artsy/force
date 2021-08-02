import { data } from "sharify"
import cookiejs from "cookies-js"

const IS_TEST_ENV =
  data.NODE_ENV !== "production" &&
  data.NODE_ENV !== "staging" &&
  data.NODE_ENV !== "development"

const TEST_STUB = ({
  get: () => {},
  set: () => {},
  expire: () => {},
} as unknown) as typeof cookiejs

export const get = IS_TEST_ENV ? TEST_STUB.get : cookiejs.get
export const set = IS_TEST_ENV ? TEST_STUB.set : cookiejs.set
export const expires = IS_TEST_ENV ? TEST_STUB.expire : cookiejs.expire

export default IS_TEST_ENV ? TEST_STUB : cookiejs
