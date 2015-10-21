# Finding UTM parameters

UTM params are used for tracking the sources of web traffic -- figuring out whether users came to the site via search, Facebook, ads, etc. They're the terms that come after a '?' at the end of a URL: www.example.com/**?utm_source=facebook&utm_medium=social&utm_campaign=art-basel**
 
For aesthetic reasons, Force uses [a script](https://github.com/artsy/force/blob/master/components/main_layout/templates/scripts.jade#L23) to strip off UTM params after a page loads and the tracking has been registered by Google Analytics and Segment. If you've created a link with UTM params and want to ensure that they're loading, you can do so by opening your developer tools in Chrome (command + option + I) and looking under the 'Network' tab.

![](images/find_utms.png)

Artsy has [a custom URL shortner](https://github.com/artsy/vanity), similar to [bit.ly](bit.ly), that can be used to generate shortened URLs with hidden UTM params. More information on UTM params [available here](https://support.google.com/analytics/answer/1033867?hl=en).
