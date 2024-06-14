# Troubleshooting Local Issues in Force

#### Related Links:

- [Force environment configuration](https://github.com/artsy/force/blob/main/docs/env_configuration.md)
- [Document hacks in Force](https://github.com/artsy/force/blob/main/HACKS.md)

Force is a large and complex project; in all likelihood, you'll encounter bugs
or configuration issues during regular local development.

### 401 Error Viewing Artwork

If you encounter a 401 error (see the log snippet below) when attempting to view
an individual artwork, while logged in, it is likely related to the weekly
staging data dump.

```
GET /artwork/fernando-botero-seated-woman-13 401 764.685 ms - -
Artsy/Router/Utils/RenderStatus | undefined

Artsy/Router/serverRouter.tsx | HttpError { isFoundHttpError: true, status: 401, data: undefined }

HttpError { isFoundHttpError: true, status: 401, data: undefined }
undefined
```

Ending your session could solve the issue: Log out and see if the artwork is now
visible.
