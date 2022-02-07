import { FeatureFlagConfig, FeatureFlagProvider } from "./featureFlagProvider"

const registeredProviders = new Map<symbol, any>()

export async function createFlagProvider<T extends FeatureFlagConfig>(
  type: symbol,
  config?: T
): Promise<FeatureFlagProvider> {
  if (!registeredProviders.has(type)) {
    throw new Error(`The type provider ${type.toString()} is not registered.`)
  }

  const clz = registeredProviders.get(type)
  if (typeof clz !== undefined) {
    const flagProvider = config ? new clz!(...config) : new clz!()
    await flagProvider.init()
    return flagProvider
  } else {
    throw new Error("FeatureFlagProvider was defined as null")
  }
}

type ConstructorType<T> = Function & { prototype: T }

export function registerFlagProvider<T extends FeatureFlagProvider>(
  type: symbol,
  clz: ConstructorType<T>
) {
  registeredProviders.set(type, clz)
}
