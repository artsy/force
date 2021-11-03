/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertItem_Test_QueryVariables = {};
export type AlertItem_Test_QueryResponse = {
    readonly me: {
        readonly savedSearchesConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID: string;
                    readonly " $fragmentRefs": FragmentRefs<"AlertItem_item">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type AlertItem_Test_Query = {
    readonly response: AlertItem_Test_QueryResponse;
    readonly variables: AlertItem_Test_QueryVariables;
};



/*
query AlertItem_Test_Query {
  me {
    savedSearchesConnection {
      edges {
        node {
          internalID
          ...AlertItem_item
        }
      }
    }
    id
  }
}

fragment AlertItem_item on SearchCriteria {
  internalID
  userAlertSettings {
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AlertItem_Test_Query",
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
            "concreteType": "SearchCriteriaConnection",
            "kind": "LinkedField",
            "name": "savedSearchesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchCriteriaEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchCriteria",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "AlertItem_item"
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
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlertItem_Test_Query",
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
            "concreteType": "SearchCriteriaConnection",
            "kind": "LinkedField",
            "name": "savedSearchesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchCriteriaEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchCriteria",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SavedSearchUserAlertSettings",
                        "kind": "LinkedField",
                        "name": "userAlertSettings",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
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
    "id": null,
    "metadata": {},
    "name": "AlertItem_Test_Query",
    "operationKind": "query",
    "text": "query AlertItem_Test_Query {\n  me {\n    savedSearchesConnection {\n      edges {\n        node {\n          internalID\n          ...AlertItem_item\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment AlertItem_item on SearchCriteria {\n  internalID\n  userAlertSettings {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c2d4aa63ed7214fa7d63891418aea3a7';
export default node;
