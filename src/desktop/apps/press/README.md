## Update fixtures with production data:

```
foreman run node_modules/.bin/coffee components/json_page/update.coffee in-the-media production ../../apps/press/test/fixtures/in_the_media.json

foreman run node_modules/.bin/coffee components/json_page/update.coffee press-releases production ../../apps/press/test/fixtures/press_releases.json
```

## Push fixtures to staging bucket

```
foreman run node_modules/.bin/coffee components/json_page/seed.coffee in-the-media staging ../../apps/press/test/fixtures/in_the_media.json

foreman run node_modules/.bin/coffee components/json_page/seed.coffee press-releases staging ../../apps/press/test/fixtures/press_releases.json
```
