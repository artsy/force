/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedAddressesOutsiseCollectorProfile_Test_QueryVariables = {};
export type SavedAddressesOutsiseCollectorProfile_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SavedAddresses_me">;
    } | null;
};
export type SavedAddressesOutsiseCollectorProfile_Test_Query = {
    readonly response: SavedAddressesOutsiseCollectorProfile_Test_QueryResponse;
    readonly variables: SavedAddressesOutsiseCollectorProfile_Test_QueryVariables;
};



/*
query SavedAddressesOutsiseCollectorProfile_Test_Query {
  me {
    ...SavedAddresses_me
    id
  }
}

fragment SavedAddresses_me on Me {
  id
  addressConnection(first: 30) {
    totalCount
    edges {
      node {
        id
        internalID
        addressLine1
        addressLine2
        addressLine3
        city
        country
        isDefault
        name
        phoneNumber
        postalCode
        region
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
*/

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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v2/*: any*/),
        "me.addressConnection": {
          "type": "UserAddressConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.addressConnection.totalCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.addressConnection.edges": {
          "type": "UserAddressEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.addressConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.addressConnection.edges.node": {
          "type": "UserAddress",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.addressConnection.edges.node.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.addressConnection.edges.node.internalID": (v2/*: any*/),
        "me.addressConnection.edges.node.addressLine1": (v3/*: any*/),
        "me.addressConnection.edges.node.addressLine2": (v4/*: any*/),
        "me.addressConnection.edges.node.addressLine3": (v4/*: any*/),
        "me.addressConnection.edges.node.city": (v3/*: any*/),
        "me.addressConnection.edges.node.country": (v3/*: any*/),
        "me.addressConnection.edges.node.isDefault": (v5/*: any*/),
        "me.addressConnection.edges.node.name": (v4/*: any*/),
        "me.addressConnection.edges.node.phoneNumber": (v4/*: any*/),
        "me.addressConnection.edges.node.postalCode": (v4/*: any*/),
        "me.addressConnection.edges.node.region": (v4/*: any*/),
        "me.addressConnection.edges.cursor": (v3/*: any*/),
        "me.addressConnection.pageInfo.endCursor": (v4/*: any*/),
        "me.addressConnection.pageInfo.hasNextPage": (v5/*: any*/),
        "me.addressConnection.pageInfo.hasPreviousPage": (v5/*: any*/),
        "me.addressConnection.pageInfo.startCursor": (v4/*: any*/),
        "me.addressConnection.edges.node.__typename": (v3/*: any*/)
      }
    },
    "name": "SavedAddressesOutsiseCollectorProfile_Test_Query",
    "operationKind": "query",
    "text": "query SavedAddressesOutsiseCollectorProfile_Test_Query {\n  me {\n    ...SavedAddresses_me\n    id\n  }\n}\n\nfragment SavedAddresses_me on Me {\n  id\n  addressConnection(first: 30) {\n    totalCount\n    edges {\n      node {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7369235d68859fb2e33ed9c8488c9f1b';
export default node;
