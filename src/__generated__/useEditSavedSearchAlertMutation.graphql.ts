/**
 * @generated SignedSource<<22b88a9577c0b8d3abfee07f11014240>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserSearchCriteriaFrequency = "daily" | "instant" | "%future added value";
export type UpdateSavedSearchInput = {
  attributes?: SearchCriteriaAttributes | null | undefined;
  clientMutationId?: string | null | undefined;
  searchCriteriaID: string;
  userAlertSettings?: UserAlertSettingsInput | null | undefined;
};
export type SearchCriteriaAttributes = {
  acquireable?: boolean | null | undefined;
  additionalGeneIDs?: ReadonlyArray<string> | null | undefined;
  artistID?: string | null | undefined;
  artistIDs?: ReadonlyArray<string> | null | undefined;
  artistSeriesIDs?: ReadonlyArray<string> | null | undefined;
  atAuction?: boolean | null | undefined;
  attributionClass?: ReadonlyArray<string> | null | undefined;
  colors?: ReadonlyArray<string> | null | undefined;
  dimensionRange?: string | null | undefined;
  height?: string | null | undefined;
  inquireableOnly?: boolean | null | undefined;
  keyword?: string | null | undefined;
  locationCities?: ReadonlyArray<string> | null | undefined;
  majorPeriods?: ReadonlyArray<string> | null | undefined;
  materialsTerms?: ReadonlyArray<string> | null | undefined;
  offerable?: boolean | null | undefined;
  partnerIDs?: ReadonlyArray<string> | null | undefined;
  priceRange?: string | null | undefined;
  sizes?: ReadonlyArray<string> | null | undefined;
  width?: string | null | undefined;
};
export type UserAlertSettingsInput = {
  details?: string | null | undefined;
  email?: boolean | null | undefined;
  frequency?: UserSearchCriteriaFrequency | null | undefined;
  name?: string | null | undefined;
  push?: boolean | null | undefined;
};
export type useEditSavedSearchAlertMutation$variables = {
  input: UpdateSavedSearchInput;
};
export type useEditSavedSearchAlertMutation$data = {
  readonly updateSavedSearch: {
    readonly savedSearchOrErrors: {
      readonly internalID?: string;
      readonly userAlertSettings?: {
        readonly name: string | null | undefined;
      };
    };
  } | null | undefined;
};
export type useEditSavedSearchAlertMutation = {
  response: useEditSavedSearchAlertMutation$data;
  variables: useEditSavedSearchAlertMutation$variables;
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
