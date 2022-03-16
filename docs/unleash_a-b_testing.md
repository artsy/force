# A/B Testing with Unleash

## Creating a test

- Log into [Unleash](https://unleash.artsy.net)
- Press Create feature toggle
  - add a name, description and select the toggle type as "Experiment"
- Go to Variants Tab and add the variant names (e.g. "control" and "experiment").
- Go to Strategies Tab and pick your strategy, usually this will be Gradual Rollout for experiments.
- select a stickiness parameter (userId will make sure that a user will have the same experience every time they use the website)
- Go to Overview and enable it in development

Inside the component that you want to access the variants use the `useFeatureVariant` hook.

```diff
+   const variant = useFeatureVariant("my-awesome-experiment")

```

variant will be an object with this structure

```js
{
  name: "my-variant-name",
  enabled: true
}
```

### Adding tracking data and confirming that it is received

In the component that you added the experiment you just need to add the following:

```diff
+  const {
+    contextPageOwnerId,
+    contextPageOwnerSlug,
+    contextPageOwnerType,
+  } = useAnalyticsContext()

+  useTrackVariantView({
+    experimentName: "my-awesome-experiment",
+    variantName: variant?.name!,
+    contextOwnerId: contextPageOwnerId,
+    contextOwnerSlug: contextPageOwnerSlug,
+    contextOwnerType: contextPageOwnerType,
+    shouldTrackExperiment: true/false/condition
+  })
```

In [segment live debugger](https://app.segment.com/artsy-engineering/sources/force-staging/debugger) you can see a live stream of all the events on staging. You can use the searchbar to filter out `Experiment Viewed`, click on the one that is yours and review that everything is in order.

### Forcing a specific variant for a userId

When creating a variant in [Unleash](https://unleash.artsy.net) there is an optional `Add override` option where we can set a context field like `userId` to make sure that we will get the variant we want while QAing. [More info here](https://docs.getunleash.io/advanced/toggle_variants#what-are-variants)

### Useful links

[Setup an ab experiment in 3 simple steps](https://www.getunleash.io/blog/a-b-n-experiments-in-3-simple-steps)
