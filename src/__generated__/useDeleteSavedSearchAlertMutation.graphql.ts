/**
 * @generated SignedSource<<fe8ed79c629ddf399cc18a9298aa9b80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DisableSavedSearchInput = {
  clientMutationId?: string | null;
  searchCriteriaID: string;
};
export type useDeleteSavedSearchAlertMutation$variables = {
  input: DisableSavedSearchInput;
};
export type useDeleteSavedSearchAlertMutation$data = {
  readonly disableSavedSearch: {
    readonly savedSearchOrErrors: {
      readonly internalID?: string;
    };
  } | null;
};
export type useDeleteSavedSearchAlertMutation = {
  response: useDeleteSavedSearchAlertMutation$data;
  variables: useDeleteSavedSearchAlertMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "SearchCriteria",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteSavedSearchAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableSavedSearchPayload",
        "kind": "LinkedField",
        "name": "disableSavedSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "savedSearchOrErrors",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteSavedSearchAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableSavedSearchPayload",
        "kind": "LinkedField",
        "name": "disableSavedSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "savedSearchOrErrors",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "781398ff7b26a4c5213f552b62c769f5",
    "id": null,
    "metadata": {},
    "name": "useDeleteSavedSearchAlertMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteSavedSearchAlertMutation(\n  $input: DisableSavedSearchInput!\n) {\n  disableSavedSearch(input: $input) {\n    savedSearchOrErrors {\n      __typename\n      ... on SearchCriteria {\n        internalID\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a9069fb0ea011f52dcacb0c9abf658a2";

export default node;
