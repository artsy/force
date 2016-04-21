# Article

The UI that makes up an article. Extracted because articles can be embedded in other pages like artist pages. 

![](https://s3.amazonaws.com/f.cl.ly/items/2b0I3Z043x443G2j3d0b/Image%202015-05-29%20at%2012.59.19%20PM.png)

## Example

Include the template passing in the `article` local

````jade
#article-container
  include ../components/article/templates/index.jade
````

Add the view on the client-side

````coffeescript
ArticleView = require '../components/article/client/view.coffee'

new ArticleView
  el: $('#article-container')
  article: new Article(sd.ARTICLE)
````