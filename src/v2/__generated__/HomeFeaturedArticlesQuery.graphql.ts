/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedArticlesQueryVariables = {};
export type HomeFeaturedArticlesQueryResponse = {
    readonly articles: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedArticles_articles">;
    } | null> | null;
};
export type HomeFeaturedArticlesQuery = {
    readonly response: HomeFeaturedArticlesQueryResponse;
    readonly variables: HomeFeaturedArticlesQueryVariables;
};



/*
query HomeFeaturedArticlesQuery {
  articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {
    ...HomeFeaturedArticles_articles
    id
  }
}

fragment HomeFeaturedArticles_articles on Article {
  internalID
  href
  title
  publishedAt(format: "MMM D YYYY")
  thumbnailImage {
    cropped(width: 325, height: 244) {
      src
      srcSet
    }
  }
  author {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "featured",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "published",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeaturedArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "articles",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeFeaturedArticles_articles"
          }
        ],
        "storageKey": "articles(featured:true,published:true,sort:\"PUBLISHED_AT_DESC\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedArticlesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "articles",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "publishedAt",
            "storageKey": "publishedAt(format:\"MMM D YYYY\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "thumbnailImage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 244
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 325
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:244,width:325)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Author",
            "kind": "LinkedField",
            "name": "author",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "articles(featured:true,published:true,sort:\"PUBLISHED_AT_DESC\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "HomeFeaturedArticlesQuery",
    "operationKind": "query",
    "text": "query HomeFeaturedArticlesQuery {\n  articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {\n    ...HomeFeaturedArticles_articles\n    id\n  }\n}\n\nfragment HomeFeaturedArticles_articles on Article {\n  internalID\n  href\n  title\n  publishedAt(format: \"MMM D YYYY\")\n  thumbnailImage {\n    cropped(width: 325, height: 244) {\n      src\n      srcSet\n    }\n  }\n  author {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1f3bf55b1a5fc5c758b6fccefdabf628';
export default node;
