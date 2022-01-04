/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserRegistrationAuctions_Test_QueryVariables = {};
export type UserRegistrationAuctions_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserRegistrationAuctions_me">;
    } | null;
};
export type UserRegistrationAuctions_Test_Query = {
    readonly response: UserRegistrationAuctions_Test_QueryResponse;
    readonly variables: UserRegistrationAuctions_Test_QueryVariables;
};



/*
query UserRegistrationAuctions_Test_Query {
  me {
    ...UserRegistrationAuctions_me
    id
  }
}

fragment UserRegistrationAuctions_me on Me {
  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {
    edges {
      node {
        sale {
          id
          name
          href
          startAt(format: "MMMM D, h:mmA")
          isClosed
        }
        id
      }
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
v1 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v2 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserRegistrationAuctions_Test_Query",
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
            "name": "UserRegistrationAuctions_me"
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
    "name": "UserRegistrationAuctions_Test_Query",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "isAuction",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "registered",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "CREATED_AT_DESC"
              }
            ],
            "concreteType": "SaleRegistrationConnection",
            "kind": "LinkedField",
            "name": "saleRegistrationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleRegistrationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleRegistration",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
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
                            "name": "href",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "MMMM D, h:mmA"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": "startAt(format:\"MMMM D, h:mmA\")"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleRegistrationsConnection(first:10,isAuction:true,published:true,registered:false,sort:\"CREATED_AT_DESC\")"
          },
          (v0/*: any*/)
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
        "me.id": (v1/*: any*/),
        "me.saleRegistrationsConnection": {
          "type": "SaleRegistrationConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.saleRegistrationsConnection.edges": {
          "type": "SaleRegistrationEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.saleRegistrationsConnection.edges.node": {
          "type": "SaleRegistration",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.saleRegistrationsConnection.edges.node.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.saleRegistrationsConnection.edges.node.id": (v1/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.saleRegistrationsConnection.edges.node.sale.name": (v2/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.href": (v2/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.startAt": (v2/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.isClosed": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "UserRegistrationAuctions_Test_Query",
    "operationKind": "query",
    "text": "query UserRegistrationAuctions_Test_Query {\n  me {\n    ...UserRegistrationAuctions_me\n    id\n  }\n}\n\nfragment UserRegistrationAuctions_me on Me {\n  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {\n    edges {\n      node {\n        sale {\n          id\n          name\n          href\n          startAt(format: \"MMMM D, h:mmA\")\n          isClosed\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '73a75f1453c0aa9132600328932d6f7b';
export default node;
