/**
 * @generated SignedSource<<07f1acb028c1cdc6efffbcd2e62864cf>>
 * @relayHash 8238d4f7c6342a9c4d44330498b7958d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8238d4f7c6342a9c4d44330498b7958d

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersLocationAutocomplete_Test_Query$variables = Record<PropertyKey, never>;
export type PartnersLocationAutocomplete_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnersLocationAutocomplete_viewer">;
  } | null | undefined;
};
export type PartnersLocationAutocomplete_Test_Query = {
  response: PartnersLocationAutocomplete_Test_Query$data;
  variables: PartnersLocationAutocomplete_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fullName",
    "storageKey": null
  },
  {
    "alias": "text",
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": "value",
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "LatLng",
    "kind": "LinkedField",
    "name": "coordinates",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lat",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lng",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "City"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "LatLng"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v4 = {
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
    "name": "PartnersLocationAutocomplete_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnersLocationAutocomplete_viewer"
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
    "name": "PartnersLocationAutocomplete_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "featuredCities",
            "args": [
              {
                "kind": "Literal",
                "name": "featured",
                "value": true
              }
            ],
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v0/*: any*/),
            "storageKey": "cities(featured:true)"
          },
          {
            "alias": "allCities",
            "args": null,
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8238d4f7c6342a9c4d44330498b7958d",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.allCities": (v1/*: any*/),
        "viewer.allCities.coordinates": (v2/*: any*/),
        "viewer.allCities.coordinates.lat": (v3/*: any*/),
        "viewer.allCities.coordinates.lng": (v3/*: any*/),
        "viewer.allCities.fullName": (v4/*: any*/),
        "viewer.allCities.text": (v4/*: any*/),
        "viewer.allCities.value": (v4/*: any*/),
        "viewer.featuredCities": (v1/*: any*/),
        "viewer.featuredCities.coordinates": (v2/*: any*/),
        "viewer.featuredCities.coordinates.lat": (v3/*: any*/),
        "viewer.featuredCities.coordinates.lng": (v3/*: any*/),
        "viewer.featuredCities.fullName": (v4/*: any*/),
        "viewer.featuredCities.text": (v4/*: any*/),
        "viewer.featuredCities.value": (v4/*: any*/)
      }
    },
    "name": "PartnersLocationAutocomplete_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "f2551224817da86f5f03c296130b63f3";

export default node;
