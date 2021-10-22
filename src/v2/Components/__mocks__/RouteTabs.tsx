export const RouteTabs = props => {
  return <div>RouteTabs: {props.children}</div>
};

// This renders a `Link` from `found`
export const RouteTab = props => {
  return <a href={props.to}>{props.children}</a>
}
