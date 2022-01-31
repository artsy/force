/**
 * @generated SignedSource<<54a5c862c338a4ffec483a5b8e6637ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateSavedSearchInput = {
  attributes?: SearchCriteriaAttributes | null;
  clientMutationId?: string | null;
  searchCriteriaID: string;
  userAlertSettings?: UserAlertSettingsInput | null;
};
export type SearchCriteriaAttributes = {
  acquireable?: boolean | null;
  additionalGeneIDs?: ReadonlyArray<string> | null;
  artistID?: string | null;
  artistIDs?: ReadonlyArray<string> | null;
  atAuction?: boolean | null;
  attributionClass?: ReadonlyArray<string> | null;
  colors?: ReadonlyArray<string> | null;
  dimensionRange?: string | null;
  height?: string | null;
  inquireableOnly?: boolean | null;
  locationCities?: ReadonlyArray<string> | null;
  majorPeriods?: ReadonlyArray<string> | null;
  materialsTerms?: ReadonlyArray<string> | null;
  offerable?: boolean | null;
  partnerIDs?: ReadonlyArray<string> | null;
  priceRange?: string | null;
  sizes?: ReadonlyArray<string> | null;
  width?: string | null;
};
export type UserAlertSettingsInput = {
  email?: boolean | null;
  name?: string | null;
  push?: boolean | null;
};
export type useEditSavedSearchAlertMutation$variables = {
  input: UpdateSavedSearchInput;
};
export type useEditSavedSearchAlertMutation$data = {
  readonly updateSavedSearch: {
    readonly savedSearchOrErrors: {
      readonly internalID?: string;
      readonly userAlertSettings?: {
        readonly name: string | null;
      };
    };
  } | null;
};
export type useEditSavedSearchAlertMutation = {
  variables: useEditSavedSearchAlertMutation$variables;
  response: useEditSavedSearchAlertMutation$data;
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
    },
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
  "type": "SearchCriteria",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useEditSavedSearchAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSavedSearchPayload",
        "kind": "LinkedField",
        "name": "updateSavedSearch",
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
    "name": "useEditSavedSearchAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSavedSearchPayload",
        "kind": "LinkedField",
        "name": "updateSavedSearch",
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
    "cacheID": "1fc3b31f24ceb7473c127d9836d72e9c",
    "id": null,
    "metadata": {},
    "name": "useEditSavedSearchAlertMutation",
    "operationKind": "mutation",
    "text": "mutation useEditSavedSearchAlertMutation(\n  $input: UpdateSavedSearchInput!\n) {\n  updateSavedSearch(input: $input) {\n    savedSearchOrErrors {\n      __typename\n      ... on SearchCriteria {\n        internalID\n        userAlertSettings {\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4f5012f259a490f2809f2da46ff1c9d3";

export default node;
