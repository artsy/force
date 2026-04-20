/**
 * @generated SignedSource<<71c7f7dbb527c33ab7e666f48dac0d65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleTableOfContents_test_Query$variables = Record<PropertyKey, never>;
export type ArticleTableOfContents_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleTableOfContents_article">;
  } | null | undefined;
};
export type ArticleTableOfContents_test_Query = {
  response: ArticleTableOfContents_test_Query$data;
  variables: ArticleTableOfContents_test_Query$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
    "name": "ArticleTableOfContents_test_Query",
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
            "name": "ArticleTableOfContents_article"
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
    "name": "ArticleTableOfContents_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "concreteType": "ArticleOutlineEntry",
            "kind": "LinkedField",
            "name": "outline",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "heading",
                "storageKey": null
              },
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "3c470a64897bdb7402e774b882e3201a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.href": (v3/*: any*/),
        "article.id": (v4/*: any*/),
        "article.outline": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleOutlineEntry"
        },
        "article.outline.heading": (v5/*: any*/),
        "article.outline.id": (v4/*: any*/),
        "article.outline.slug": (v5/*: any*/),
        "article.slug": (v3/*: any*/)
      }
    },
    "name": "ArticleTableOfContents_test_Query",
    "operationKind": "query",
    "text": "query ArticleTableOfContents_test_Query {\n  article(id: \"example\") {\n    ...ArticleTableOfContents_article\n    id\n  }\n}\n\nfragment ArticleTableOfContents_article on Article {\n  slug\n  href\n  outline {\n    heading\n    slug\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee6536a5d8ed5bbb0b49058e39666652";

export default node;
