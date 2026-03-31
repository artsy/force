/**
 * @generated SignedSource<<104dc459f2dae1d9ea0f36a8b393fc21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleMetaTags_test_Query$variables = Record<PropertyKey, never>;
export type ArticleMetaTags_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleMetaTags_article">;
  } | null | undefined;
};
export type ArticleMetaTags_test_Query = {
  response: ArticleMetaTags_test_Query$data;
  variables: ArticleMetaTags_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleMetaTags_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArticleMetaTags_article"
          }
        ],
        "storageKey": "article(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArticleMetaTags_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
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
            "args": null,
            "kind": "ScalarField",
            "name": "keywords",
            "storageKey": null
          },
          {
            "alias": "metaPublishedAt",
            "args": null,
            "kind": "ScalarField",
            "name": "publishedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
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
            "name": "searchTitle",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "searchDescription",
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
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
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "6142456ff692102e31d3b514ec86ef5d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.byline": (v1/*: any*/),
        "article.description": (v1/*: any*/),
        "article.href": (v1/*: any*/),
        "article.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "article.keywords": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "article.metaPublishedAt": (v1/*: any*/),
        "article.searchDescription": (v1/*: any*/),
        "article.searchTitle": (v1/*: any*/),
        "article.thumbnailImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.thumbnailImage.url": (v1/*: any*/),
        "article.title": (v1/*: any*/),
        "article.updatedAt": (v1/*: any*/)
      }
    },
    "name": "ArticleMetaTags_test_Query",
    "operationKind": "query",
    "text": "query ArticleMetaTags_test_Query {\n  article(id: \"example\") {\n    ...ArticleMetaTags_article\n    id\n  }\n}\n\nfragment ArticleMetaTags_article on Article {\n  byline\n  href\n  keywords\n  metaPublishedAt: publishedAt\n  updatedAt\n  title\n  searchTitle\n  description\n  searchDescription\n  thumbnailImage {\n    url\n  }\n}\n"
  }
};
})();

(node as any).hash = "7cfa72eeecc78ddaf81679b449067619";

export default node;
