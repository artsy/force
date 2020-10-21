## Adding a new App to Force

> Revised 5/27/2020

To add a new app to force we can leverage our React-based SSR router.

- Create a new folder in [the apps directory](https://github.com/artsy/force/tree/master/src/v2/Apps) `v2/Apps/MyAppName`
- Create a new `routes.tsx` file
- Add some routes:

```tsx
// routes.tsx
export const routes = [
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

- Then add your routes to the [main route list](https://github.com/artsy/force/blob/master/src/v2/Apps/getAppRoutes.tsx):

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

### Advanced Setup

For most apps we don't need more than the above to get a new route and SSR rendering out of the box. However, sometimes we need additional server-side functionality, be it redirects or something else that interacts directly with the request / response cycle. For that, we can leverage express.js middleware.

Extending the example above, lets add a server-side redirect if the user isn't logged in:

- Create a new folder that matches the above name in our [artsy-v2](https://github.com/artsy/force/tree/master/src/desktop/apps/artsy-v2) folder -- `apps/artsy-v2/apps/myNewAppName`
- Create a file called `myNewAppNameMiddleware.tsx`
- Add the following:

```tsx
export function myNewAppNameMiddleware(req, res, next) {
  const { pageType, pageParts } = getContextPageFromReq(req)

  if (pageType === "myNewApp") {
    if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }
}
```

- Then finally, add your middleware to [`apps/artsy-v2/apps/server.tsx`](https://github.com/artsy/force/blob/master/src/desktop/apps/artsy-v2/server.tsx)
- The same principle applies to client-side functionality. (Dig around [`artsy-v2/apps`](https://github.com/artsy/force/tree/master/src/desktop/apps/artsy-v2/apps) for a few examples.)

This pattern is still evolving, but thats the gist. Middleware can be mounted in the same way that express subapps are mounted, so its just a matter of checking whether we're currently at a certain route and performing an action.
