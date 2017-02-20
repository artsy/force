## RelatedArticlesView
This component is used to render a series of articles related to a show.

### Implementation

Include the stylesheet in your pages .styl file

```
@import './components/related_articles/index.styl'
```

Require in the backbone view and build the view by passing it a related articles collection. If you sync
the model it will listen for the fetch to complete and then render the related articles component.

For instance, if you wanted to get the related articles from the show:

```
RelatedArticlesView = require '../components/related_articles/view.coffee'

relatedArticlesView = new RelatedArticlesView
  collection: show.related().articles
  numToShow: 3
  el: $ '#show-page-related-articles'
show.related().articles.fetch()
```
