export type CleanRelayFragment<T> = Omit<
  T,
  "$refType" | " $fragmentRefs" | " $fragmentSpreads" | " $fragmentType"
>
