/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedMarketNewsQueryVariables = {};
export type HomeFeaturedMarketNewsQueryResponse = {
    readonly articles: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedMarketNews_articles">;
    }>;
};
export type HomeFeaturedMarketNewsQuery = {
    readonly response: HomeFeaturedMarketNewsQueryResponse;
    readonly variables: HomeFeaturedMarketNewsQueryVariables;
};



/*
query HomeFeaturedMarketNewsQuery {
  articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {
    ...HomeFeaturedMarketNews_articles
    id
  }
}

fragment CellArticle_article on Article {
  vertical
  title
  thumbnailTitle
  byline
  href
  publishedAt(format: "MMM D, YYYY")
  thumbnailImage {
    cropped(width: 445, height: 334) {
      width
      height
      src
      srcSet
    }
  }
}

fragment HomeFeaturedMarketNews_articles on Article {
  ...CellArticle_article
  internalID
  href
  byline
  slug
  title
  publishedAt(format: "MMM D, YYYY")
  vertical
  thumbnailTitle
  thumbnailImage {
    large: cropped(width: 670, height: 720) {
      width
      height
      src
      srcSet
    }
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
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  },
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeaturedMarketNewsQuery",
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
            "name": "HomeFeaturedMarketNews_articles"
          }
        ],
        "storageKey": "articles(featured:true,published:true,sort:\"PUBLISHED_AT_DESC\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedMarketNewsQuery",
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
            "name": "vertical",
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
            "args": null,
            "kind": "ScalarField",
            "name": "thumbnailTitle",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "byline",
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
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D, YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "publishedAt",
            "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
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
                    "value": 334
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 445
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": "cropped(height:334,width:445)"
              },
              {
                "alias": "large",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 720
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 670
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": "cropped(height:720,width:670)"
              }
            ],
            "storageKey": null
          },
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "articles(featured:true,published:true,sort:\"PUBLISHED_AT_DESC\")"
      }
    ]
  },
  "params": {
    "cacheID": "f1cb1212c24b08e83f034ba23864b2b5",
    "id": null,
    "metadata": {},
    "name": "HomeFeaturedMarketNewsQuery",
    "operationKind": "query",
    "text": "query HomeFeaturedMarketNewsQuery {\n  articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {\n    ...HomeFeaturedMarketNews_articles\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment HomeFeaturedMarketNews_articles on Article {\n  ...CellArticle_article\n  internalID\n  href\n  byline\n  slug\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  vertical\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '484565658b47f40dd52c68e8e8dabde1';
export default node;
