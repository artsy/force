/**
 * @generated SignedSource<<560bcc2c31f7d12111558b0b9874ce29>>
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
  clientMutationId?: string | null | undefined;
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
export type createSavedSearchAlertMutation$variables = {
  input: CreateSavedSearchInput;
};
export type createSavedSearchAlertMutation$data = {
  readonly createSavedSearch: {
    readonly me: {
      readonly counts: {
        readonly savedSearches: number;
      } | null | undefined;
    } | null | undefined;
    readonly savedSearchOrErrors: {
      readonly internalID?: string;
    };
  } | null | undefined;
};
export type createSavedSearchAlertMutation = {
  response: createSavedSearchAlertMutation$data;
  variables: createSavedSearchAlertMutation$variables;
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
    "name": "createSavedSearchAlertMutation",
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
    "name": "createSavedSearchAlertMutation",
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
    "cacheID": "2ea239fcc6f294f5693f16f8b5e277d6",
    "id": null,
    "metadata": {},
    "name": "createSavedSearchAlertMutation",
    "operationKind": "mutation",
    "text": "mutation createSavedSearchAlertMutation(\n  $input: CreateSavedSearchInput!\n) {\n  createSavedSearch(input: $input) {\n    me {\n      counts {\n        savedSearches\n      }\n      id\n    }\n    savedSearchOrErrors {\n      __typename\n      ... on SearchCriteria {\n        internalID\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "74f44c8dfeb76e1a769a2c194c4d00c6";

export default node;
