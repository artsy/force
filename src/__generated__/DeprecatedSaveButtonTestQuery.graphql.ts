/**
 * @generated SignedSource<<ee780c85ddd00d42888cba57368e1eb2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeprecatedSaveButtonTestQuery$variables = {};
export type DeprecatedSaveButtonTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"DeprecatedSaveButton_artwork">;
  } | null;
};
export type DeprecatedSaveButtonTestQuery = {
  response: DeprecatedSaveButtonTestQuery$data;
  variables: DeprecatedSaveButtonTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example-artwork-id"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeprecatedSaveButtonTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DeprecatedSaveButton_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example-artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DeprecatedSaveButtonTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
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
            "alias": "is_saved",
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"example-artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "6fcac4f64056538d81215e56048581b8",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v1/*: any*/),
        "artwork.internalID": (v1/*: any*/),
        "artwork.is_saved": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.slug": (v1/*: any*/),
        "artwork.title": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "DeprecatedSaveButtonTestQuery",
    "operationKind": "query",
    "text": "query DeprecatedSaveButtonTestQuery {\n  artwork(id: \"example-artwork-id\") {\n    ...DeprecatedSaveButton_artwork\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "aad83146eaf8ba415d9a6e42e723e4ac";

export default node;
