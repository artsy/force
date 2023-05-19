
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

/**
 * Returns a type with the properties of T that are not in U
 */
export type Only<T, U> = { [P in keyof T]: T[P] } & { [P in keyof U]?: never }

/**
 * Returns either the first or the second type
 */
export type Either<T, U> = Only<T, U> | Only<U, T>

/**
 * Returns a type containing only the fields of the fragment
 */
export type CleanRelayFragment<T> = Omit<
  T,
  "$refType" | " $fragmentRefs" | " $fragmentSpreads" | " $fragmentType"
>

export type RemoveIndex<T> = {
  [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P]
};

export type ExtractNodeType<T> = T extends { edges: any }
  ? NonNullable<
      NonNullable<NonNullable<NonNullable<T>["edges"]>[number]>["node"]
    >
  : never
