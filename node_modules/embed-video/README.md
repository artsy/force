# embed-video [![Build Status](http://img.shields.io/travis/alanshaw/embed-video.svg?style=flat)](https://travis-ci.org/alanshaw/embed-video) [![devDependency Status](https://david-dm.org/alanshaw/embed-video/dev-status.svg?style=flat)](https://david-dm.org/alanshaw/embed-video#info=devDependencies)

Get embed code for embedding youtube/vimeo/whatever video in websites from URL or ID.

Currently supports YouTube and Vimeo. Please pull request to add others!

[![browser support](https://ci.testling.com/alanshaw/embed-video.png)](https://ci.testling.com/alanshaw/embed-video)

## Usage

```js
var embed = require("embed-video")

var vimeoUrl = "http://vimeo.com/19339941"
var youtubeUrl = "https://www.youtube.com/watch?v=twE64AuqE9A"

console.log(embed(vimeoUrl))
console.log(embed(youtubeUrl))

var vimeoId = "6964150"
var youtubeId = "9XeNNqeHVDw"

console.log(embed.vimeo(vimeoId))
console.log(embed.youtube(youtubeId))
```

Output:

```html
<iframe src="//player.vimeo.com/video/19339941" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<iframe src="//www.youtube.com/embed/twE64AuqE9A" frameborder="0" allowfullscreen></iframe>
<iframe src="//player.vimeo.com/video/6964150" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<iframe src="//www.youtube.com/embed/9XeNNqeHVDw" frameborder="0" allowfullscreen></iframe>
```