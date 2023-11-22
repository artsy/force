/**
 * @generated SignedSource<<11ec2f82944846223ea19b628e134f21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReportTestQuery$variables = Record<PropertyKey, never>;
export type RequestConditionReportTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"RequestConditionReport_artwork">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"RequestConditionReport_me">;
  } | null | undefined;
};
export type RequestConditionReportTestQuery$rawResponse = {
  readonly artwork: {
    readonly id: string;
    readonly internalID: string;
    readonly saleArtwork: {
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly slug: string;
  } | null | undefined;
  readonly me: {
    readonly email: string | null | undefined;
    readonly id: string;
    readonly internalID: string;
  } | null | undefined;
};
export type RequestConditionReportTestQuery = {
  rawResponse: RequestConditionReportTestQuery$rawResponse;
  response: RequestConditionReportTestQuery$data;
  variables: RequestConditionReportTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RequestConditionReportTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RequestConditionReport_me"
          }
        ],
        "storageKey": null
      },
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
            "name": "RequestConditionReport_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RequestConditionReportTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "96e5136e1d518b2c9a0724fd52938694",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v3/*: any*/),
        "artwork.internalID": (v3/*: any*/),
        "artwork.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.saleArtwork.id": (v3/*: any*/),
        "artwork.saleArtwork.internalID": (v3/*: any*/),
        "artwork.slug": (v3/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.email": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "me.id": (v3/*: any*/),
        "me.internalID": (v3/*: any*/)
      }
    },
    "name": "RequestConditionReportTestQuery",
    "operationKind": "query",
    "text": "query RequestConditionReportTestQuery {\n  me {\n    ...RequestConditionReport_me\n    id\n  }\n  artwork(id: \"artwork-id\") {\n    ...RequestConditionReport_artwork\n    id\n  }\n}\n\nfragment RequestConditionReport_artwork on Artwork {\n  internalID\n  slug\n  saleArtwork {\n    internalID\n    id\n  }\n}\n\nfragment RequestConditionReport_me on Me {\n  email\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "a6701f9936f2335fa977525c2765d155";

export default node;
