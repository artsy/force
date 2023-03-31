/**
 * @generated SignedSource<<4740e306760bebf9986b1e594b37e6b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type articleRoutes_Article2Query$variables = {
  id: string;
};
export type articleRoutes_Article2Query$data = {
  readonly contentfulArticle: {
    readonly " $fragmentSpreads": FragmentRefs<"Article2App_article">;
  } | null;
};
export type articleRoutes_Article2Query = {
  response: articleRoutes_Article2Query$data;
  variables: articleRoutes_Article2Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "articleRoutes_Article2Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContentfulArticle",
        "kind": "LinkedField",
        "name": "contentfulArticle",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Article2App_article"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "articleRoutes_Article2Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContentfulArticle",
        "kind": "LinkedField",
        "name": "contentfulArticle",
        "plural": false,
        "selections": [
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
            "concreteType": "Author",
            "kind": "LinkedField",
            "name": "authors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sections",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8e9c90b1121db081faabcd7e6c3f99fa",
    "id": null,
    "metadata": {},
    "name": "articleRoutes_Article2Query",
    "operationKind": "query",
    "text": "query articleRoutes_Article2Query(\n  $id: String!\n) {\n  contentfulArticle(id: $id) @principalField {\n    ...Article2App_article\n    id\n  }\n}\n\nfragment Article2App_article on ContentfulArticle {\n  title\n  authors {\n    name\n    initials\n    id\n  }\n  sections\n}\n"
  }
};
})();

(node as any).hash = "bce4d9bebeba80a8ce0112ce183c140b";

export default node;
