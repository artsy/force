/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicator_test_QueryVariables = {};
export type NavBarMobileMenuNotificationsIndicator_test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_me">;
    } | null;
};
export type NavBarMobileMenuNotificationsIndicator_test_Query = {
    readonly response: NavBarMobileMenuNotificationsIndicator_test_QueryResponse;
    readonly variables: NavBarMobileMenuNotificationsIndicator_test_QueryVariables;
};



/*
query NavBarMobileMenuNotificationsIndicator_test_Query {
  me {
    ...NavBarMobileMenuNotificationsIndicator_me
    id
  }
}

fragment NavBarMobileMenuNotificationsIndicator_me on Me {
  unreadConversationCount
  unreadNotificationsCount
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "NavBarMobileMenuNotificationsIndicator_test_Query",
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
            "name": "NavBarMobileMenuNotificationsIndicator_me"
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
    "name": "NavBarMobileMenuNotificationsIndicator_test_Query",
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
            "name": "unreadConversationCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unreadNotificationsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "37ccc0b48e759e445c0c355569c560bd",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "me.unreadConversationCount": (v0/*: any*/),
        "me.unreadNotificationsCount": (v0/*: any*/)
      }
    },
    "name": "NavBarMobileMenuNotificationsIndicator_test_Query",
    "operationKind": "query",
    "text": "query NavBarMobileMenuNotificationsIndicator_test_Query {\n  me {\n    ...NavBarMobileMenuNotificationsIndicator_me\n    id\n  }\n}\n\nfragment NavBarMobileMenuNotificationsIndicator_me on Me {\n  unreadConversationCount\n  unreadNotificationsCount\n}\n"
  }
};
})();
(node as any).hash = '26ec2da0ab6233adec36923fad6a1536';
export default node;
