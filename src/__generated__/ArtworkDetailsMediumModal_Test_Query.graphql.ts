/**
 * @generated SignedSource<<123d5d7b459f1f9b9ace6e6d3df19298>>
 * @relayHash 0fd66eaa028a2588bcc93afabfdf956e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0fd66eaa028a2588bcc93afabfdf956e

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsMediumModal_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkDetailsMediumModal_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsMediumModal_artwork">;
  } | null | undefined;
};
export type ArtworkDetailsMediumModal_Test_Query = {
  response: ArtworkDetailsMediumModal_Test_Query$data;
  variables: ArtworkDetailsMediumModal_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
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
    "name": "ArtworkDetailsMediumModal_Test_Query",
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
            "name": "ArtworkDetailsMediumModal_artwork"
          }
        ],
        "storageKey": "artwork(id:\"xxx\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkDetailsMediumModal_Test_Query",
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
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
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
                "name": "longDescription",
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
        "storageKey": "artwork(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "id": "0fd66eaa028a2588bcc93afabfdf956e",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.longDescription": (v1/*: any*/),
        "artwork.mediumType.name": (v1/*: any*/)
      }
    },
    "name": "ArtworkDetailsMediumModal_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "43f502d0f85ba901ddd85297e7eba546";

export default node;
