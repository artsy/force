# RelatedArticlesView

This component is used to render a series of articles related to a show. 

## Implementation

Include the stylesheet in your pages .styl file
````
@require './components/related_articles/index.styl'
````

Require in the backbone view and build the view by passing it a collection of articles and optionally a limit for initial display ( if there are more articles in the collection that this optional amount there will be a 'Show More Related Articles' button).

````

RelatedArticlesView = require '../components/related_articles/view.coffee'

relatedArticlesView = new RelatedArticlesView 
  collection: articles
  numToShow: 3

````

