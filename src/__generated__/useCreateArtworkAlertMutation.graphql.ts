/**
 * @generated SignedSource<<d957c3e232bff8062e0da171b997ecdd>>
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
export type useCreateArtworkAlertMutation$variables = {
  input: CreateSavedSearchInput;
};
export type useCreateArtworkAlertMutation$data = {
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
export type useCreateArtworkAlertMutation = {
  response: useCreateArtworkAlertMutation$data;
  variables: useCreateArtworkAlertMutation$variables;
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
    "name": "useCreateArtworkAlertMutation",
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
    "name": "useCreateArtworkAlertMutation",
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
    "cacheID": "1de25efd8dcff856921fb940a9280338",
    "id": null,
    "metadata": {},
    "name": "useCreateArtworkAlertMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateArtworkAlertMutation(\n  $input: CreateSavedSearchInput!\n) {\n  createSavedSearch(input: $input) {\n    me {\n      counts {\n        savedSearches\n      }\n      id\n    }\n    savedSearchOrErrors {\n      __typename\n      ... on SearchCriteria {\n        internalID\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3ab46b0077d575f0e5bf64cb705e8cdd";

export default node;
