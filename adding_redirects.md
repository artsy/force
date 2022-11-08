# Adding Redirects

The most basic redirects are handled by middleware here:

src/Server/middleware/hardcodedRedirects.ts

There are two JS objects where the key is the `from` and the value is the
`destination`. You can pick between 301 - Permanent and 302 - Temporary as the
situation calls for.

For more advanced cases see also:

src/Apps/Redirects
