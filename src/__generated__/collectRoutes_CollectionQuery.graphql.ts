/**
 * @generated SignedSource<<7decebe18a81246743eef915d83eeafc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectRoutes_CollectionQuery$variables = {
  slug: string;
};
export type collectRoutes_CollectionQuery$data = {
  readonly collection: {
    readonly " $fragmentSpreads": FragmentRefs<"Collection_collection">;
  } | null | undefined;
};
export type collectRoutes_CollectionQuery = {
  response: collectRoutes_CollectionQuery$data;
  variables: collectRoutes_CollectionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "collectRoutes_CollectionQuery",
    "selections": [
      {
        "alias": "collection",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Collection_collection"
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
    "name": "collectRoutes_CollectionQuery",
    "selections": [
      {
        "alias": "collection",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": "description",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "markdownDescription",
            "storageKey": "markdownDescription(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
            "alias": "metaDescription",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "PLAIN"
              }
            ],
            "kind": "ScalarField",
            "name": "markdownDescription",
            "storageKey": "markdownDescription(format:\"PLAIN\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "headerImage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "showFeaturedArtists",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ba5f3b408393f1fe8869e50d1d1c3531",
    "id": null,
    "metadata": {},
    "name": "collectRoutes_CollectionQuery",
    "operationKind": "query",
    "text": "query collectRoutes_CollectionQuery(\n  $slug: String!\n) {\n  collection: marketingCollection(slug: $slug) @principalField {\n    ...Collection_collection\n    id\n  }\n}\n\nfragment Collection_collection on MarketingCollection {\n  ...Header_collection\n  metaDescription: markdownDescription(format: PLAIN)\n  headerImage\n  slug\n  title\n  showFeaturedArtists\n}\n\nfragment Header_collection on MarketingCollection {\n  category\n  description: markdownDescription(format: HTML)\n  id\n  slug\n  title\n}\n"
  }
};
})();

(node as any).hash = "2566b07fe046631802dc9efe1a2fd66f";

export default node;
