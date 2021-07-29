import crypto from "crypto"
import NodeCache from "node-cache"
import util from "util"

const debugLog = util.debuglog("cache")

const DEFAULT_OPTIONS = {
  checkperiod: 120,
  maxKeys: 10000,
  stdTTL: 10 * 60,
  useClones: false,
}

export class MemoryCache {
  private cache: NodeCache

  constructor(
    opts: {
      maxKeys?: typeof DEFAULT_OPTIONS["maxKeys"]
      stdTTL?: typeof DEFAULT_OPTIONS["stdTTL"]
    } = {}
  ) {
    this.cache = new NodeCache({
      ...DEFAULT_OPTIONS,
      ...opts,
    })
  }

  get<T>(key: string): T | undefined {
    const hashKey = this.hashKey(key)
    return this.cache.get<T>(hashKey)
  }

  set<T>(key: string, data: T) {
    const hashKey = this.hashKey(key)
    this.cache.set<T>(hashKey, data)
  }

  has(key: string): boolean {
    const hashKey = this.hashKey(key)
    return this.cache.has(hashKey)
  }

  refresh(key: string) {
    const hashKey = this.hashKey(key)
    this.cache.ttl(hashKey)
  }

  private hashKey(key: string): string {
    const hash = crypto.createHash("sha256")
    hash.update(key)
    return hash.digest("hex")
  }

  logStats() {
    debugLog(this.cache.getStats().toString())
  }
}
