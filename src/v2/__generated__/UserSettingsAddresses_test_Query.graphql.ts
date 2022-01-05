/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsAddresses_test_QueryVariables = {};
export type UserSettingsAddresses_test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserSettingsAddresses_me">;
    } | null;
};
export type UserSettingsAddresses_test_Query = {
    readonly response: UserSettingsAddresses_test_QueryResponse;
    readonly variables: UserSettingsAddresses_test_QueryVariables;
};



/*
query UserSettingsAddresses_test_Query {
  me {
    ...UserSettingsAddresses_me
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

fragment UserSettingsAddresses_me on Me {
  id
  internalID
  ...SavedAddresses_me
  addresses: addressConnection {
    totalCount
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v5 = {
  "type": "UserAddressConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v8 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
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
    "name": "UserSettingsAddresses_test_Query",
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
            "name": "UserSettingsAddresses_me"
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
    "name": "UserSettingsAddresses_test_Query",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "UserAddressConnection",
            "kind": "LinkedField",
            "name": "addressConnection",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
                      (v1/*: any*/),
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
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "SavedAddresses_addressConnection",
            "kind": "LinkedHandle",
            "name": "addressConnection"
          },
          {
            "alias": "addresses",
            "args": null,
            "concreteType": "UserAddressConnection",
            "kind": "LinkedField",
            "name": "addressConnection",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
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
        "me.id": (v4/*: any*/),
        "me.internalID": (v4/*: any*/),
        "me.addresses": (v5/*: any*/),
        "me.addressConnection": (v5/*: any*/),
        "me.addresses.totalCount": (v6/*: any*/),
        "me.addressConnection.totalCount": (v6/*: any*/),
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
        "me.addressConnection.edges.node.internalID": (v4/*: any*/),
        "me.addressConnection.edges.node.addressLine1": (v7/*: any*/),
        "me.addressConnection.edges.node.addressLine2": (v8/*: any*/),
        "me.addressConnection.edges.node.addressLine3": (v8/*: any*/),
        "me.addressConnection.edges.node.city": (v7/*: any*/),
        "me.addressConnection.edges.node.country": (v7/*: any*/),
        "me.addressConnection.edges.node.isDefault": (v9/*: any*/),
        "me.addressConnection.edges.node.name": (v8/*: any*/),
        "me.addressConnection.edges.node.phoneNumber": (v8/*: any*/),
        "me.addressConnection.edges.node.postalCode": (v8/*: any*/),
        "me.addressConnection.edges.node.region": (v8/*: any*/),
        "me.addressConnection.edges.cursor": (v7/*: any*/),
        "me.addressConnection.pageInfo.endCursor": (v8/*: any*/),
        "me.addressConnection.pageInfo.hasNextPage": (v9/*: any*/),
        "me.addressConnection.pageInfo.hasPreviousPage": (v9/*: any*/),
        "me.addressConnection.pageInfo.startCursor": (v8/*: any*/),
        "me.addressConnection.edges.node.__typename": (v7/*: any*/)
      }
    },
    "name": "UserSettingsAddresses_test_Query",
    "operationKind": "query",
    "text": "query UserSettingsAddresses_test_Query {\n  me {\n    ...UserSettingsAddresses_me\n    id\n  }\n}\n\nfragment SavedAddresses_me on Me {\n  id\n  addressConnection(first: 30) {\n    totalCount\n    edges {\n      node {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment UserSettingsAddresses_me on Me {\n  id\n  internalID\n  ...SavedAddresses_me\n  addresses: addressConnection {\n    totalCount\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ae062e29dc73da92b72346949afba66b';
export default node;
