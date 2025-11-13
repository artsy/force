export type ExtractProps<
  T extends React.ComponentType<React.PropsWithChildren<any>>,
> = T extends React.ComponentType<React.PropsWithChildren<infer Props>>
  ? Props
  : never
