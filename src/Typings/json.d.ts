declare module "package.json" {
  const version: string
}

declare module "*.json" {
  const value: any
  export default value
}
