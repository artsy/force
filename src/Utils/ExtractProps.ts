export type ExtractProps<
  T extends React.ComponentType<any>
> = T extends React.ComponentType<infer Props> ? Props : never
