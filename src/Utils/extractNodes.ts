export function extractNodes<Node extends object, T = Node>(
  connection:
    | {
        readonly edges?:
          | ReadonlyArray<
              | {
                  readonly node?: Node | null | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | undefined
    | null,
  mapper?: (node: Node) => T
): T[] {
  return (
    connection?.edges?.map(edge =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mapper ? (mapper(edge?.node!) as any) : edge?.node!
    ) ?? []
  )
}
