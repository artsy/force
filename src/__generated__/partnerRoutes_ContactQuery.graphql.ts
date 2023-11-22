/**
 * @generated SignedSource<<12ab1397bc53738013d7b0511beb1d05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_ContactQuery$variables = {
  partnerId: string;
};
export type partnerRoutes_ContactQuery$data = {
  readonly partner: {
    readonly locations: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Contact_partner">;
  } | null | undefined;
};
export type partnerRoutes_ContactQuery = {
  response: partnerRoutes_ContactQuery$data;
  variables: partnerRoutes_ContactQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = {
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
    "name": "partnerRoutes_ContactQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Contact_partner"
          },
          {
            "alias": "locations",
            "args": (v2/*: any*/),
            "concreteType": "LocationConnection",
            "kind": "LinkedField",
            "name": "locationsConnection",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": "locationsConnection(first:50)"
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
    "name": "partnerRoutes_ContactQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": "locations",
            "args": (v2/*: any*/),
            "concreteType": "LocationConnection",
            "kind": "LinkedField",
            "name": "locationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "phone",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "state",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "address",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "address2",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "postalCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayCountry",
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
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": "locationsConnection(first:50)"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9ef697742750b9ae6ea211850241fe3f",
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_ContactQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_ContactQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...Contact_partner\n    locations: locationsConnection(first: 50) {\n      totalCount\n    }\n    id\n  }\n}\n\nfragment Contact_partner on Partner {\n  locations: locationsConnection(first: 50) {\n    edges {\n      ...PartnerContacts_edges\n    }\n  }\n}\n\nfragment PartnerContactAddress_location on Location {\n  city\n  phone\n  state\n  address\n  address2\n  postalCode\n  displayCountry\n}\n\nfragment PartnerContactCard_location on Location {\n  ...PartnerContactAddress_location\n  ...PartnerContactMap_location\n}\n\nfragment PartnerContactMap_location on Location {\n  city\n  phone\n  state\n  address\n  address2\n  postalCode\n  displayCountry\n  coordinates {\n    lat\n    lng\n  }\n}\n\nfragment PartnerContacts_edges on LocationEdge {\n  node {\n    id\n    ...PartnerContactCard_location\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ddff1c5f84afd16f5e95ca1fa07a10b";

export default node;
