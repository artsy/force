/**
 * @generated SignedSource<<7cce012903b0115b3b2f5f3ecfe8ea20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedMarketNews_Test_Query$variables = Record<PropertyKey, never>;
export type HomeFeaturedMarketNews_Test_Query$data = {
  readonly articles: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedMarketNews_articles">;
  }>;
};
export type HomeFeaturedMarketNews_Test_Query = {
  response: HomeFeaturedMarketNews_Test_Query$data;
  variables: HomeFeaturedMarketNews_Test_Query$variables;
};

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
                "selections": (v0/*: any*/),
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
                "selections": (v0/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1518537bf7ae7fa9f7c8a4f657b1fb81",
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
        "articles.thumbnailImage.cropped": (v3/*: any*/),
        "articles.thumbnailImage.cropped.height": (v4/*: any*/),
        "articles.thumbnailImage.cropped.src": (v5/*: any*/),
        "articles.thumbnailImage.cropped.srcSet": (v5/*: any*/),
        "articles.thumbnailImage.cropped.width": (v4/*: any*/),
        "articles.thumbnailImage.large": (v3/*: any*/),
        "articles.thumbnailImage.large.height": (v4/*: any*/),
        "articles.thumbnailImage.large.src": (v5/*: any*/),
        "articles.thumbnailImage.large.srcSet": (v5/*: any*/),
        "articles.thumbnailImage.large.width": (v4/*: any*/),
        "articles.thumbnailTitle": (v1/*: any*/),
        "articles.title": (v1/*: any*/),
        "articles.vertical": (v1/*: any*/)
      }
    },
    "name": "HomeFeaturedMarketNews_Test_Query",
    "operationKind": "query",
    "text": "query HomeFeaturedMarketNews_Test_Query {\n  articles {\n    ...HomeFeaturedMarketNews_articles\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment HomeFeaturedMarketNews_articles on Article {\n  ...CellArticle_article\n  internalID\n  href\n  byline\n  slug\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  vertical\n  thumbnailTitle\n  thumbnailImage {\n    large: cropped(width: 670, height: 720) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4eb01c1267af550f1e7fc29c9bba7b8e";

export default node;
