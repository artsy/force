/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserBidHistory_Test_QueryVariables = {};
export type UserBidHistory_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserBidHistory_me">;
    } | null;
};
export type UserBidHistory_Test_Query = {
    readonly response: UserBidHistory_Test_QueryResponse;
    readonly variables: UserBidHistory_Test_QueryVariables;
};



/*
query UserBidHistory_Test_Query {
  me {
    ...UserBidHistory_me
    id
  }
}

fragment UserBidHistory_me on Me {
  myBids {
    closed {
      sale {
        name
        href
        endAt(format: "MMMM D, h:mmA")
        profile {
          bio
          id
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
    "name": "UserBidHistory_Test_Query",
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
            "name": "UserBidHistory_me"
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
    "name": "UserBidHistory_Test_Query",
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
            "concreteType": "MyBids",
            "kind": "LinkedField",
            "name": "myBids",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MyBid",
                "kind": "LinkedField",
                "name": "closed",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
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
                        "name": "endAt",
                        "storageKey": "endAt(format:\"MMMM D, h:mmA\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Profile",
                        "kind": "LinkedField",
                        "name": "profile",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bio",
                            "storageKey": null
                          },
                          (v0/*: any*/)
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
            "storageKey": null
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
        "me.myBids": {
          "type": "MyBids",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.closed": {
          "type": "MyBid",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.myBids.closed.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.closed.sale.name": (v2/*: any*/),
        "me.myBids.closed.sale.href": (v2/*: any*/),
        "me.myBids.closed.sale.endAt": (v2/*: any*/),
        "me.myBids.closed.sale.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.closed.sale.id": (v1/*: any*/),
        "me.myBids.closed.sale.profile.bio": (v2/*: any*/),
        "me.myBids.closed.sale.profile.id": (v1/*: any*/)
      }
    },
    "name": "UserBidHistory_Test_Query",
    "operationKind": "query",
    "text": "query UserBidHistory_Test_Query {\n  me {\n    ...UserBidHistory_me\n    id\n  }\n}\n\nfragment UserBidHistory_me on Me {\n  myBids {\n    closed {\n      sale {\n        name\n        href\n        endAt(format: \"MMMM D, h:mmA\")\n        profile {\n          bio\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'aab7c7a1013e923a09c9119116d89fa3';
export default node;
