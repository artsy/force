/**
 * @generated SignedSource<<230bd2a37d915708bbcaae5a3d7ef53e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedAddressesOutsiseCollectorProfile_Test_Query$variables = {};
export type SavedAddressesOutsiseCollectorProfile_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedAddresses_me">;
  } | null;
};
export type SavedAddressesOutsiseCollectorProfile_Test_Query = {
  variables: SavedAddressesOutsiseCollectorProfile_Test_Query$variables;
  response: SavedAddressesOutsiseCollectorProfile_Test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  }
],
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedAddressesOutsiseCollectorProfile_Test_Query",
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
            "name": "SavedAddresses_me"
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
    "name": "SavedAddressesOutsiseCollectorProfile_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UserAddressConnection",
            "kind": "LinkedField",
            "name": "addressConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserAddressEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserAddress",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
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
                        "name": "addressLine1",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine2",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine3",
                        "storageKey": null
                      },
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
                        "name": "country",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDefault",
                        "storageKey": null
                      },
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
                        "name": "phoneNumber",
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
                        "name": "region",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "addressConnection(first:30)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "SavedAddresses_addressConnection",
            "kind": "LinkedHandle",
            "name": "addressConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "09089688fbddc94fd0800df440867763",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.addressConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddressConnection"
        },
        "me.addressConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "UserAddressEdge"
        },
        "me.addressConnection.edges.cursor": (v2/*: any*/),
        "me.addressConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddress"
        },
        "me.addressConnection.edges.node.__typename": (v2/*: any*/),
        "me.addressConnection.edges.node.addressLine1": (v2/*: any*/),
        "me.addressConnection.edges.node.addressLine2": (v3/*: any*/),
        "me.addressConnection.edges.node.addressLine3": (v3/*: any*/),
        "me.addressConnection.edges.node.city": (v2/*: any*/),
        "me.addressConnection.edges.node.country": (v2/*: any*/),
        "me.addressConnection.edges.node.id": (v4/*: any*/),
        "me.addressConnection.edges.node.internalID": (v4/*: any*/),
        "me.addressConnection.edges.node.isDefault": (v5/*: any*/),
        "me.addressConnection.edges.node.name": (v3/*: any*/),
        "me.addressConnection.edges.node.phoneNumber": (v3/*: any*/),
        "me.addressConnection.edges.node.postalCode": (v3/*: any*/),
        "me.addressConnection.edges.node.region": (v3/*: any*/),
        "me.addressConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.addressConnection.pageInfo.endCursor": (v3/*: any*/),
        "me.addressConnection.pageInfo.hasNextPage": (v5/*: any*/),
        "me.addressConnection.pageInfo.hasPreviousPage": (v5/*: any*/),
        "me.addressConnection.pageInfo.startCursor": (v3/*: any*/),
        "me.addressConnection.totalCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "me.id": (v4/*: any*/)
      }
    },
    "name": "SavedAddressesOutsiseCollectorProfile_Test_Query",
    "operationKind": "query",
    "text": "query SavedAddressesOutsiseCollectorProfile_Test_Query {\n  me {\n    ...SavedAddresses_me\n    id\n  }\n}\n\nfragment SavedAddresses_me on Me {\n  id\n  addressConnection(first: 30) {\n    totalCount\n    edges {\n      node {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7369235d68859fb2e33ed9c8488c9f1b";

export default node;
