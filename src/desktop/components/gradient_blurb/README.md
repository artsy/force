# Component used for revealing masked content via button

#### With default gradient
![screen shot 2017-03-03 at 11 45 13 am](https://cloud.githubusercontent.com/assets/236943/23566490/f1abc008-0006-11e7-8d8e-201b3fceb7f1.png)

#### With custom button
![screen shot 2017-03-03 at 11 45 30 am](https://cloud.githubusercontent.com/assets/236943/23566518/0f2fd88a-0007-11e7-8800-7e131f55b86c.png)

### Example
```coffeescript
$contentToMask = $.find '.some-long-div'
gradient($contentToMask, limit: 175)
```

#### Note
This component is aliased by `components/reveal`. As a refactor, we should
relocate this into that folder and modify existing import paths. Technically,
this can reveal any kind of content, and the gradient is only added as a sensible
default.
