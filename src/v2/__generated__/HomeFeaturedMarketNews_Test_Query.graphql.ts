/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedMarketNews_Test_QueryVariables = {};
export type HomeFeaturedMarketNews_Test_QueryResponse = {
    readonly articles: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedMarketNews_articles">;
    }>;
};
export type HomeFeaturedMarketNews_Test_Query = {
    readonly response: HomeFeaturedMarketNews_Test_QueryResponse;
    readonly variables: HomeFeaturedMarketNews_Test_QueryVariables;
};



/*
query HomeFeaturedMarketNews_Test_Query {
  articles {
    ...HomeFeaturedMarketNews_articles
    id
  }
}

fragment HomeFeaturedMarketNews_articles on Article {
  internalID
  href
  byline
  slug
  title
  publishedAt(format: "MMM D YYYY")
  vertical
  thumbnailTitle
  thumbnailImage {
    large: cropped(width: 670, height: 720) {
      width
      height
      src
      srcSet
    }
    small: cropped(width: 325, height: 240) {
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
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeaturedMarketNews_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
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
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedMarketNews_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
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
            "name": "byline",
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
            "kind": "ScalarField",
            "name": "vertical",
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
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "thumbnailImage",
            "plural": false,
            "selections": [
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
                "selections": (v0/*: any*/),
                "storageKey": "cropped(height:720,width:670)"
              },
              {
                "alias": "small",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 240
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
                "selections": (v0/*: any*/),
                "storageKey": "cropped(height:240,width:325)"
              }
            ],
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "981cd1efae80e73412f85643c6844058",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "articles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "articles.byline": (v1/*: any*/),
        "articles.href": (v1/*: any*/),
        "articles.id": (v2/*: any*/),
        "articles.internalID": (v2/*: any*/),
        "articles.publishedAt": (v1/*: any*/),
        "articles.slug": (v1/*: any*/),
        "articles.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "articles.thumbnailImage.large": (v3/*: any*/),
        "articles.thumbnailImage.large.height": (v4/*: any*/),
        "articles.thumbnailImage.large.src": (v5/*: any*/),
        "articles.thumbnailImage.large.srcSet": (v5/*: any*/),
        "articles.thumbnailImage.large.width": (v4/*: any*/),
        "articles.thumbnailImage.small": (v3/*: any*/),
        "articles.thumbnailImage.small.height": (v4/*: any*/),
        "articles.thumbnailImage.small.src": (v5/*: any*/),
        "articles.thumbnailImage.small.srcSet": (v5/*: any*/),
        "articles.thumbnailImage.small.width": (v4/*: any*/),
        "articles.thumbnailTitle": (v1/*: any*/),
        "articles.title": (v1/*: any*/),
        "articles.vertical": (v1/*: any*/)
      }
    },
    "name": "HomeFeaturedMarketNews_Test_Query",
    "operationKind": "query",
    "text": "query HomeFeaturedMarketNews_Test_Query {\n  articles {\n    ...HomeFeaturedMarketNews_articles\n    id\n  }\n}\n\nfragment HomeFeaturedMarketNews_articles on Article {\n  internalID\n  href\n  byline\n  slug\n  title\n  publishedAt(format: \"MMM D YYYY\")\n  vertical\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 325, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4eb01c1267af550f1e7fc29c9bba7b8e';
export default node;
