/** Remove the special relay properties from an interface */
export type DeFraged<T> = Omit<T, " $refType" | " $fragmentRefs">

/** Utility Types (credit: https://github.com/krzkaczor/ts-essentials) */

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null

/** Like Partial but recursive
 * https://github.com/krzkaczor/ts-essentials/blob/25fe670e54451420b5087cd9ce26c26935022864/lib/types.ts
 */
// tslint:disable
export type DeepPartial<T> = T extends Primitive
  ? T
  : T extends Function
  ? T
  : T extends Date
  ? T
  : T extends Map<infer K, infer V>
  ? DeepPartialMap<K, V>
  : T extends Set<infer U>
  ? DeepPartialSet<U>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
interface DeepPartialSet<ItemType> extends Set<DeepPartial<ItemType>> {}
interface DeepPartialMap<KeyType, ValueType>
  extends Map<DeepPartial<KeyType>, DeepPartial<ValueType>> {}
// tslint:enable

export type Writable<T> = { -readonly [P in keyof T]: T[P] }
