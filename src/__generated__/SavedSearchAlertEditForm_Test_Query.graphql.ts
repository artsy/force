/**
 * @generated SignedSource<<525c3c84de3fadff7858fad057cbedf7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
export type UserSearchCriteriaFrequency = "daily" | "instant" | "%future added value";
export type SavedSearchAlertEditForm_Test_Query$variables = {
  artistIDs?: ReadonlyArray<string> | null;
};
export type SavedSearchAlertEditForm_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_viewer">;
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_me">;
  } | null;
  readonly artistsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_artistsConnection">;
  } | null;
  readonly artworksConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_artworksConnection">;
  } | null;
};
export type SavedSearchAlertEditForm_Test_Query$rawResponse = {
  readonly viewer: {
    readonly notificationPreferences: ReadonlyArray<{
      readonly status: SubGroupStatus;
      readonly name: string;
      readonly channel: string;
    }>;
  } | null;
  readonly me: {
    readonly savedSearch: {
      readonly internalID: string;
      readonly acquireable: boolean | null;
      readonly additionalGeneIDs: ReadonlyArray<string>;
      readonly artistIDs: ReadonlyArray<string> | null;
      readonly atAuction: boolean | null;
      readonly attributionClass: ReadonlyArray<string>;
      readonly colors: ReadonlyArray<string>;
      readonly dimensionRange: string | null;
      readonly sizes: ReadonlyArray<string>;
      readonly width: string | null;
      readonly height: string | null;
      readonly inquireableOnly: boolean | null;
      readonly locationCities: ReadonlyArray<string>;
      readonly majorPeriods: ReadonlyArray<string>;
      readonly materialsTerms: ReadonlyArray<string>;
      readonly offerable: boolean | null;
      readonly partnerIDs: ReadonlyArray<string>;
      readonly priceRange: string | null;
      readonly userAlertSettings: {
        readonly name: string | null;
        readonly email: boolean;
        readonly push: boolean;
        readonly frequency: UserSearchCriteriaFrequency;
      };
    } | null;
    readonly id: string;
  } | null;
  readonly artistsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly name: string | null;
        readonly slug: string;
        readonly id: string;
      } | null;
    } | null> | null;
  } | null;
  readonly artworksConnection: {
    readonly aggregations: ReadonlyArray<{
      readonly slice: ArtworkAggregation | null;
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly name: string;
        readonly value: string;
      } | null> | null;
    } | null> | null;
    readonly id: string;
  } | null;
};
export type SavedSearchAlertEditForm_Test_Query = {
  variables: SavedSearchAlertEditForm_Test_Query$variables;
  response: SavedSearchAlertEditForm_Test_Query$data;
  rawResponse: SavedSearchAlertEditForm_Test_Query$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistIDs"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "artistIDs"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "LOCATION_CITY",
      "MATERIALS_TERMS",
      "MEDIUM",
      "PARTNER",
      "COLOR"
    ]
  },
  {
    "kind": "Variable",
    "name": "artistIDs",
    "variableName": "artistIDs"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 0
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertEditForm_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Literal",
                "name": "savedSearchId",
                "value": "id"
              },
              {
                "kind": "Literal",
                "name": "withAggregations",
                "value": true
              }
            ],
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistConnection",
        "kind": "LinkedField",
        "name": "artistsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_artistsConnection"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_artworksConnection"
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
    "name": "SavedSearchAlertEditForm_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NotificationPreference",
            "kind": "LinkedField",
            "name": "notificationPreferences",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "channel",
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
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "id"
              }
            ],
            "concreteType": "SearchCriteria",
            "kind": "LinkedField",
            "name": "savedSearch",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "acquireable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "additionalGeneIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "atAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "attributionClass",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "colors",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dimensionRange",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sizes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "width",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "height",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "inquireableOnly",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "locationCities",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "majorPeriods",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "materialsTerms",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "offerable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priceRange",
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "push",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "frequency",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "savedSearch(id:\"id\")"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistConnection",
        "kind": "LinkedField",
        "name": "artistsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v5/*: any*/)
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
        "args": (v2/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworksAggregationResults",
            "kind": "LinkedField",
            "name": "aggregations",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AggregationCount",
                "kind": "LinkedField",
                "name": "counts",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "count",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dc4b1139a06c32146387d60ce9fb2dc4",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertEditForm_Test_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertEditForm_Test_Query(\n  $artistIDs: [String!]\n) {\n  viewer {\n    ...SavedSearchAlertEditForm_viewer\n  }\n  me {\n    ...SavedSearchAlertEditForm_me_1EL2c3\n    id\n  }\n  artistsConnection(slugs: $artistIDs) {\n    ...SavedSearchAlertEditForm_artistsConnection\n  }\n  artworksConnection(first: 0, artistIDs: $artistIDs, aggregations: [LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]) {\n    ...SavedSearchAlertEditForm_artworksConnection\n    id\n  }\n}\n\nfragment SavedSearchAlertEditForm_artistsConnection on ArtistConnection {\n  edges {\n    node {\n      internalID\n      name\n      slug\n      id\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_artworksConnection on FilterArtworksConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n      value\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_me_1EL2c3 on Me {\n  savedSearch(id: \"id\") {\n    internalID\n    acquireable\n    additionalGeneIDs\n    artistIDs\n    atAuction\n    attributionClass\n    colors\n    dimensionRange\n    sizes\n    width\n    height\n    inquireableOnly\n    locationCities\n    majorPeriods\n    materialsTerms\n    offerable\n    partnerIDs\n    priceRange\n    userAlertSettings {\n      name\n      email\n      push\n      frequency\n    }\n  }\n}\n\nfragment SavedSearchAlertEditForm_viewer on Viewer {\n  notificationPreferences {\n    status\n    name\n    channel\n  }\n}\n"
  }
};
})();

(node as any).hash = "c00b8209f78cc7989a5c7e22b2e8895a";

export default node;
