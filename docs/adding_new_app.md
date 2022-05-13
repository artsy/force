## Adding a new App to Force

> Revised 3/30/2021

To add a new app to force we can leverage our React-based SSR router.

- Create a new folder in [the apps directory](https://github.com/artsy/force/tree/main/src/v2/Apps) `v2/Apps/MyAppName`
- Create a new `routes.tsx` file
- Add some routes:

```tsx
// routes.tsx
export const routes: AppRouteConfig[] = [
  {
    path: "/new-app",
    Component: props => {
      return (
        <div>
          <h1>Hello new app!</h1>
          <nav>
            <RouterLink to='/new-app/artworks'> - Navigate to Artworks</RouterLink>
            <RouterLink to='/new-app/artists'> - Navigate to Artists</RouterLink>
          <nav>
          <div>{props.children}</div>
        </div>
      )
    },
    children: [
      {
        path: "artworks",
        Component: () => <div>Artworks list...</div>
      },
            {
        path: "artists",
        Component: () => <div>Artists list...</div>
      }
    ]
  }
]
```

- Then add your routes to the [main route list](https://github.com/artsy/force/blob/main/src/v2/routes.tsx):

```tsx
import { routes as myNewAppRoutes } from "v2/Apps/MyNewApp/routes"

export function getAppRoutes() {
  return buildAppRoutes([
    {
      routes: myNewAppRoutes,
    },
  ])
}
```

- Done! Now, when you visit `http://localhost:5000/new-app` you should see your newly created content above.
- An example app is available to view and use as a starting point in [Example App](https://github.com/artsy/force/tree/main/src/v2/Apps/Example)

### Advanced Setup

For most apps we don't need more than the above to get a new route and SSR rendering out of the box. However, sometimes we need additional server-side functionality, be it redirects or something else that interacts directly with the request / response cycle. For that, we can leverage express.js middleware.

Extending the example above, lets add a server-side redirect if the user isn't logged in:

- Create a co-located `/Server` folder -- `v2/Apps/MyNewApp/Server`
- Create a file inside of it called `myNewAppRedirect.tsx`
- Add the following to our new file:

```tsx
export function myNewAppRedirect({ req, res, next }) {
  if (!res.locals.sd.CURRENT_USER) {
    return res.redirect(
      `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
    )
  }
}
```

- Then update the route:

```tsx
const routes = [
  {
    path: '/foo',
    Component: () => <div>hello how are you?</div>
    onServerSideRender: myNewAppRedirect
  }
]
```

Similar to the above, there's also a client-side hook that one can execute:

```tsx
const routes = [
  {
    path: '/foo',
    Component: () => <div>hello how are you?</div>
    onClientSideRender: () => console.log('hey there!')
  }
]
```
