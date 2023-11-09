/**
 * @generated SignedSource<<20fefcd1daca5f64953f0e70a530e9ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserSearchCriteriaFrequency = "daily" | "instant" | "%future added value";
export type CreateSavedSearchInput = {
  attributes: SearchCriteriaAttributes;
  clientMutationId?: string | null;
  userAlertSettings?: UserAlertSettingsInput | null;
};
export type SearchCriteriaAttributes = {
  acquireable?: boolean | null;
  additionalGeneIDs?: ReadonlyArray<string> | null;
  artistID?: string | null;
  artistIDs?: ReadonlyArray<string> | null;
  artistSeriesIDs?: ReadonlyArray<string> | null;
  atAuction?: boolean | null;
  attributionClass?: ReadonlyArray<string> | null;
  colors?: ReadonlyArray<string> | null;
  dimensionRange?: string | null;
  height?: string | null;
  inquireableOnly?: boolean | null;
  keyword?: string | null;
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
  details?: string | null;
  email?: boolean | null;
  frequency?: UserSearchCriteriaFrequency | null;
  name?: string | null;
  push?: boolean | null;
};
export type useCreateAlertMutation$variables = {
  input: CreateSavedSearchInput;
};
export type useCreateAlertMutation$data = {
  readonly createSavedSearch: {
    readonly me: {
      readonly counts: {
        readonly savedSearches: number;
      } | null;
    } | null;
    readonly savedSearchOrErrors: {
      readonly internalID?: string;
    };
  } | null;
};
export type useCreateAlertMutation = {
  response: useCreateAlertMutation$data;
  variables: useCreateAlertMutation$variables;
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
  "alias": null,
  "args": null,
  "concreteType": "MeCounts",
  "kind": "LinkedField",
  "name": "counts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "savedSearches",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
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
    "name": "useCreateAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSavedSearchPayload",
        "kind": "LinkedField",
        "name": "createSavedSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "savedSearchOrErrors",
            "plural": false,
            "selections": [
              (v3/*: any*/)
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
    "name": "useCreateAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSavedSearchPayload",
        "kind": "LinkedField",
        "name": "createSavedSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "cacheID": "8729cfb07282420011b03da0ef40bb35",
    "id": null,
    "metadata": {},
    "name": "useCreateAlertMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateAlertMutation(\n  $input: CreateSavedSearchInput!\n) {\n  createSavedSearch(input: $input) {\n    me {\n      counts {\n        savedSearches\n      }\n      id\n    }\n    savedSearchOrErrors {\n      __typename\n      ... on SearchCriteria {\n        internalID\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "642d1ca6dc04d2921a812dd3187a69ab";

export default node;
