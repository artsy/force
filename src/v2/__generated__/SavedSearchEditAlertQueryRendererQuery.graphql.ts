/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchEditAlertQueryRendererQueryVariables = {
    id: string;
};
export type SavedSearchEditAlertQueryRendererQueryResponse = {
    readonly me: {
        readonly savedSearch: {
            readonly " $fragmentRefs": FragmentRefs<"SavedSearchEditAlertQueryRenderer_savedSearch">;
        } | null;
    } | null;
};
export type SavedSearchEditAlertQueryRendererQuery = {
    readonly response: SavedSearchEditAlertQueryRendererQueryResponse;
    readonly variables: SavedSearchEditAlertQueryRendererQueryVariables;
};



/*
query SavedSearchEditAlertQueryRendererQuery(
  $id: ID!
) {
  me {
    savedSearch(id: $id) {
      ...SavedSearchEditAlertQueryRenderer_savedSearch
    }
    id
  }
}

fragment SavedSearchEditAlertQueryRenderer_savedSearch on SearchCriteria {
  userAlertSettings {
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchEditAlertQueryRendererQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "SearchCriteria",
            "kind": "LinkedField",
            "name": "savedSearch",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SavedSearchEditAlertQueryRenderer_savedSearch"
              }
            ],
            "storageKey": null
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
    "name": "SavedSearchEditAlertQueryRendererQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "SearchCriteria",
            "kind": "LinkedField",
            "name": "savedSearch",
            "plural": false,
            "selections": [
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
    "cacheID": "f9a2d488d227567e5a77ebf890ba7769",
    "id": null,
    "metadata": {},
    "name": "SavedSearchEditAlertQueryRendererQuery",
    "operationKind": "query",
    "text": "query SavedSearchEditAlertQueryRendererQuery(\n  $id: ID!\n) {\n  me {\n    savedSearch(id: $id) {\n      ...SavedSearchEditAlertQueryRenderer_savedSearch\n    }\n    id\n  }\n}\n\nfragment SavedSearchEditAlertQueryRenderer_savedSearch on SearchCriteria {\n  userAlertSettings {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c39569f3c4b2818108a71e0ff8e51a9b';
export default node;
