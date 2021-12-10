/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingApp_Test_QueryVariables = {};
export type ShippingApp_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ShippingApp_me">;
    } | null;
};
export type ShippingApp_Test_Query = {
    readonly response: ShippingApp_Test_QueryResponse;
    readonly variables: ShippingApp_Test_QueryVariables;
};



/*
query ShippingApp_Test_Query {
  me {
    ...ShippingApp_me
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

fragment ShippingApp_me on Me {
  name
  ...UserSettingsAddresses_me
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
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "UserAddressConnection"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShippingApp_Test_Query",
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
            "name": "ShippingApp_me"
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
    "name": "ShippingApp_Test_Query",
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "UserAddressConnection",
            "kind": "LinkedField",
            "name": "addressConnection",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                      (v1/*: any*/),
                      (v2/*: any*/),
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
                      (v0/*: any*/),
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
            "args": (v3/*: any*/),
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
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3896b2b2e0d5b3ba7c863d8dbe61c560",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.addressConnection": (v5/*: any*/),
        "me.addressConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "UserAddressEdge"
        },
        "me.addressConnection.edges.cursor": (v6/*: any*/),
        "me.addressConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddress"
        },
        "me.addressConnection.edges.node.__typename": (v6/*: any*/),
        "me.addressConnection.edges.node.addressLine1": (v6/*: any*/),
        "me.addressConnection.edges.node.addressLine2": (v7/*: any*/),
        "me.addressConnection.edges.node.addressLine3": (v7/*: any*/),
        "me.addressConnection.edges.node.city": (v6/*: any*/),
        "me.addressConnection.edges.node.country": (v6/*: any*/),
        "me.addressConnection.edges.node.id": (v8/*: any*/),
        "me.addressConnection.edges.node.internalID": (v8/*: any*/),
        "me.addressConnection.edges.node.isDefault": (v9/*: any*/),
        "me.addressConnection.edges.node.name": (v7/*: any*/),
        "me.addressConnection.edges.node.phoneNumber": (v7/*: any*/),
        "me.addressConnection.edges.node.postalCode": (v7/*: any*/),
        "me.addressConnection.edges.node.region": (v7/*: any*/),
        "me.addressConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.addressConnection.pageInfo.endCursor": (v7/*: any*/),
        "me.addressConnection.pageInfo.hasNextPage": (v9/*: any*/),
        "me.addressConnection.pageInfo.hasPreviousPage": (v9/*: any*/),
        "me.addressConnection.pageInfo.startCursor": (v7/*: any*/),
        "me.addressConnection.totalCount": (v10/*: any*/),
        "me.addresses": (v5/*: any*/),
        "me.addresses.totalCount": (v10/*: any*/),
        "me.id": (v8/*: any*/),
        "me.internalID": (v8/*: any*/),
        "me.name": (v7/*: any*/)
      }
    },
    "name": "ShippingApp_Test_Query",
    "operationKind": "query",
    "text": "query ShippingApp_Test_Query {\n  me {\n    ...ShippingApp_me\n    id\n  }\n}\n\nfragment SavedAddresses_me on Me {\n  id\n  addressConnection(first: 30) {\n    totalCount\n    edges {\n      node {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment ShippingApp_me on Me {\n  name\n  ...UserSettingsAddresses_me\n}\n\nfragment UserSettingsAddresses_me on Me {\n  id\n  internalID\n  ...SavedAddresses_me\n  addresses: addressConnection {\n    totalCount\n  }\n}\n"
  }
};
})();
(node as any).hash = '6c0ab43dc6558f701b86050aa5dab00a';
export default node;
