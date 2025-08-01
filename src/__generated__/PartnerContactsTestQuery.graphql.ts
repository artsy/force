/**
 * @generated SignedSource<<0bc357e0c9b2165ee5b391dcd7d2ab0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerContactsTestQuery$variables = Record<PropertyKey, never>;
export type PartnerContactsTestQuery$data = {
  readonly partner: {
    readonly locations: {
      readonly edges: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"PartnerContacts_edges">;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type PartnerContactsTestQuery$rawResponse = {
  readonly partner: {
    readonly id: string;
    readonly locations: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly address: string | null | undefined;
          readonly address2: string | null | undefined;
          readonly city: string | null | undefined;
          readonly coordinates: {
            readonly lat: number | null | undefined;
            readonly lng: number | null | undefined;
          } | null | undefined;
          readonly displayCountry: string | null | undefined;
          readonly id: string;
          readonly phone: string | null | undefined;
          readonly postalCode: string | null | undefined;
          readonly state: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type PartnerContactsTestQuery = {
  rawResponse: PartnerContactsTestQuery$rawResponse;
  response: PartnerContactsTestQuery$data;
  variables: PartnerContactsTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
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
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerContactsTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": "locations",
            "args": (v1/*: any*/),
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PartnerContacts_edges"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:50)"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerContactsTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": "locations",
            "args": (v1/*: any*/),
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
                      (v2/*: any*/),
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
              }
            ],
            "storageKey": "locationsConnection(first:50)"
          },
          (v2/*: any*/)
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "cacheID": "cf6ba2a24201c326e4fe3856cf10ba08",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.id": (v3/*: any*/),
        "partner.locations": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "partner.locations.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "partner.locations.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "partner.locations.edges.node.address": (v4/*: any*/),
        "partner.locations.edges.node.address2": (v4/*: any*/),
        "partner.locations.edges.node.city": (v4/*: any*/),
        "partner.locations.edges.node.coordinates": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LatLng"
        },
        "partner.locations.edges.node.coordinates.lat": (v5/*: any*/),
        "partner.locations.edges.node.coordinates.lng": (v5/*: any*/),
        "partner.locations.edges.node.displayCountry": (v4/*: any*/),
        "partner.locations.edges.node.id": (v3/*: any*/),
        "partner.locations.edges.node.phone": (v4/*: any*/),
        "partner.locations.edges.node.postalCode": (v4/*: any*/),
        "partner.locations.edges.node.state": (v4/*: any*/)
      }
    },
    "name": "PartnerContactsTestQuery",
    "operationKind": "query",
    "text": "query PartnerContactsTestQuery {\n  partner(id: \"white-cube\") {\n    locations: locationsConnection(first: 50) {\n      edges {\n        ...PartnerContacts_edges\n      }\n    }\n    id\n  }\n}\n\nfragment PartnerContactAddress_location on Location {\n  city\n  phone\n  state\n  address\n  address2\n  postalCode\n  displayCountry\n}\n\nfragment PartnerContactCard_location on Location {\n  ...PartnerContactAddress_location\n  ...PartnerContactMap_location\n}\n\nfragment PartnerContactMap_location on Location {\n  city\n  phone\n  state\n  address\n  address2\n  postalCode\n  displayCountry\n  coordinates {\n    lat\n    lng\n  }\n}\n\nfragment PartnerContacts_edges on LocationEdge {\n  node {\n    id\n    ...PartnerContactCard_location\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ae247884eaef7655340f08eca4dbf74";

export default node;
